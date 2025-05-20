import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExamplePage from '../pages/ExamplePage';

describe('ExamplePage', () => {
    it('renders ExampleCard and increments counters', () => {
        render(<ExamplePage />);
        expect(screen.getByText(/Ejemplo Zustand \+ Hook/i)).toBeInTheDocument();
        const localBtn = screen.getByText(/Incrementar local/i);
        fireEvent.click(localBtn);
        expect(screen.getByText(/Contador local: 1/)).toBeInTheDocument();
        const globalBtn = screen.getByText(/Incrementar global/i);
        fireEvent.click(globalBtn);
        expect(screen.getByText(/Valor global: 1/)).toBeInTheDocument();
    });
});
