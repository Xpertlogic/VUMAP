import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LoginContext = createContext(false);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("token");

  // const storedPaymentSuccess = localStorage.getItem("paymentSuccess");

  // const [subscriptionState, setSubscriptionState] = useState({
  //   paymentSuccess: storedPaymentSuccess,
  //   selectedPlan: null,
  // });

  // useEffect(() => {
  //   // Store paymentSuccess in local storage whenever it changes
  //   localStorage.setItem("paymentSuccess", subscriptionState.paymentSuccess);
  // }, [subscriptionState.paymentSuccess]);

  const verifyToken = async (token) => {
    try {
      const response = await axios.post(
        "http://54.252.180.142:8080/api/v1/admin/verifytoken",
        { token: storedToken }
      );

      if (response.status === 200) {
        setUserData(response.data);
        setLoggedIn(true);
      } else {
        throw new Error("Failed to verify token");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  };

  useEffect(() => {
    verifyToken(token);
  }, [token, storedToken]);

  const login = (email, token) => {
    setEmail(email);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    // setSubscriptionState({
    //   paymentSuccess: subscriptionState.paymentSuccess,
    //   selectedPlan: null,
    // });
    // console.log(subscriptionState);
  };

  const logout = () => {
    setEmail("");
    setToken("");
    setLoggedIn(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    // setSubscriptionState({
    //   paymentSuccess: false,
    //   selectedPlan: null,
    // });
    // console.log(subscriptionState);
  };

  return (
    <LoginContext.Provider
      value={{
        userData,
        loggedIn,
        logout,
        login,
        storedToken,
        // subscriptionState,
        // setSubscriptionState,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
