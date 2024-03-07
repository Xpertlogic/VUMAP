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

const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const Terms = lazy(() => import("./components/Terms"));

const propRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="/" element={<App />} />
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
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={propRoute}></RouterProvider>
  </React.StrictMode>
);
