import React, { type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../features/Landing/Landing";
import Settings from "../features/Settings/Settings";

/**
 * Defines the main application routes.
 * 
 * @component
 * @returns {JSX.Element} - The main applicaiton routes component.
 */

const AppRoutes: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add more routes here as needed */}
        </Routes>
    )
}

export default AppRoutes;