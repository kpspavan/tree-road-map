import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Image } from "antd";
import { useNavigate } from "react-router-dom";
import profilePic from "../../Imag/web.png";
import ContactForm from "../Contact/Contact";
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
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsBannerVisible(true);
    }, 500);
  }, []);

  const handleRoadMapClick = () => {
    navigate("/tree");
  };

  const showContactForm = () => {
    setIsContactFormVisible(true);
  };

  const handleContactFormClose = () => {
    setIsContactFormVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className={`red-banner ${isBannerVisible ? "fade-in" : ""}`}>
        <div className="moving-line"></div>
        <Typography.Title level={2} style={{ color: "white", margin: 0 }}>
          Limited Seats! Only 20 people for this class.
        </Typography.Title>
      </div>
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
              <button className="learn-more" onClick={handleRoadMapClick}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Road Map</span>
              </button>
              <button
                className="learn-more"
                onClick={showContactForm}
                style={{ marginLeft: "10px" }}
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Contact Me</span>
              </button>
            </Col>
          </Row>
        </Content>
      </Layout>
      <ContactForm
        visible={isContactFormVisible}
        onClose={handleContactFormClose}
      />
    </Layout>
  );
};

export default Home;
