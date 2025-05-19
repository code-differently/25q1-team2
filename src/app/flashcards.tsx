import FlashcardForm from '../../components/FlashCardForm';
import FlashcardList from '../../components/FlashCardList';
import React from 'react';

export default function FlashcardsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard System</h1>
      <FlashcardForm />
      <FlashcardList />
    </div>
  );
}
