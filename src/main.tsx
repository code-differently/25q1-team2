import React from "react";
import Approutes from "./routes/Approutes";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import{ ClerkProvider } from "@clerk/clerk-react";
import './index.css';


return {void}



const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={clerkPubKey}>
            <BrowserRouter>
                <Approutes />
            </BrowserRouter>
        </ClerkProvider>
    </React.StrictMode>
);