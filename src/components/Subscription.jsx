import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import useRazorpay from "react-razorpay";
import { LoginContext } from "../context/LoginContext";
import { SubscribeContext } from "../context/SubscribeContext";

function Subscription() {
  // const [paymentSuccess,setPaymentSuccess] = useState(false)
  const [Razorpay, isLoaded] = useRazorpay();
  const { userData, storedToken } = useContext(LoginContext);

  const { subscriptionState, setSubscriptionState } =
    useContext(SubscribeContext);

  const handleCustomAction = () => {
    console.log("contact click");
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
    const handlePayment = async (plan, price) => {
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
                tier: plan === "premium" ? "tier1" : "tier2", // Update tier based on plan
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

    const handleSubscribe = () => {
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
        {buttonText && buttonAction ? (
          <button onClick={buttonAction} className="custom-button">
            {buttonText}
          </button>
        ) : (
          <button onClick={handleSubscribe} className="subscribe-link">
            Subscribe
          </button>
        )}
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
            buttonText="Contact Us"
            buttonAction={handleCustomAction}
          />
        </div>
      )}
    </section>
  );
}

export default Subscription;
