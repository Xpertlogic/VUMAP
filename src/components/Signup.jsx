import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  notification,
  Checkbox,
  Modal,
  Row,
  Col,
} from "antd";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Signup() {
  const [form] = Form.useForm();
  //---> For OTP
  const [showOTPField, setShowOTPField] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      // Make a POST request to send OTP
      const response = await axios.post(
        "http://54.252.180.142:8080/api/auth/send-otp",
        {
          email: form.getFieldValue("email"),
        }
      );

      if (response.status === 200) {
        setEmail(form.getFieldValue("email"));
        setShowOTPField(true);
        setOtpSent(true);
        notification.success({
          message: "OTP Sent",
          description: "An OTP has been sent to your email address.",
        });
      } else {
        notification.error({
          message: "OTP Sending Failed",
          description: "Failed to send OTP. Please try again later.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while sending OTP. Please try again later.",
      });
    }
  };

  const onFinish = async (values) => {
    try {
      // Make a POST request to verify OTP
      const response = await axios.post(
        "http://54.252.180.142:8080/api/auth/verify-otp",
        {
          email,
          otp: values.otp,
        }
      );

      if (response.status === 200) {
        // OTP verification successful, proceed with registration
        // Make a POST request to register user
        const registerResponse = await axios.post(
          "http://54.252.180.142:8080/api/auth/signup",
          {
            username: values.name,
            password: values.password,
            email: email,
            roles: "user",
            company: values.company,
            phone: values.phone,
          }
        );
        if (registerResponse.status === 200) {
          window.location.reload(); //for instant reload
          notification.success({
            message: "Registration Successful",
            description: "You have successfully registered.",
          });
          setSignupModal(true); // Close the modal
        } else {
          setSignupModal(false);
        }
      } else {
        notification.error({
          message: "OTP Verification Failed",
          description: "Incorrect OTP entered. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Failed! User E-mail is already in use!"
      ) {
        notification.warning({
          message: "User Already Registered",
          description:
            "This email address is already registered. Please use a different email address.",
        });
      } else {
        // Handle other errors from the API call
        notification.error({
          message: "Registration Failed",
          description: "An error occurred while trying to register.",
        });
      }
    }
  };

  //---> For Reset Button
  const handleReset = () => {
    form.resetFields();
    setShowOTPField(false); // Hide OTP field and show verify button
    setOtpSent(false); // Reset OTP sent state
  };

  return (
    <section>
      {signupModal === true ? (
        <p className="text-[2rem]">
          Hi..you have successfully Registered now you can LogIn and enjoy our
          services.
        </p>
      ) : (
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={19}>
              <Form.Item
                name="email"
                label="E-mail"
                labelCol={{ span: 10 }}
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              {!showOTPField && (
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    onClick={handleVerifyEmail}
                    className="bg-green-500 text-white"
                  >
                    Verify
                  </Button>
                </Form.Item>
              )}
            </Col>
          </Row>

          {showOTPField && (
            <Form.Item
              name="otp"
              label="OTP"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
                message: "Please input your company name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="mb-5" />
          </Form.Item>
          <Form.Item
            className="text-center"
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please check the agreement"),
              },
            ]}
          >
            <Checkbox>
              I agree to the <Link to="/terms&condition">T&C</Link>
            </Checkbox>
          </Form.Item>

          {showOTPField && (
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-700 w-[60%]"
              >
                Register
              </Button>
              <Button
                type="default"
                onClick={handleReset}
                style={{ marginLeft: 8 }}
              >
                Reset
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </section>
  );
}

export default Signup;
