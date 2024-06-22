import React, { useState, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
  Handle,
  MarkerType,
} from "reactflow";
import { Drawer, Button } from "antd";
import "reactflow/dist/style.css";
import "./App.css"; // Import custom CSS file

const nodeStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #007bff",
  textAlign: "center",
  width: "250px",
  fontSize: "16px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
};

const initialNodes = [
  {
    id: "1",
    data: { label: "Internet Fundamentals" },
    position: { x: 0, y: -300 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "2",
    data: { label: "HTML" },
    position: { x: 200, y: -100 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "3",
    data: { label: "CSS" },
    position: { x: -200, y: 50 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "4",
    data: { label: "JavaScript" },
    position: { x: 200, y: 200 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "5",
    data: { label: "Git" },
    position: { x: -200, y: 350 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "6",
    data: { label: "React" },
    position: { x: 200, y: 500 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "7",
    data: { label: "Next.js" },
    position: { x: 0, y: 700 },
    type: "custom",
    style: nodeStyle,
  },
  {
    id: "8",
    data: { label: "Internet Topic 1\nInternet Topic 2" },
    position: { x: -500, y: -300 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },

  {
    id: "9",
    data: {
      label:
        "HTML Basics\nHTML Basic Elements\nHTML Attributes\nHTML Lists\nHTML Input Field and Forms\nHTML Tables\nHTML Media",
    },
    position: { x: 700, y: -200 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
  {
    id: "10",
    data: { label: "CSS Basics\nCSS Selectors\nCSS Properties\nCSS Designing" },
    position: { x: -600, y: 50 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
  {
    id: "11",
    data: { label: "JS Topic 1\nJS Topic 2\nJS Topic 3\nJS Topic 4" },
    position: { x: 700, y: 150 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
  {
    id: "12",
    data: { label: "Git Topic 1\nGit Topic 2\nGit Topic 3" },
    position: { x: -600, y: 350 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
  {
    id: "13",
    data: {
      label:
        "React Topic 1\nReact Topic 2\nReact Topic 3\nReact Topic 4\nReact Topic 5",
    },
    position: { x: 700, y: 450 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
  {
    id: "14",
    data: {
      label:
        "Next.js Topic 1\nNext.js Topic 2\nNext.js Topic 3\nNext.js Topic 4",
    },
    position: { x: -600, y: 700 },
    type: "custom",
    style: { ...nodeStyle, width: "200px" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "bezier",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  // {
  // id: "1",
  // data: { label: "Internet Fundamentals" },
  // position: { x: 0, y: -300 },
  // type: "custom",
  // style: nodeStyle,
  // },
  // {
  // id: "2",
  // data: { label: "HTML" },
  // position: { x: 200, y: -100 },
  // type: "custom",
  // style: nodeStyle,
  // },
  {
    id: "e1-8",
    source: "1",
    target: "8",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e2-9",
    source: "2",
    target: "9",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "red" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e3-10",
    source: "3",
    target: "10",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e4-11",
    source: "4",
    target: "11",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "red" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e5-12",
    source: "5",
    target: "12",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e6-13",
    source: "6",
    target: "13",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "red" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
  {
    id: "e7-14",
    source: "7",
    target: "14",
    type: "straight",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
  },
];

const CustomNode = ({ data, style }) => (
  <div
    style={style}
    className="custom-node"
    onClick={() => data.onClick(data.label)}
  >
    <Handle
      type="source"
      position="right"
      style={{ background: "transparent", border: "none" }}
    />
    {data.label.split("\n").map((line, index) => (
      <div key={index} className="node-line">
        {line}
      </div>
    ))}
    <Handle
      type="target"
      position="left"
      style={{ background: "transparent", border: "none" }}
    />
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setEdges]
  );

  const handleNodeClick = (label) => {
    setDrawerContent(label);
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onClick: handleNodeClick },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={true}
        panOnScrollMode="vertical"
        elementsSelectable={false}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
      <Drawer
        title="Node Details"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
        mask={false}
        maskClosable={false}
      >
        <p>{drawerContent}</p>
      </Drawer>
    </div>
  );
};

export default App;
