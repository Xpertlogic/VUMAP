import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import "../style/subscription.scss";

function Subscription() {
  const PricingCard = ({ title, price, description, features, isActive }) => {
    return (
      <div className={`card ${isActive ? "active" : ""}`}>
        <h3>{title}</h3>
        <h1>{price}</h1>
        <p>{description}</p>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              <CheckOutlined /> {feature}
            </li>
          ))}
        </ul>
        <Link to="/" className="subscribe-link">
          Subscribe
        </Link>
      </div>
    );
  };

  const plans = [
    {
      title: "Basic Plan",
      price: "₹399 /3 Months",
      description: "For Most Business that want to optimize their web queries.",
      features: [
        "Unlimited basic exports",
        "Pay as you go PRO exports",
        "Area up to 1 km²",
        "Precision 5m",
      ],
      isActive: false,
    },
    {
      title: "Premium Plan",
      price: "₹599 /6 Months",
      description: "For Most Business that want to optimize their web queries.",
      features: [
        "Unlimited basic exports",
        "5 PRO exports per user per month",
        "Area up to 50 km²",
        "Precision 1m",
        "OpenStreetMap trees",
        "Priority support",
      ],
      isActive: true,
    },
    {
      title: "Vip Plan",
      price: "₹999 /12 Months",
      description: "For Most Business that want to optimize their web queries.",
      features: [
        "Unlimited basic exports",
        "40 PRO exports per user per month",
        "Area up to 50 km²",
        "Precision 1m",
        "OpenStreetMap trees",
        "Priority support",
      ],
      isActive: false,
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
    </section>
  );
}

export default Subscription;
