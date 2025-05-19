import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockInterview from '@/app/dashboard/mockInterview/page';
import React from "react";

describe('MockInterviewPage', () => {
  it('renders the mock interview questions', () => {
    render(<MockInterview />);
    expect(screen.getByText(/Mock Interview Practice/i)).toBeInTheDocument();
    expect(screen.getByText(/question:/i)).toBeInTheDocument();
  });


});
