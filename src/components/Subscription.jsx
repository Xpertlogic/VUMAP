import { useState, useContext, useEffect } from "react";
import "../style/subscription.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import useRazorpay from "react-razorpay";
import { LoginContext } from "../context/LoginContext";
import { SubscribeContext } from "../context/SubscribeContext";

function Subscription() {
  // const [paymentSuccess,setPaymentSuccess] = useState(false)
  const [Razorpay, isLoaded] = useRazorpay();
  const [paymentPlan, setPaymentPlan] = useState('');
  const {
    userData,
    storedToken,
    // subscriptionState, setSubscriptionState
  } = useContext(LoginContext);

  const { subscriptionState, setSubscriptionState } =
    useContext(SubscribeContext);

  const PricingCard = ({ title, price, features, isActive, plan }) => {
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
        <button onClick={() => handleSubscribe(plan, price)} className="subscribe-link">
          Subscribe
        </button>
        <Link to="/" className="terms-link">
          Terms & Conditions
        </Link>
      </div>
    );
  };
  const handlePayment = async (plan, price) => {
    // const accessToken = localStorage.getItem("token");
    // console.log(accessToken);
    // console.log(storedToken);
    
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
        plan === "premium" ? "Premium" : "Premium Plus"
      } Plan`,
      image: "",
      handler: async (razorpayResponse) => {
        console.log(razorpayResponse);
        if (razorpayResponse.razorpay_payment_id) {
          try {
            const Payload = {
              email: userData.email,
              tier: plan, // Update tier based on plan
              paymentid: razorpayResponse.razorpay_payment_id,
              token: storedToken,
            };

            const headers = {
              Token: storedToken,
              "Content-Type": "application/json",
            };

            const response = await axios.post(
              "http://54.252.180.142:8080/api/user/payments",
              Payload,
              { headers: headers }
            );
            // setPaymentSuccess(true);
            setSubscriptionState({
              ...subscriptionState,
              paymentSuccess: true,
              selectedPlan: plan,
            });
            console.log("Payment recorded successfully!");
          } catch (error) {
            console.error("Error recording payment:", error);
          }
        } else {
          console.log("somthing went wrong in payments");
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

  const handleSubscribe = (plan, price) => {
    handlePayment(plan, price);
    setPaymentPlan(plan)
  };

  return (
    <section>
      <header>
        <h1>Subscription Plan</h1>
      </header>
      {subscriptionState.paymentSuccess ? (
        <div>
          <h2>Payment successful!</h2>
        </div>
      ) : (
        <div className="wrapper">
          <PricingCard
            title="Premium Plan"
            plan="tier1"
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
            plan="tier2"
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
