import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import Login from "./Login";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

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
