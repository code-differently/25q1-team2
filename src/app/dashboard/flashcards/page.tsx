"use client";

import React from 'react';
import FlashcardForm from "../../../../components/FlashCardForm";
import FlashcardList from '../../../../components/FlashCardList';

export default function FlashcardsPage() {
  return (
    <>
      <h1>Flashcards</h1>
      <FlashcardForm />
      <h1>Flashcard List</h1>
      <FlashcardList />
    </>
  );
}