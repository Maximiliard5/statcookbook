'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
  Connection,
  BackgroundVariant,
} from '@xyflow/react'
import { useRouter } from 'next/navigation'
import { DistributionNodeData, RelationshipType } from '@/data/distribution-relationships'
import { DistributionNodeComponent } from '../DistributionNode'
import { SpecialCaseEdge, LimitingEdge, TransformationEdge, BayesianEdge, DEFAULT_MARKER_END } from '../RelationshipEdge'
import { EditToolbar } from './EditToolbar'
import { EditSidebar } from './EditSidebar'
import { NewEdgeDialog } from './NewEdgeDialog'
import { AddNodeDialog } from './AddNodeDialog'
import { ExportModal } from './ExportModal'

type NodeMetaPatch = Partial<Pick<DistributionNodeData, 'name' | 'notation' | 'type' | 'group' | 'slug'>>
type EdgeMetaPatch = { type?: RelationshipType; label?: string }

const nodeTypes = {
  distribution: DistributionNodeComponent,
}

const edgeTypes = {
  'special-case': SpecialCaseEdge,
  'limiting': LimitingEdge,
  'transformation': TransformationEdge,
  'bayesian': BayesianEdge,
}

export type GraphCanvasDevProps = {
  searchQuery: string
  typeFilter: 'all' | 'discrete' | 'continuous'
  initialNodes: Node[]
  initialEdges: Edge[]
}

