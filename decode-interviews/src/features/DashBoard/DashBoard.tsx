import React from "react";
import { UserButton } from "@clerk/clerk-react";

/**
 * Protected dashboard page for logged-in users.
 * 
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎯 Welcome to your Dashboard!</h1>
      <UserButton />
    </div>
  );
};

export default Dashboard;
