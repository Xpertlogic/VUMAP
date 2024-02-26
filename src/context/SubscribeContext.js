import { createContext, useState } from "react";

export const SubscribeContext = createContext();

export const SubscribeProvider = ({ children }) => {
  const [subscriptionState, setSubscriptionState] = useState({
    paymentSuccess: false,
    selectedPlan: null,
  });

  return (
    <SubscribeContext.Provider
      value={{ subscriptionState, setSubscriptionState }}
    >
      {children}
    </SubscribeContext.Provider>
  );
};
