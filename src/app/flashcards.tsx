import FlashcardForm from '../../components/FlashCardForm';
import FlashcardList from '../../components/FlashCardList';
import React from 'react';

/**
 * FlashcardsPage is a React component that renders the flashcard interface.
 *
 * Features:
 * - Displays a heading for the flashcard system.
 * - Includes a form for adding new flashcards.
 * - Displays a list of existing flashcards.
 *
 * @returns The rendered Flashcard System page layout.
 */
export default function FlashcardsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard System</h1>
      <FlashcardForm />
      <FlashcardList />
    </div>
  );
}
