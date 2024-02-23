import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LoginContext = createContext(false);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("token");

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
  }, [token, storedToken, loggedIn]);

  const login = (email, token) => {
    setEmail(email);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setEmail("");
    setToken("");
    setLoggedIn(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider
      value={{ userData, loggedIn, logout, login, storedToken }}
    >
      {children}
    </LoginContext.Provider>
  );
};
