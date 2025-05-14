import FlashcardForm from '../../components/FlashCardForm';  // Import the FlashcardForm component
import FlashcardList from '../../components/FlashCardList';  // Import the FlashcardList component
import React from 'react';
import "../../styles/page.css"; // Importing the custom CSS

export default function Home() {
  return (
    <div className="background">
      <div className="container">
        <header className="header">
          <h1 className="page-title">Flashcard App</h1>
          <p className="page-description">Create and review your flashcards</p>
        </header>

        <section className="section">
          <h2 className="section-title">Create a New Flashcard</h2>
          <FlashcardForm /> {/* Flashcard form to create new cards */}
        </section>

        <section>
          <h2 className="section-title">Flashcard List</h2>
          <FlashcardList /> {/* Display the list of flashcards */}
        </section>
      </div>
    </div>
  );
}
