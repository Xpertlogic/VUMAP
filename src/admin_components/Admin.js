import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const admintoken = localStorage.getItem("admintoken");
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  useEffect(()=> {
    if(admintoken) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, [admintoken]);
 

  if (isLoggedIn) {
    return (
      <div>
        <AdminHeader />
        <Outlet />
        <AdminFooter />
      </div>
    );
  }
  return (
    <div>
      <AdminHeader />
      <Login onLogin={handleLogin} />
      <AdminFooter />
    </div>
  );
};

export default Admin;
