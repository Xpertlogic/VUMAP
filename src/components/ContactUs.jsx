import { Form, Input, Button } from "antd";
import { PhoneTwoTone, MailTwoTone, HomeTwoTone } from "@ant-design/icons";
import SocialMedia from "./SocialMedia";

function ContactUs() {
  return (
    <section className="contact-section container">
      <h1 className="heading-h1 slideInDownAnimation">Contact Us</h1>

      <div className="contact-header slideInUpAnimation">
        <p>
          <PhoneTwoTone />
          <span>
            Phone:- <a href="tel:+918456898666">+91 8456898666</a>
          </span>
        </p>
        <p className="mb-4">
          <MailTwoTone />
          <span>
            Email:-{" "}
            <a href="mailto:support@gismapslayers.com">
              support@gismapslayers.com
            </a>
          </span>
        </p>
        <p className="mb-4 leading-tight">
          <HomeTwoTone />
          <span>
            Address:- PLOT NO 144/C, Prachi Enclave Road, Gujarat Bhawan,
            Bhubaneswar, Khordha, Odisha, 751023
          </span>
        </p>
        <div>
          <SocialMedia />
        </div>
      </div>

      <div className="contact-form slideInUpAnimation">
        <Form name="contact" scrollToFirstError>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Write your Name..." />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Write your E-mail..." />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input placeholder="Write your Phone Number..." />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[
              {
                required: false,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Write a message..." />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="button-item message-btn"
          >
            Send Message
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default ContactUs;
