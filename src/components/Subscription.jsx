import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import useRazorpay from "react-razorpay";
import { LoginContext } from "../context/LoginContext";

function Subscription({ onSuccess }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [Razorpay, isLoaded] = useRazorpay();
  const { userData, storedToken } = useContext(LoginContext);

  const handleCustomAction = () => {
    window.location.href = "/contact";
  };

  const PricingCard = ({
    title,
    price,
    features,
    isActive,
    plan,
    buttonText,
    buttonAction,
  }) => {
    const handlePayment = async (title, price) => {
      let plan;
      switch (title) {
        case "Basic Plan":
          plan = "Basic Plan";
          break;
        case "Business Plan":
          plan = "Business Plan";
          break;
        default:
          plan = "Free";
          break;
      }

      let tier;
      switch (plan) {
        case "Basic Plan":
          tier = "tier1";
          break;
        case "Business Plan":
          tier = "tier2";
          break;
        default:
          tier = "free";
          break;
      }

      const amount =
        parseFloat(
          price
            .replace("₹", "")
            .replace(",", "")
            .replace(" / Month", "")
            .replace(" /1 Year", "")
        ) * 100; // Convert price to integer amount in paise

      const options = {
        key: "rzp_test_DBSJe5ZFN2DJ8x",
        amount: amount,
        currency: "INR",
        name: "Acme Corp",
        description: `Subscription for ${plan}`,
        image: "",
        handler: async (razorpayResponse) => {
          console.log(razorpayResponse);
          if (razorpayResponse.razorpay_payment_id) {
            try {
              const Payload = {
                email: userData.email,
                tier: tier,
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

              if (response.status === 200) {
                setPaymentSuccess(userData.tier !== "free");
                onSuccess();
              }
              //here respone.status === 200 hit the verify token api to store the user data and show the subscription susccess pop up

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

    const handleSubscribe = () => {
      handlePayment(title, price);
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
        {buttonText && buttonAction ? (
          <button onClick={buttonAction} className="subscribe-link">
            {buttonText}
          </button>
        ) : (
          <button onClick={handleSubscribe} className="subscribe-link">
            Subscribe
          </button>
        )}
        <Link to="/terms&condition" className="terms-link">
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
            title="Basic Plan"
            price="₹299/ Month"
            features={[
              "All data will visible and user can analyze",
              "Unlimited admin Boundary Downloads (up to postal label)",
              "User can Download 1000 POIs",
            ]}
            isActive={false}
          />
          <PricingCard
            title="Business Plan"
            price="₹2999 /1 Year"
            features={[
              "All data will visible and user can analyze",
              "Unlimited admin Boundary Downloads(up to Village label)",
              "User can Download 1000 POIs",
              "House Numbers and Roads signs are Exclusive access for Business Plans.",
              "Dedicated Support team.",
            ]}
            isActive={true}
          />
          <PricingCard
            title="Enterprise Custom"
            price="₹Custom"
            features={[
              "For More Data sets contact our team.",
              "Road line, Rail line, Buildings or any other GIS data sets please, Contact our team.",
            ]}
            isActive={false}
            buttonText="Contact us"
            buttonAction={handleCustomAction}
          />
        </div>
      )}
    </section>
  );
}

export default Subscription;
