import React, { useState, useEffect, useCallback } from "react";
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
import { Drawer, Collapse, Modal } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "reactflow/dist/style.css";
import "./Tree.css";

const { Panel } = Collapse;

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
    position: { x: 100, y: 0 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "2",
    data: { label: "HTML" },
    position: { x: 100, y: 150 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "3",
    data: { label: "CSS" },
    position: { x: 100, y: 300 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "4",
    data: { label: "JavaScript" },
    position: { x: 100, y: 450 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "5",
    data: { label: "Git" },
    position: { x: 100, y: 600 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "6",
    data: { label: "React" },
    position: { x: 100, y: 750 },
    type: "main",
    style: nodeStyle,
  },
  {
    id: "7",
    data: { label: "Nextjs" },
    position: { x: 100, y: 900 },
    type: "main",
    style: nodeStyle,
  },
];

const topics = [
  {
    id: "8",
    subtopics: ["Internet Topic 1", "Internet Topic 2"],
    position: { x: -338.403, y: -14.401 },
    type: "left",
  },
  {
    id: "9",
    subtopics: [
      "HTML Basics",
      "HTML Basic Elements",
      "HTML Attributes",
      "HTML Lists",
      "HTML Input Field and Forms",
      "HTML Tables",
      "HTML Media",
    ],
    position: { x: 620.008, y: 36.3923 },
    type: "right",
  },
  {
    id: "10",
    subtopics: [
      "CSS Basics",
      "CSS Selectors",
      "CSS Properties",
      "CSS Designing",
    ],
    position: { x: -339.163, y: 257.432 },
    type: "left",
  },
  {
    id: "11",
    subtopics: [
      "JavaScript Basics",
      "JavaScript Statements",
      "JavaScript Operators",
      "JavaScript Built-in Objects",
    ],
    position: { x: 623.208, y: 373.195 },
    type: "right",
  },
  {
    id: "12",
    subtopics: [
      "Intro & Installation",
      "Fundamental Operations",
      "Syncing Techniques",
      "Branching & Merging",
    ],
    position: { x: -344.271, y: 513.16 },
    type: "left",
  },
  {
    id: "13",
    subtopics: [
      "React Basics",
      "React Class component",
      "React Functional components",
      "React Hooks",
      "React State management",
    ],
    position: { x: 626.409, y: 661.994 },
    type: "right",
  },
  {
    id: "14",
    subtopics: [
      "Next.js Basics",
      "Next.js Routing",
      "Next.js Data Fetching",
      "Next.js Rendering",
    ],
    position: { x: -347.677, y: 831.89 },
    type: "left",
  },
];

const subTopicNodes = topics.map((topic) => ({
  id: topic.id,
  data: { label: topic.subtopics.join("\n") },
  position: topic.position,
  type: topic.type,
  style: { ...nodeStyle, width: "200px" },
}));

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    animated: true,
    style: { strokeWidth: 3, stroke: "#000000" },
  },
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
    style: { strokeWidth: 3, stroke: "#000000" },
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
    style: { strokeWidth: 3, stroke: "#000000" },
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
    style: { strokeWidth: 3, stroke: "#000000" },
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

const LeftCustomNode = ({ data, style }) => (
  <div style={style} className="custom-node">
    <Handle
      type="target"
      position="left"
      style={{
        background: "transparent",
        border: "none",
        left: "200px",
        zIndex: 10,
      }}
      className="react-flow__handle-left"
    />
    {data.label.split("\n").map((line, index) => (
      <div key={index} className="node-line">
        {line}
      </div>
    ))}
    <Handle
      type="source"
      position="right"
      style={{ background: "transparent", border: "none", right: "10px" }}
      className="react-flow__handle-right"
    />
  </div>
);

const RightCustomNode = ({ data, style }) => (
  <div style={style} className="custom-node">
    <Handle
      type="target"
      position="left"
      style={{ background: "transparent", border: "none", left: "-8px" }}
      className="react-flow__handle-left"
    />
    {data.label.split("\n").map((line, index) => (
      <div key={index} className="node-line">
        {line}
      </div>
    ))}
    <Handle
      type="source"
      position="right"
      style={{ background: "transparent", border: "none", right: "-8px" }}
      className="react-flow__handle-right"
    />
  </div>
);

const MainCustomNode = ({ data, style }) => (
  <div
    style={style}
    className="custom-node"
    onClick={() => data.onClick(data.label)}
  >
    <Handle
      type="target"
      position="left"
      style={{ background: "transparent", border: "none", left: "-8px" }}
      className="react-flow__handle-left"
    />
    {data.label.split("\n").map((line, index) => (
      <div key={index} className="node-line">
        {line}
      </div>
    ))}
    <Handle
      type="source"
      position="right"
      style={{ background: "transparent", border: "none", right: "8px" }}
      className="react-flow__handle-right"
    />
  </div>
);

const nodeTypes = {
  left: LeftCustomNode,
  right: RightCustomNode,
  main: MainCustomNode,
};

const topicSubtopicsMap = {
  "Internet Fundamentals": {
    subtopics: [
      { title: "Internet Topic 1", details: ["Detail 1", "Detail 2"] },
      { title: "Internet Topic 2", details: ["Detail 1", "Detail 2"] },
    ],
  },
  HTML: {
    subtopics: [
      {
        title: "HTML Basics",
        details: [
          "HTML Introduction",
          "HTML Basics",
          "HTML Layout",
          "HTML Editors",
          "HTML Comments",
        ],
      },
      {
        title: "HTML Basic Elements",
        details: [
          "HTML Headings",
          "HTML Paragraphs",
          "HTML Style Tag",
          "HTML Text Formatting  Elements",
          "HTML Color Styles and HSL",
          "HTML <hr> Tag",
          "HTML <br> Tag",
          "HTML Block and Inline Elements",
          "HTML Links Hyperlinks",
          "HTML Images",
          "HTML Iframes",
        ],
      },
      {
        title: "HTML Attributes",
        details: [
          "HTML Class Attribute",
          "HTML Id Attribute",
          "HTML title Attribute",
          "HTML style attribute",
          "HTML height Attribute",
          "HTML src attribute",
          "HTML alt attribute",
        ],
      },
      {
        title: "HTML Lists",
        details: [
          "HTML <ol> Tag",
          "HTML <ul> Tag",
          "Explain Description Lists in HTML",
          "Unordered, Ordered, and Description Lists in HTML",
        ],
      },
      {
        title: "HTML Input Field and Forms",
        details: [
          "HTML input Tag",
          "HTML form Tag",
          "HTML form Attribute",
          "HTML Forms",
        ],
      },
      {
        title: "HTML Tables",
        details: [
          "HTML Tables",
          "HTML thead Tag",
          "HTML tbody Tag",
          "HTML  <td> Tag",
          "HTML tr Tag",
        ],
      },
      {
        title: "HTML Media",
        details: ["HTML media attribute", "HTML Video"],
      },
    ],
  },
  CSS: {
    subtopics: [
      {
        title: "CSS Basics",
        details: [
          "CSS Introduction",
          "CSS Syntax",
          "Types of CSS (Cascading Style Sheet)",
          "CSS Comments",
        ],
      },
      {
        title: "CSS Selectors",
        details: [
          "CSS #id Selector",
          "CSS Class Selector",
          "CSS * Selector",
          "CSS Attribute Selector",
          "CSS Pseudo-classes",
          "CSS element Selector",
        ],
      },
      {
        title: "CSS Properties",
        details: [
          "CSS Colors",
          "CSS Background",
          "CSS Borders",
          "CSS Margins",
          "CSS Fonts",
          "CSS Cursor Property",
          "CSS Combinators",
          "CSS Pseudo Elements",
          "CSS Float",
          "CSS Image Sprites",
          "CSS Units",
          "CSS z-index Property",
        ],
      },
      {
        title: "CSS Designing",
        details: ["CSS Grid ", "CSS FLEX BOX", "CSS Box model"],
      },
    ],
  },
  JavaScript: {
    subtopics: [
      {
        title: "JavaScript Basics",
        details: ["Details about JavaScript Basics..."],
      },
      {
        title: "JavaScript Statements",
        details: ["Details about JavaScript Statements..."],
      },
      {
        title: "JavaScript Operators",
        details: ["Details about JavaScript Operators..."],
      },
      {
        title: "JavaScript Built-in Objects",
        details: ["Details about JavaScript Built-in Objects..."],
      },
    ],
  },
  Git: {
    subtopics: [
      {
        title: "Intro & Installation",
        details: ["What is Version Control?", "What is Git?", "Install Git"],
      },
      {
        title: "Fundamental Operations",
        details: [
          "Core Terminology",
          "Creating Repositories",
          "Tracking Files",
          "The Commit Workflow",
        ],
      },
      {
        title: "Syncing Techniques",
        details: ["Cloning", "Pushing", "Fetching", "Pulling"],
      },
      {
        title: "Branching & Merging",
        details: [
          "Branch Theory",
          "Creating and Switching Branches",
          "Merging Branches",
          "Resolving Merge Conflicts",
        ],
      },
    ],
  },
  React: {
    subtopics: [
      { title: "React Basics", details: ["Details about React Basics..."] },
      {
        title: "React Class component",
        details: ["Details about React Class component..."],
      },
      {
        title: "React Functional components",
        details: ["Details about React Functional components..."],
      },
      { title: "React Hooks", details: ["Details about React Hooks..."] },
      {
        title: "React State management",
        details: ["Details about React State management..."],
      },
    ],
  },
  Nextjs: {
    subtopics: [
      { title: "Next.js Basics", details: ["Details about Next.js Basics..."] },
      {
        title: "Next.js Routing",
        details: ["Details about Next.js Routing..."],
      },
      {
        title: "Next.js Data Fetching",
        details: ["Details about Next.js Data Fetching..."],
      },
      {
        title: "Next.js Rendering",
        details: ["Details about Next.js Rendering..."],
      },
    ],
  },
};

const Tree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    ...initialNodes,
    ...subTopicNodes,
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [selectedSubtopicDetails, setSelectedSubtopicDetails] = useState([]);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("introShown")) {
      setIntroVisible(true);
      localStorage.setItem("introShown", "true");
    }
  }, []);

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
    setSelectedSubtopic("");
    setSelectedSubtopicDetails([]);
  };
  const renderExpandIcon = ({ isActive }) => (
    <span className={`animated-icon ${isActive ? "expanded" : "collapsed"}`}>
      <PlusOutlined className="plus-icon" />
    </span>
  );

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
        width={600}
        bodyStyle={{ padding: "20px", background: "#f7f7f7" }}
      >
        <div className="custom-scrollbar" style={{ height: "100%" }}>
          <Collapse
            bordered={false}
            expandIcon={renderExpandIcon}
            expandIconPosition="right"
            style={{ background: "#f7f7f7", borderRadius: "5px" }}
          >
            {topicSubtopicsMap[drawerContent]?.subtopics.map(
              (subtopic, index) => (
                <Panel
                  header={subtopic.title}
                  key={index}
                  style={{
                    background: "#fff",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #e8e8e8",
                    padding: "10px",
                  }}
                >
                  {subtopic.details.map((detail, idx) => (
                    <p key={idx} className="panel-item">
                      {detail}
                    </p>
                  ))}
                </Panel>
              )
            )}
          </Collapse>
        </div>
      </Drawer>
      <Modal
        title="Welcome to the Tree Structure"
        visible={introVisible}
        onOk={() => setIntroVisible(false)}
        onCancel={() => setIntroVisible(false)}
        okText="Got it!"
      >
        <p>
          This is a tree structure. Click on a main node to change topics. You
          can close the drawer by clicking outside of it or using the close
          button. Clicking on a main node will open the drawer with details.
        </p>
      </Modal>
    </div>
  );
};

export default Tree;
