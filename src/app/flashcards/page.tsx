import React from 'react';
import Link from 'next/link'; // import Link from next/link
import FlashcardForm from '../../../components/FlashCardForm';
import FlashcardList from '../../../components/FlashCardList';

export default function FlashcardsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard System</h1>

      <FlashcardForm />
      <FlashcardList />

      {/* Button to navigate to Dashboard */}
      <div className="mt-6">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
