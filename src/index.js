import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./admin_components/admin_style/admin_style.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Main from "./Main";
import Admin from "./admin_components/Admin";
import Login from "./admin_components/Login";
import Dashboard from "./admin_components/Dashboard";

const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const Terms = lazy(() => import("./components/Terms"));
const Privacy = lazy(() => import("./components/Privacy"));

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<App />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading ....</div>}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading ....</div>}>
                <ContactUs />
              </Suspense>
            }
          />
          <Route
            path="/terms&condition"
            element={
              <Suspense fallback={<div>Loading ....</div>}>
                <Terms />
              </Suspense>
            }
          />
          <Route
            path="/privacy&cancellation"
            element={
              <Suspense fallback={<div>Loading ....</div>}>
                <Privacy />
              </Suspense>
            }
          />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
