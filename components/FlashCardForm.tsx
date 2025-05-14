'use client';
import { useState } from 'react';
import React from 'react';
import "../styles/flashcardForm.css";

/**
 * FlashcardForm component for creating new flashcards.
 *
 * This form allows users to input a question and its corresponding answer,
 * and submit them to create a new flashcard. After the flashcard is created,
 * the form fields are cleared, and an alert is shown to confirm creation.
 *
 * @returns {JSX.Element} The FlashcardForm component.
 */
export default function FlashcardForm() {
  // State variables for the question and answer input fields
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Handles the form submission for creating a new flashcard.
   *
   * Prevents the default form submission behavior, sends a POST request to
   * the API with the question and answer data, and resets the form if successful.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });

    // If the API request is successful, show a success message and reset the form
    if (res.ok) {
      setSuccess(true);
      setQuestion('');
      setAnswer('');
      setTimeout(() => setSuccess(false), 3000); // Hide the success message after 3 seconds
    }
  };

  return (
    <div className="flashcard-form-container">
      <div className="flashcard-form-header">
        <h2 className="flashcard-form-title">Create a Flashcard</h2>
        <p className="flashcard-form-subtitle">
          Fill in the details below to create a new flashcard
        </p>
      </div>
      <form onSubmit={handleSubmit} className="form p-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
          className="block mb-2 border p-2 w-full"
          required
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the answer"
          className="block mb-4 border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Flashcard
        </button>
      </form>
      {success && (
        <div className="success-alert">
          Flashcard created successfully!
        </div>
      )}
    </div>
  );
}
