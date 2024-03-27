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
        "https://gismapslayers.com/api/v1/admin/verifytoken",
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
    window.location.reload();
  };

  const logout = () => {
    setEmail("");
    setLoggedIn(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.reload();
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
