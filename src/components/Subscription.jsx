import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { Modal } from "antd"; // Import Modal from Ant Design
import Signup from "./Signup"; // Import the Signup component
import "../style/subscription.scss";

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store selected plan
  const [signupModalVisible, setSignupModalVisible] = useState(false); // State to manage signup modal visibility

  const PricingCard = ({ title, price, features, isActive }) => {
    const handleSubscribe = () => {
      setSelectedPlan({ title, price, features, isActive }); // Set selected plan
      setSignupModalVisible(true); // Open signup modal
    };

    return (
      <div className={`card ${isActive ? "active" : ""}`}>
        <h3>{title}</h3>
        <h1>{price}</h1>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              <CheckOutlined /> {feature}
            </li>
          ))}
        </ul>
        <Link onClick={handleSubscribe} className="subscribe-link">
          Subscribe
        </Link>
        <Link to="/" className="terms-link">
          Terms & Conditions
        </Link>
      </div>
    );
  };

  const plans = [
    // {
    //   title: "Basic Plan",
    //   price: "₹399 /3 Months",

    //   features: [
    //     "Unlimited basic exports",
    //     "Pay as you go PRO exports",
    //     "Area up to 1 km²",
    //     "Precision 5m",
    //   ],
    //   isActive: false,
    // },
    {
      title: "Premium Plan",
      price: "₹299 /3 Months",

      features: [
        "Unlimited boundary downloads",
        "Download limit: Users can download up to 1000 POIs (Points of Interest)",
        "Access to limited features for the duration of the subscription",
      ],
      isActive: false,
    },
    {
      title: "Premium Plus Plan",
      price: "₹999 /12 Months",

      features: [
        "Unlimited boundary downloads",
        "Download limit: Users can download up to 3000 POIs (Points of Interest)",
        "House number feature: Exclusive access for Premium Plus members",
        "Access to more limited features compared to the Premium Plan",
      ],
      isActive: true,
    },
  ];

  return (
    <section>
      <header>
        <h1>Subscription Plan</h1>
      </header>
      <div className="wrapper">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>

      {/* Signup Modal */}

      <Modal
        title={`Subscribe to ${selectedPlan ? selectedPlan.title : ""}`}
        open={signupModalVisible}
        onCancel={() => setSignupModalVisible(false)}
        footer={null}
      >
        {/* Pass selected plan information to the Signup component */}
        {selectedPlan && <Signup plan={selectedPlan} />}
      </Modal>
    </section>
  );
}

export default Subscription;
