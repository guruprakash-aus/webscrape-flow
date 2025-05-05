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
import { AppNode } from "@/types/appNode";
import DeletelableEdge from "./edges/DeletelableEdge";
import { TaskRegistry } from "@/lib/workflow/task/Registry";

type Props = { workflow: Workflow };

const nodeTypes = { FlowScrapeNode: NodeComponent };
const edgeTypes = { default: DeletelableEdge };

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

const FlowEditor: FC<Props> = ({ workflow }) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   createFlowNode(TaskType.LAUNCH_BROWSER)
  // ]);
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

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
    } catch (error) {}

    return () => {};
  }, [workflow.definition, setEdges, setNodes]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData("application/reactflow");

      if (typeof taskType === "undefined" || !taskType) return;

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newDone = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newDone));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      // Clear the input when a connection is made to a node
      if (!connection.targetHandle) return;

      const node = nodes.find((ns) => ns.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs as Record<string, string>;
      // delete nodeInputs[connection.targetHandle];

      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: ''
        }
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback((connection: Edge | Connection) => {

    // No self-connection allowed
    if (connection.source === connection.target) {
      return false;
    }

    // Same taskParam type connection
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (!sourceNode || !targetNode) {
      console.error("invalid connection: source or target node not found")
      return false;
    }

    const sourceTask = TaskRegistry[sourceNode.data.type]
    const targetTask = TaskRegistry[targetNode.data.type]

    const output = sourceTask.outputs.find(
      o => o.name === connection.sourceHandle
    )

    const input = targetTask.inputs.find(
      o => o.name === connection.targetHandle
    )

    if (input?.type !== output?.type) {
      console.error("Inv connection - Type Mismatch")
      return false;
    }

    const hasCycle = (node: AppNode, visited = new Set()) => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    }

    const detectedCycle = hasCycle(targetNode);
    return !detectedCycle;
  }, [nodes, edges])
  return (
    <main className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        // fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position='top-left' fitViewOptions={fitViewOptions} />
        <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
