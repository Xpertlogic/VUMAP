import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LoginContext = createContext(false);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("token");

  const verifyToken = async () => {
    try {
      const response = await axios.post(
        "http://54.252.180.142:8080/api/v1/admin/verifytoken",
        { token: storedToken }
      );
      setUserData(response.data);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
      setUserData(null);
      console.error("Error verifying token:", error);
      return false;
    }
  };

  useEffect(() => {
    verifyToken();
  }, [storedToken]);

  const login = (email, token) => {
    setEmail(email);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setEmail("");
    setLoggedIn(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };
  return (
    <LoginContext.Provider
      value={{
        userData,
        loggedIn,
        logout,
        login,
        storedToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
