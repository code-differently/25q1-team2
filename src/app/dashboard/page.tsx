"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';
import "../../../styles/page.css";
import FlashcardForm from '../../../components/FlashcardForm'; // example, adjust import path

const Dashboard = () => {
  const [activePage, setActivePage] = useState<'flashcards' | 'interview' | 'mock' | 'about'>('flashcards');

  const renderContent = () => {
    switch (activePage) {
      case 'flashcards':
        return <FlashcardForm />;
      case 'interview':
        return <div>Interview Questions Content</div>;
      case 'mock':
        return <div>Mock Interview Content</div>;
      case 'about':
        return <div>About Content</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <>
      <SignedIn>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <div style={{ flex: 1, padding: '2rem', color: 'white', backgroundColor: '#1a2634', overflowY: 'auto' }}>
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <UserButton afterSignOutUrl="/sign-in" />
            </header>
            {renderContent()}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Dashboard;
