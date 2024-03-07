import { Form, Input, Button } from "antd";
import { PhoneTwoTone, MailTwoTone, HomeTwoTone } from "@ant-design/icons";

function ContactUs() {
  return (
    <section className="contact-section">
      <h1>Contact Us</h1>

      <div className="contact-header slideInUpAnimation">
        <p>
          <PhoneTwoTone />
          Phone:- <a href="tel:+1234567890">+1 (234) 567-890</a>
        </p>
        <p>
          <MailTwoTone /> Email:-{" "}
          <a href="mailto:example@example.com">example@example.com</a>
        </p>
        <p>
          <HomeTwoTone /> Address:- Lorem, Lorem, ipsum dolor. 751245
        </p>
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
            // label="E-mail"
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
            // label="Phone Number"
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

          <Button type="primary" htmlType="submit" className="bg-blue-700">
            Send Message
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default ContactUs;
