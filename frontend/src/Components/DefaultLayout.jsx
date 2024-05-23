// DefaultLayout.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import EmailVerified from "../AuthPages/EmailVerificationStatus";
import Navbar from "../views/Navbar/Navbar";
import Sidebar from "../views/Sidebar/Sidebar";
import TodaysChallenges from "../views/TodayChallenges/TodayChallenges";

export default function DefaultLayout() {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">
      {/* <EmailVerified> */}
        <Navbar />
        <div className="main-content">
          <Sidebar />

          <TodaysChallenges />
        </div>
      {/* </EmailVerified> */}
    </div>
  );
}
