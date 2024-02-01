import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Main from "./Main";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const propRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<AboutUs />} />
      <Route path="/Contact" element={<ContactUs />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={propRoute}></RouterProvider>
  </React.StrictMode>
);
