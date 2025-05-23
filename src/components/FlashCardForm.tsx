"use client";

import React, { useState } from "react";
import { FaCircleQuestion, FaLightbulb } from "react-icons/fa6";
import styles from "../styles/flashcardForm.module.css";
import type { Flashcard } from "@/app/dashboard/flashcards/page";

export default function FlashcardForm({
  onSuccess,
}: {
  onSuccess?: (card: Flashcard) => void;
}) {
  const [questionText, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText, answer }),
      });
      if (!res.ok) throw new Error("Failed to add flashcard");
      const newCard: Flashcard = await res.json();
      setQuestion("");
      setAnswer("");
      setSuccess(true);
      onSuccess?.(newCard);
      setTimeout(() => setSuccess(false), 1600);
    } catch (err) {
      alert((err as Error).message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.flashcardForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className={styles.inputRow}>
        <label className={styles.iconLabel}>
          <FaCircleQuestion className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Question"
            value={questionText}
            onChange={(e) => setQuestion(e.target.value)}
            required
            disabled={loading}
          />
        </label>
      </div>
      <div className={styles.inputRow}>
        <label className={styles.iconLabel}>
          <FaLightbulb className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            disabled={loading}
          />
        </label>
      </div>
      <button
        className={styles.button}
        type="submit"
        disabled={!questionText || !answer || loading}
      >
        {loading ? "Creating..." : "Create Flashcard"}
      </button>
      {success && <div className={styles.successAlert}>Flashcard added!</div>}
    </form>
  );
}
