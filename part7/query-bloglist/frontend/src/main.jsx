import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import {
  NotificationContextProvider,
  AuthContextProvider,
} from "./reducers/Context";
import { BrowserRouter as Router } from "react-router-dom";
import "./main.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </Router>
);
