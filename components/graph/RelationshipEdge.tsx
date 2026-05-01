'use client'

import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  MarkerType,
} from '@xyflow/react'

type EdgeData = { property?: string; highlighted?: boolean }

function makeEdgeComponent(
  stroke: string,
  strokeDasharray?: string
) {
  return function EdgeComponent({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    style,
    data,
    markerEnd,
  }: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })

    const d = data as EdgeData | undefined
    const showLabel = d?.highlighted && label

    return (
      <>
        <BaseEdge
          id={id}
          path={edgePath}
          markerEnd={markerEnd}
          style={{
            stroke,
            strokeWidth: 1.2,
            ...(strokeDasharray ? { strokeDasharray } : {}),
            ...style,
          }}
        />
        {showLabel && (
          <EdgeLabelRenderer>
            <div
              className="absolute pointer-events-none nodrag nopan"
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
            >
              <span className="text-[9px] bg-white border border-gray-200 rounded px-1 py-0.5 text-gray-600 shadow-sm whitespace-nowrap">
                {label as string}
                {d?.property && (
                  <span className="ml-1 text-blue-400">[{d.property}]</span>
                )}
              </span>
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    )
  }
}

export const SpecialCaseEdge = makeEdgeComponent('#374151')
export const LimitingEdge    = makeEdgeComponent('#2563eb', '6 4')
export const TransformationEdge = makeEdgeComponent('#0d9488', '2 4')
export const BayesianEdge    = makeEdgeComponent('#7c3aed', '8 3 2 3')

export const DEFAULT_MARKER_END = {
  type: MarkerType.ArrowClosed,
  width: 10,
  height: 10,
}
