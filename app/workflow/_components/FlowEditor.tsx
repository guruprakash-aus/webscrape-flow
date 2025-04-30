"use client";

import type { DragEvent } from "react";

import { type FC, useCallback, useEffect } from "react";
import type { Connection, Edge } from "@xyflow/react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  getOutgoers,
  useEdgesState,
  useNodes,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { toast } from "sonner";

import type { Workflow } from "@prisma/client";
import createFlowNode from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";

type Props = { workflow: Workflow };

const nodeTypes = { FlowScrapeNode: NodeComponent };

const snapGrid: [number, number] = [50,50];
const fitViewOptions = {padding: 1}

const FlowEditor: FC<Props> = ({ workflow }) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   createFlowNode(TaskType.LAUNCH_BROWSER)
  // ]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;

      setViewport({ x, y, zoom });
    } catch (error) {
      
    }
  
    return () => {
      
    }
  }, [workflow.definition, setEdges, setNodes])
  

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        // fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
