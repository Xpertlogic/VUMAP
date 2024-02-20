import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(false);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (storedEmail && storedToken) {
      setEmail(storedEmail);
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (email, token) => {
    setEmail(email);
    setToken(token);
    setLoggedIn(true);
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
    <LoginContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
