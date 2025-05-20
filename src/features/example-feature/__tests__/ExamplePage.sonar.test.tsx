import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ExamplePage from '../pages/ExamplePage';

describe('ExamplePage (SonarQube coverage)', () => {
  it('renders ExampleCard', () => {
    render(<ExamplePage />);
    expect(screen.getByText(/Ejemplo Zustand \+ Hook/i)).toBeInTheDocument();
  });
});