export function GraphCanvasDev({ searchQuery, typeFilter, initialNodes, initialEdges }: GraphCanvasDevProps) {
  const router = useRouter()
  const { screenToFlowPosition } = useReactFlow()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // ── Edit mode state ──────────────────────────────────────────────────────────
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null)
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null)
  const [isAddingNode, setIsAddingNode] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [exportPayload, setExportPayload] = useState<{ relationshipsTs: string; positionsTs: string } | null>(null)

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => {
      if (prev) {
        setNodes(ns => ns.map(n => ({ ...n, selected: false })))
        setEdges(es => es.map(e => ({ ...e, selected: false })))
        setSelectedNode(null)
        setSelectedEdge(null)
        setPendingConnection(null)
        setIsAddingNode(false)
      }
      return !prev
    })
  }, [setNodes, setEdges])

  // ── Hover / filter display state ─────────────────────────────────────────────

  const connectedIds = useMemo<Set<string> | null>(() => {
    if (!hoveredNodeId) return null
    const ids = new Set<string>([hoveredNodeId])
    edges.forEach(e => {
      if (e.source === hoveredNodeId) ids.add(e.target)
      if (e.target === hoveredNodeId) ids.add(e.source)
    })
    return ids
  }, [hoveredNodeId, edges])

  const matchingIds = useMemo<Set<string>>(() => {
    if (isEditMode) return new Set(nodes.map(n => n.id))
    const q = searchQuery.toLowerCase().trim()
    return new Set(
      nodes.filter(n => {
        const d = n.data as DistributionNodeData
        const matchesType = typeFilter === 'all' || d.type === typeFilter
        const matchesSearch = !q || d.name.toLowerCase().includes(q) || n.id.includes(q)
        return matchesType && matchesSearch
      }).map(n => n.id)
    )
  }, [searchQuery, typeFilter, isEditMode, nodes])

  const displayNodes = useMemo<Node[]>(() =>
    nodes.map(n => {
      const dimmed = connectedIds !== null && !connectedIds.has(n.id)
      return {
        ...n,
        hidden: isEditMode ? false : !matchingIds.has(n.id),
        style: { opacity: dimmed ? 0.08 : 1, transition: 'opacity 0.15s' },
        data: {
          ...(n.data as Record<string, unknown>),
          highlighted: hoveredNodeId === n.id,
          isEditMode,
        },
      }
    }),
    [nodes, connectedIds, hoveredNodeId, matchingIds, isEditMode]
  )

  const displayEdges = useMemo<Edge[]>(() =>
    edges.map(e => {
      const bothVisible = matchingIds.has(e.source) && matchingIds.has(e.target)
      const bothConnected = connectedIds !== null
        ? connectedIds.has(e.source) && connectedIds.has(e.target)
        : true
      const dimmed = connectedIds !== null && !bothConnected
      return {
        ...e,
        hidden: isEditMode ? false : !bothVisible,
        style: { opacity: dimmed ? 0.04 : 1, transition: 'opacity 0.15s' },
        data: {
          ...(e.data as Record<string, unknown>),
          highlighted: isEditMode || (!!connectedIds && bothConnected),
        },
      }
    }),
    [edges, connectedIds, matchingIds, isEditMode]
  )

  // ── Event handlers ──────────────────────────────────────────────────────────

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    setHoveredNodeId(node.id)
  }, [])

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null)
  }, [])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (isEditMode) {
      setSelectedEdge(null)
      return
    }
    const d = node.data as DistributionNodeData
    if (d.slug) router.push(`/distributions/${d.slug}`)
  }, [isEditMode, router])

  const onPaneClick = useCallback(() => {
    if (isEditMode) {
      setSelectedNode(null)
      setSelectedEdge(null)
    }
  }, [isEditMode])

  const onSelectionChange = useCallback(({ nodes: sNodes, edges: sEdges }: { nodes: Node[]; edges: Edge[] }) => {
    if (!isEditMode) return
    if (sNodes.length > 0) {
      setSelectedNode(sNodes[0])
      setSelectedEdge(null)
    } else if (sEdges.length > 0) {
      setSelectedEdge(sEdges[0])
      setSelectedNode(null)
    } else {
      setSelectedNode(null)
      setSelectedEdge(null)
    }
  }, [isEditMode])

  const onConnect = useCallback((conn: Connection) => {
    setPendingConnection(conn)
  }, [])

  const onConnectConfirm = useCallback((type: RelationshipType, label: string, property?: string) => {
    if (!pendingConnection) return
    const newEdge: Edge = {
      id: `e-${pendingConnection.source}-${pendingConnection.target}-${Date.now()}`,
      source: pendingConnection.source,
      target: pendingConnection.target,
      sourceHandle: pendingConnection.sourceHandle ?? undefined,
      targetHandle: pendingConnection.targetHandle ?? undefined,
      type,
      label,
      data: { property } as Record<string, unknown>,
      markerEnd: DEFAULT_MARKER_END,
    }
    setEdges(es => [...es, newEdge])
    setPendingConnection(null)
  }, [pendingConnection, setEdges])

  const onConnectCancel = useCallback(() => setPendingConnection(null), [])

  const onNodeMetaChange = useCallback((id: string, patch: NodeMetaPatch) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    setSelectedNode(prev => prev?.id === id ? { ...prev, data: { ...prev.data, ...patch } } : prev)
  }, [setNodes])

  const onEdgeMetaChange = useCallback((id: string, patch: EdgeMetaPatch) => {
    setEdges(es => es.map(e => {
      if (e.id !== id) return e
      return {
        ...e,
        type: patch.type ?? e.type,
        label: patch.label !== undefined ? patch.label : e.label,
        markerEnd: DEFAULT_MARKER_END,
      }
    }))
    setSelectedEdge(prev => {
      if (!prev || prev.id !== id) return prev
      return {
        ...prev,
        type: patch.type ?? prev.type,
        label: patch.label !== undefined ? patch.label : prev.label,
      }
    })
  }, [setEdges])

  const onDeleteNode = useCallback((id: string) => {
    setNodes(ns => ns.filter(n => n.id !== id))
    setEdges(es => es.filter(e => e.source !== id && e.target !== id))
    setSelectedNode(null)
  }, [setNodes, setEdges])

  const onDeleteEdge = useCallback((id: string) => {
    setEdges(es => es.filter(e => e.id !== id))
    setSelectedEdge(null)
  }, [setEdges])

  const onAddNode = useCallback((data: DistributionNodeData) => {
    const center = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const newNode: Node = {
      id: data.id,
      type: 'distribution',
      data: { ...data } as Record<string, unknown>,
      position: center,
    }
    setNodes(ns => [...ns, newNode])
    setIsAddingNode(false)
  }, [screenToFlowPosition, setNodes])

  const onExport = useCallback(() => {
    const typeHeader = `export type PropertyCode = 'C' | 'F' | 'I' | 'L' | 'M' | 'P' | 'R' | 'S' | 'V' | 'X'

export type DistributionNodeData = {
  id: string
  name: string
  notation: string
  type: 'discrete' | 'continuous'
  group: string
  slug: string | null
  properties?: PropertyCode[]
}

export type RelationshipType = 'special-case' | 'limiting' | 'transformation' | 'bayesian'

export type RelationshipEdgeData = {
  id: string
  source: string
  target: string
  label: string
  relationshipType: RelationshipType
}

`
    const nodesLines = nodes.map(n => {
      const d = n.data as DistributionNodeData
      const slugVal = d.slug ? `'${d.slug}'` : 'null'
      const propsVal = d.properties && d.properties.length > 0
        ? `, properties: [${d.properties.map(p => `'${p}'`).join(', ')}]`
        : ''
      return `  { id: '${d.id}', name: '${d.name}', notation: '${d.notation}', type: '${d.type}', group: '${d.group}', slug: ${slugVal}${propsVal} },`
    }).join('\n')

    const edgesLines = edges.map(e => {
      const label = String(e.label ?? '').replace(/'/g, "\\'")
      return `  { id: '${e.id}', source: '${e.source}', target: '${e.target}', label: '${label}', relationshipType: '${e.type as string}' },`
    }).join('\n')

    const relationshipsTs = `${typeHeader}export const distributionNodes: DistributionNodeData[] = [\n${nodesLines}\n]\n\nexport const relationshipEdges: RelationshipEdgeData[] = [\n${edgesLines}\n]\n`

    const posLines = nodes.map(n => `  '${n.id}': { x: ${Math.round(n.position.x)}, y: ${Math.round(n.position.y)}, },`).join('\n')
    const positionsTs = `export const distributionPositions: Record<string, { x: number; y: number }> = {\n${posLines}\n}\n`

    setExportPayload({ relationshipsTs, positionsTs })
  }, [nodes, edges])

  // Source/target names for the new-edge dialog
  const pendingSourceLabel = pendingConnection
    ? ((nodes.find(n => n.id === pendingConnection.source)?.data as DistributionNodeData | undefined)?.name ?? pendingConnection.source)
    : ''
  const pendingTargetLabel = pendingConnection
    ? ((nodes.find(n => n.id === pendingConnection.target)?.data as DistributionNodeData | undefined)?.name ?? pendingConnection.target)
    : ''

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onConnect={isEditMode ? onConnect : undefined}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.05}
        maxZoom={2.5}
        nodesDraggable
        nodesConnectable={isEditMode}
        deleteKeyCode={isEditMode ? 'Delete' : null}
        onInit={() => setIsReady(true)}
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
        <EditToolbar
          isEditMode={isEditMode}
          isReady={isReady}
          onToggle={toggleEditMode}
          onAddNode={() => setIsAddingNode(true)}
          onExport={onExport}
        />
      </ReactFlow>

      {isEditMode && (
        <EditSidebar
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onNodeMetaChange={onNodeMetaChange}
          onEdgeMetaChange={onEdgeMetaChange}
          onDeleteNode={onDeleteNode}
          onDeleteEdge={onDeleteEdge}
        />
      )}

      {pendingConnection && (
        <NewEdgeDialog
          connection={pendingConnection}
          sourceLabel={pendingSourceLabel}
          targetLabel={pendingTargetLabel}
          onConfirm={onConnectConfirm}
          onCancel={onConnectCancel}
        />
      )}

      {isAddingNode && (
        <AddNodeDialog
          onConfirm={onAddNode}
          onCancel={() => setIsAddingNode(false)}
        />
      )}

      {exportPayload && (
        <ExportModal
          relationshipsTs={exportPayload.relationshipsTs}
          positionsTs={exportPayload.positionsTs}
          onClose={() => setExportPayload(null)}
        />
      )}
    </div>
  )
}
