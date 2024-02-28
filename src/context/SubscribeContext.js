import { createContext, useState, useEffect } from "react";

export const SubscribeContext = createContext();

export const SubscribeProvider = ({ children }) => {
  // const storedPaymentSuccess =
  //   localStorage.getItem("paymentSuccess") === "true";

  const [subscriptionState, setSubscriptionState] = useState({
    paymentSuccess: false,
    selectedPlan: null,
  });

  // useEffect(() => {
  //   // Store paymentSuccess in local storage whenever it changes
  //   localStorage.setItem("paymentSuccess", subscriptionState.paymentSuccess);
  // }, [subscriptionState.paymentSuccess]);

  return (
    <SubscribeContext.Provider
      value={{ subscriptionState, setSubscriptionState }}
    >
      {children}
    </SubscribeContext.Provider>
  );
};
