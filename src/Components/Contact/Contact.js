import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { CSSTransition } from "react-transition-group";
import "animate.css";
import emailjs from "emailjs-com";
import "./Contact.css";

const ContactForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [animate, setAnimate] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        sendEmail(values);
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1500);
      });
  };

  const sendEmail = (formValues) => {
    const { name, phone } = formValues;
    const templateParams = {
      name,
      phone,
    };

    emailjs
      .send(
        "service_5ig89ar",
        "template_3xajdmt",
        templateParams,
        "tD1S0ld3xVyrSU6iF"
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          message.success("Email sent successfully!");
          form.resetFields();
        },
        (error) => {
          console.log("Failed to send email.", error.text);
          message.error("Failed to send email.");
        }
      );
  };

  return (
    <CSSTransition in={visible} classNames="modal" unmountOnExit>
      <Modal
        title="Contact Form"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="contact_form">
          <Form.Item
            name="name"
            label="Enter your Name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 3, message: "Name must be at least 3 characters!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Enter your Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10,}$/,
                message: "Phone number must be at least 10 digits!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </CSSTransition>
  );
};

export default ContactForm;
