import React, { type JSX } from 'react';
import { Link } from "react-router-dom";
import "./Landing.module.css";

/**
 * Landing Page Component
 * 
 * @component
 * @returns {JSX.Element} - The Landing page UI component.
 */

const Landing: React.FC = (): JSX.Element => {
    return (
        <div className = "landing-container" style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Welcome to Decode! 💻 </h1>

            <p>Sharpen your skills and conquer interviews!</p>
            <div style={{marginRight: "1rem", padding: "1rem"}}>
                <Link to="/dashboard">Enter App</Link>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>

        </div>
    )
}

export default Landing;