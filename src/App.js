import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Row, Col, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import profilePic from "./Imag/web.png";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Tree from "./Components/Tree";
import Loader from "./Components/Loader/Loader";
import "./App.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && <Loader />}
      {!loading && (
        <Layout style={{ minHeight: "100vh" }}>
          <Layout>
            <Routes>
              <Route path="/tree" element={<Tree />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
        </Layout>
      )}
    </Router>
  );
};

export default App;
