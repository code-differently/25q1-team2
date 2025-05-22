"use client";

import React from "react";
import styles from "../styles/flashcardButton.module.css";

export default function AddFlashcardButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button className={styles.fab} onClick={onClick} title="Add new flashcard">
      ＋
    </button>
  );
}
