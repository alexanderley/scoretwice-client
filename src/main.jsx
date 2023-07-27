import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

import { AuthProviderWrapper } from "./context/auth.context";
import { CreditProvider } from "./context/creditscore.context";

root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CreditProvider>
          <App />
        </CreditProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
