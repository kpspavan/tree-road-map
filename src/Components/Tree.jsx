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
import { Drawer, Layout, Collapse, Modal } from "antd";
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
    subtopics: [
      "Internet Basics",
      "Web Browsers",
      "Web Browsers",
      "Web Performance",
      "Internet Security for Front-End",
    ],
    position: { x: -338.403, y: -82.517 },
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
      {
        title: "Internet Basics",
        details: [
          "Introduction to the Internet",
          "How the Internet Works",
          "Internet Protocols (HTTP, HTTPS)",
          "Domain Name System (DNS)",
        ],
      },
      {
        title: "Web Browsers",
        details: [
          "Introduction to Web Browsers",
          "Popular Web Browsers",
          "How Web Browsers Work",
          "Developer Tools",
        ],
      },
      {
        title: "Web Hosting and Servers",
        details: [
          "What is Web Hosting?",
          "Types of Web Hosting",
          "Introduction to Web Servers",
          "Client-Server Model",
        ],
      },
      {
        title: "Web Performance",
        details: [
          "Page Load Time",
          "Optimizing Assets (Images, CSS, JS)",
          "Caching Mechanisms",
        ],
      },
      {
        title: "Internet Security for Front-End",
        details: ["Introduction to Internet Security", "HTTPS and SSL/TLS"],
      },
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
        details: [
          "Introduction to JavaScript",
          "JavaScript Syntax",
          "How to Add JavaScript in HTML Document?",
          "JavaScript Comments",
          "JavaScript Variables",
          "Variables and Datatypes in JavaScript",
        ],
      },
      {
        title: "JavaScript Statements",
        details: [
          "JavaScript if-else",
          "JavaScript switch Statement",
          "JavaScript Errors Throw and Try to Catch",
        ],
      },
      {
        title: "JavaScript Loops",
        details: [
          "JavaScript For Loop",
          "JavaScript for-in Loop",
          "JavaScript for of Loop",
        ],
      },
      {
        title: "JavaScript Operators",
        details: [
          "JavaScript Arithmetic Operators",
          "JavaScript Assignment Operators",
          "JavaScript Comparison Operators",
          "JavaScript Logical Operators",
        ],
      },
      {
        title: "JavaScript Built-in Objects",
        details: [
          "JavaScript Arrays",
          "JavaScript Strings",
          "JavaScript Numbers",
        ],
      },
      {
        title: "JavaScript Functions",
        details: [
          "Function Declaration",
          "Function Expressions",
          "Arrow Functions",
          "IIFEs",
          "Async functions",
        ],
      },
      {
        title: "JavaScript DOM",
        details: [
          "DOM Introduction",
          "Selecting DOM Elements",
          "Changing Content of HTML Elements",
          "Changing Styles of HTML Elements",
          "Event Listeners",
          "Creating and Inserting Elements",
          "Removing Elements",
          "Traversing the DOM",
        ],
      },
      {
        title: "JavaScript this Keyword",
        details: [
          "In a method",
          "In a function",
          "Using it alone",
          "In arrow functions",
        ],
      },
      {
        title: "Asynchronous JavaScript",
        details: [
          "Callbacks",
          "Promises",
          "async / await",
          "setTimeout",
          "setInterval",
        ],
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
      {
        title: "React Basics",
        details: [
          "Introduction to React",
          "Setting up a React Environment",
          "JSX Syntax and Expressions",
          "Components and Props",
          "State and Lifecycle",
          "Handling Events",
          "Conditional Rendering",
          "Lists and Keys",
          "Forms in React",
          "Lifting State Up",
          "Composition vs Inheritance",
        ],
      },
      {
        title: "React Class Components",
        details: [
          "Creating a Class Component",
          "Constructor and Super",
          "State in Class Components",
          "Component Lifecycle Methods",
          "Handling Events",
          "Conditional Rendering",
          "Using Props in Class Components",
          "Default Props",
          "Setting State Correctly",
          "Performance Optimization",
        ],
      },
      {
        title: "React Functional Components",
        details: [
          "Introduction to Functional Components",
          "Writing a Functional Component",
          "Props in Functional Components",
          "Using State with useState Hook",
          "Using Effects with useEffect Hook",
          "Context API with Functional Components",
          "Memoization with React.memo",
          "Handling Events",
          "Using Refs in Functional Components",
        ],
      },
      {
        title: "React Hooks",
        details: [
          "Introduction to React Hooks",
          "useState Hook",
          "useEffect Hook",
          "useContext Hook",
          "useReducer Hook",
          "useCallback Hook",
          "useMemo Hook",
          "useRef Hook",
          "useImperativeHandle Hook",
          "useLayoutEffect Hook",
          "useDebugValue Hook",
          "Custom Hooks",
        ],
      },
      {
        title: "React State Management",
        details: [
          "Introduction to State Management",
          "Local State",
          "Global State with Context API",
          "State Management with Redux",
          "State Management with MobX",
          "Using React Query for Server State",
          "Comparison of Different State Management Solutions",
          "Best Practices for State Management",
          "Handling Side Effects",
          "Performance Optimization in State Management",
        ],
      },
    ],
  },

  Nextjs: {
    subtopics: [
      {
        title: "Next.js Basics",
        details: [
          "Introduction to Next.js",
          "Setting up a Next.js Project",
          "Creating Pages",
          "Linking between Pages",
          "Customizing the App Component",
          "Customizing the Document",
          "Static Assets in Next.js",
          "Styling in Next.js (CSS, Sass, CSS-in-JS)",
        ],
      },
      {
        title: "Next.js Routing",
        details: [
          "Introduction to Next.js Routing",
          "Dynamic Routes",
          "Nested Routes",
          "API Routes",
          "Customizing the Router",
          "Route Prefetching",
          "Middleware in Routing",
          "Internationalized Routing",
        ],
      },
      {
        title: "Next.js Data Fetching",
        details: [
          "Introduction to Data Fetching in Next.js",
          "getStaticProps",
          "getStaticPaths",
          "getServerSideProps",
          "Client-Side Data Fetching",
          "Incremental Static Regeneration",
          "Static Site Generation",
          "Server-Side Rendering",
          "Combining Static and Server-Side Rendering",
          "API Routes for Data Fetching",
        ],
      },
      {
        title: "Next.js Rendering",
        details: [
          "Introduction to Next.js Rendering",
          "Static Generation",
          "Server-Side Rendering",
          "Hybrid Rendering",
          "Incremental Static Regeneration",
          "Optimizing Performance",
          "SEO Best Practices",
          "Using Head for Metadata",
          "Custom Error Pages",
        ],
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
  console.log("drawerContent", drawerContent);
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
    <Layout>
      <>
        <div
          id="pavan"
          style={{
            height: "100vh",
            position: "relative",
            left: "-70px",

            padding: "20px",
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
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={false}
            panOnScrollMode="vertical"
            elementsSelectable={false}
          >
            <style>
              {`
            .react-flow__panel.react-flow__attribution {
              display: none;
            }
          `}
            </style>
          </ReactFlow>
        </div>

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
      </>
      <div>
        <Drawer
          title={drawerContent}
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
      </div>
    </Layout>
  );
};

export default Tree;
