// src/__tests__/FlashcardManager.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlashcardManager from '../components/FlashcardManager';
import React from 'react';

// Mock the fetch API globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, question: 'Test Q', answer: 'Test A' }),
  })
) as jest.Mock;

describe('FlashcardManager', () => {
  it('renders input fields and creates a flashcard', async () => {
    render(<FlashcardManager />);

    // Get input fields and button
    const questionInput = screen.getByPlaceholderText(/enter question/i);
    const answerInput = screen.getByPlaceholderText(/enter answer/i);
    const createButton = screen.getByText(/create/i);

    // Simulate user typing
    fireEvent.change(questionInput, { target: { value: 'Test Q' } });
    fireEvent.change(answerInput, { target: { value: 'Test A' } });

    // Click "Create" button
    fireEvent.click(createButton);

    // Wait for the flashcard to show up
    await waitFor(() => {
      expect(screen.getByText(/test q — test a/i)).toBeInTheDocument();
    });
  });
});
