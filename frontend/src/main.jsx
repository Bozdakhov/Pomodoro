import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/contextprovider.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="602333515570-1nh4lsvfeutuus5fn3c2s2j8aaum38h3.apps.googleusercontent.com">
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
