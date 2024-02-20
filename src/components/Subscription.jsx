import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import useRazorpay from "react-razorpay";
import "../style/subscription.scss";

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [Razorpay, isLoaded] = useRazorpay();

  const PricingCard = ({ title, price, features, isActive }) => {
    const handlePayment = async (plan, price) => {
      // Static user data
      const userData = {
        username: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      };

      const amount =
        parseFloat(
          price
            .replace("₹", "")
            .replace(",", "")
            .replace(" /3 Months", "")
            .replace(" /12 Months", "")
        ) * 100; // Convert price to integer amount in paise

      const options = {
        key: "rzp_test_idc2jcfNoLW3KG",
        amount: amount,
        currency: "INR",
        name: "Acme Corp",
        description: `Subscription for ${
          plan === "free" ? "Premium" : "Premium Plus"
        } Plan`,
        image: "https://example.com/your_logo",
        handler: async (razorpayResponse) => {
          try {
            const Payload = {
              email: userData.email,
              tier: plan === "free" ? "tier1" : "tier2", // Update tier based on plan
              paymentid: razorpayResponse.razorpay_payment_id,
            };

            const response = await axios.post(
              "http://54.252.180.142:8080/api/user/payments",
              Payload
            );

            if (!response.data.success) {
              throw new Error("Failed to record payment");
            }
            setPaymentSuccess(true);
            console.log("Payment recorded successfully!");
            // Handle any further actions after successful payment
          } catch (error) {
            console.error("Error recording payment:", error);
          }
        },
        prefill: {
          name: userData.username,
          email: userData.email,
          contact: userData.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    };

    const handleSubscribe = () => {
      const plan = title.toLowerCase().includes("premium")
        ? "premium"
        : "premium plus";
      handlePayment(plan, price);
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
        <button onClick={handleSubscribe} className="subscribe-link">
          Subscribe
        </button>
        <Link to="/" className="terms-link">
          Terms & Conditions
        </Link>
      </div>
    );
  };

  return (
    <section>
      <header>
        <h1>Subscription Plan</h1>
      </header>
      {paymentSuccess ? (
        <div>
          <h2>Payment successful!</h2>
        </div>
      ) : (
        <div className="wrapper">
          <PricingCard
            title="Premium Plan"
            price="₹299 /3 Months"
            features={[
              "Unlimited boundary downloads",
              "Download limit: Users can download up to 1000 POIs (Points of Interest)",
              "Access to limited features for the duration of the subscription",
            ]}
            isActive={false}
          />
          <PricingCard
            title="Premium Plus Plan"
            price="₹999 /12 Months"
            features={[
              "Unlimited boundary downloads",
              "Download limit: Users can download up to 3000 POIs (Points of Interest)",
              "House number feature: Exclusive access for Premium Plus members",
              "Access to more limited features compared to the Premium Plan",
            ]}
            isActive={true}
          />
        </div>
      )}
    </section>
  );
}

export default Subscription;
