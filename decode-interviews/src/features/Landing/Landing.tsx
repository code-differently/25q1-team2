import React, { type JSX } from 'react';
import "./Landing.module.css";

/**
 * Landing Page Component
 * 
 * @component
 * @returns {JSX.Element} - The Landing page UI component.
 */

const Landing: React.FC = (): JSX.Element => {
    return (
        <div className = "landing-container">
            <h1>Welcome to Decode! 💻 </h1>

            <p>Sharpen your skills and conquer interviews!</p>

            <button onClick={() => console.log("Entering app...")}>Enter App</button>
            <button onClick={() => console.log("Settings coming soon!")}>Settings</button>
        </div>
    )
}

export default Landing;