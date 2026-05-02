'use client'

import '@xyflow/react/dist/style.css'
import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  BackgroundVariant,
} from '@xyflow/react'
import { useRouter } from 'next/navigation'
import Dagre from '@dagrejs/dagre'
import { distributionNodes, relationshipEdges, DistributionNodeData } from '@/data/distribution-relationships'
import { distributionPositions } from '@/data/distribution-positions'
import { DistributionNodeComponent } from './DistributionNode'
import { SpecialCaseEdge, LimitingEdge, TransformationEdge, BayesianEdge, DEFAULT_MARKER_END } from './RelationshipEdge'
import { GraphCanvasDev } from './edit'

const NODE_WIDTH = 180
const NODE_HEIGHT = 62

function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
  const g = new Dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR', ranksep: 90, nodesep: 18 })
  nodes.forEach(n => g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT }))
  edges.forEach(e => g.setEdge(e.source, e.target))
  Dagre.layout(g)
  return nodes.map(n => {
    const pos = g.node(n.id)
    return { ...n, position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 } }
  })
}

const nodeTypes = {
  distribution: DistributionNodeComponent,
}

const edgeTypes = {
  'special-case': SpecialCaseEdge,
  'limiting': LimitingEdge,
  'transformation': TransformationEdge,
  'bayesian': BayesianEdge,
}

// Build RF nodes/edges once at module load (client-side only via dynamic import)
const baseNodes: Node[] = distributionNodes.map(d => ({
  id: d.id,
  type: 'distribution',
  data: { ...d } as Record<string, unknown>,
  position: { x: 0, y: 0 },
}))

const baseEdges: Edge[] = relationshipEdges.map(e => ({
  id: e.id,
  source: e.source,
  target: e.target,
  type: e.relationshipType,
  label: e.label,
  data: { highlighted: false } as Record<string, unknown>,
  markerEnd: DEFAULT_MARKER_END,
}))

const allPositioned = distributionNodes.every(d => distributionPositions[d.id] !== undefined)
const layoutedNodes = allPositioned
  ? baseNodes.map(n => ({ ...n, position: distributionPositions[n.id] }))
  : applyDagreLayout(baseNodes, baseEdges)

// ── Inner canvas (needs ReactFlowProvider above it) ─────────────────────────

type Props = {
  searchQuery: string
  typeFilter: 'all' | 'discrete' | 'continuous'
}

function GraphCanvasBase({ searchQuery, typeFilter }: Props) {
  const router = useRouter()
  const [nodes, , onNodesChange] = useNodesState(layoutedNodes)
  const [edges, , onEdgesChange] = useEdgesState(baseEdges)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // IDs connected to the hovered node (including itself)
  const connectedIds = useMemo<Set<string> | null>(() => {
    if (!hoveredNodeId) return null
    const ids = new Set<string>([hoveredNodeId])
    edges.forEach(e => {
      if (e.source === hoveredNodeId) ids.add(e.target)
      if (e.target === hoveredNodeId) ids.add(e.source)
    })
    return ids
  }, [hoveredNodeId, edges])

  // IDs that pass the current search/type filter
  const matchingIds = useMemo<Set<string>>(() => {
    const q = searchQuery.toLowerCase().trim()
    return new Set(
      distributionNodes
        .filter(d => {
          const matchesType = typeFilter === 'all' || d.type === typeFilter
          const matchesSearch = !q || d.name.toLowerCase().includes(q) || d.id.includes(q)
          return matchesType && matchesSearch
        })
        .map(d => d.id)
    )
  }, [searchQuery, typeFilter])

  // Derived node list with hover/filter styling applied
  const displayNodes = useMemo<Node[]>(() =>
    nodes.map(n => {
      const dimmed = connectedIds !== null && !connectedIds.has(n.id)
      return {
        ...n,
        hidden: !matchingIds.has(n.id),
        style: { opacity: dimmed ? 0.08 : 1, transition: 'opacity 0.15s' },
        data: {
          ...(n.data as Record<string, unknown>),
          highlighted: hoveredNodeId === n.id,
          isEditMode: false,
        },
      }
    }),
    [nodes, connectedIds, hoveredNodeId, matchingIds]
  )

  // Derived edge list
  const displayEdges = useMemo<Edge[]>(() =>
    edges.map(e => {
      const bothVisible = matchingIds.has(e.source) && matchingIds.has(e.target)
      const bothConnected = connectedIds !== null
        ? connectedIds.has(e.source) && connectedIds.has(e.target)
        : true
      const dimmed = connectedIds !== null && !bothConnected
      return {
        ...e,
        hidden: !bothVisible,
        style: { opacity: dimmed ? 0.04 : 1, transition: 'opacity 0.15s' },
        data: {
          ...(e.data as Record<string, unknown>),
          highlighted: !!connectedIds && bothConnected,
        },
      }
    }),
    [edges, connectedIds, matchingIds]
  )

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    setHoveredNodeId(node.id)
  }, [])

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null)
  }, [])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const d = node.data as DistributionNodeData
    if (d.slug) {
      router.push(`/distributions/${d.slug}`)
    }
  }, [router])

  return (
    <ReactFlow
      nodes={displayNodes}
      edges={displayEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.05}
      maxZoom={2.5}
      nodesDraggable
      nodesConnectable={false}
      deleteKeyCode={null}
      className="bg-white dark:bg-gray-950"
    >
      <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--bg-dot-color, #e5e7eb)" />
      <Controls showInteractive={false} className="!border !border-gray-200 !rounded-lg !shadow-sm" />
      <MiniMap
        nodeColor={n => {
          const d = n.data as DistributionNodeData
          return d?.type === 'continuous' ? '#bfdbfe' : '#e5e7eb'
        }}
        nodeStrokeWidth={0}
        maskColor="rgba(249,250,251,0.85)"
        className="!border !border-gray-200 !rounded-lg !shadow-sm"
      />
    </ReactFlow>
  )
}

// ── Public export (wraps with provider) ────────────────────────────────────

export function DistributionGraph({ searchQuery, typeFilter }: Props) {
  return (
    <ReactFlowProvider>
      {process.env.NODE_ENV === 'development'
        ? <GraphCanvasDev searchQuery={searchQuery} typeFilter={typeFilter} initialNodes={layoutedNodes} initialEdges={baseEdges} />
        : <GraphCanvasBase searchQuery={searchQuery} typeFilter={typeFilter} />}
    </ReactFlowProvider>
  )
}
