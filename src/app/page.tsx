import FlashcardForm from '../../components/FlashCardForm';  // Import the FlashcardForm component
import FlashcardList from '../../components/FlashCardList';  // Import the FlashcardList component
import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600">Flashcard App</h1>
        <p className="text-lg text-gray-700">Create and review your flashcards</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create a New Flashcard</h2>
        <FlashcardForm /> {/* Flashcard form to create new cards */}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Flashcard List</h2>
        <FlashcardList /> {/* Display the list of flashcards */}
      </section>
    </div>
  );
}
