import React, { Suspense, lazy } from "react";
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

// import AboutUs from "./components/AboutUs";
// import ContactUs from "./components/ContactUs";

const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));

const propRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="/" element={<App />} />
      <Route
        path="/About"
        element={
          <Suspense fallback={<div>Loading ....</div>}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path="/Contact"
        element={
          <Suspense fallback={<div>Loading ....</div>}>
            <ContactUs />
          </Suspense>
        }
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={propRoute}></RouterProvider>
  </React.StrictMode>
);
