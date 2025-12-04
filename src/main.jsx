// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.css";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
      <App />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        pauseOnHover={false}
      />
  </HelmetProvider>
);
