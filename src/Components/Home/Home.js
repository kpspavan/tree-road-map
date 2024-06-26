// Home.js
import React from "react";
import { Layout, Typography, Button, Row, Col, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import profilePic from "../../Imag/web.png";
import "./Home.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AnimatedText = ({ text, className }) => (
  <Title className={className} level={3}>
    {text}
  </Title>
);

const TransitionEffect = () => <div className="transition-effect"></div>;

const Home = () => {
  const navigate = useNavigate();

  const handleRoadMapClick = () => {
    navigate("/tree");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TransitionEffect />
          <Row
            gutter={[16, 16]}
            justify="center"
            align="middle"
            style={{ width: "100%" }}
          >
            <Col xs={24} md={12}>
              <Image
                src={profilePic}
                alt="developer"
                preview={false}
                className="w-full h-auto"
              />
            </Col>
            <Col xs={24} md={12} className="text-center">
              <AnimatedText
                text="Responsive Web Design always plays an important role whenever going to promote your website."
                className="!text-3xl !text-left xl:!text-3xl lg:!text-center lg:!text-3xl md:!text-3xl sm:!text-3xl"
              />
              <Paragraph className="my-4 text-base font-medium md:text-sm sm:text-xs">
                As a Front End Developer, I am dedicated to turning ideas into
                innovative web applications. Explore my latest projects,
                showcasing my expertise in Front End.
              </Paragraph>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                onClick={handleRoadMapClick}
              >
                Road Map
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
