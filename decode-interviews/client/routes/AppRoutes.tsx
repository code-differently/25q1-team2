import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../features/Landing/Landing";
import Dashboard from "../features/DashBoard/DashBoard";
import { SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import SignInPage from "../features/SignInPage/SignInPage";


/**
 * Defines the main application routes.
 * Includes basic auth-ware routing with Clerk.
 * 
 * @component
 * @returns {JSX.Element} - The main applicaiton routes component.
 */

const AppRoutes: React.FC = (): JSX.Element => {
    return (
        <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />

      <Route
        path="/dashboard"
        element={
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        }
      />

      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

      {/* Catch-all: go home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    )
}

export default AppRoutes;