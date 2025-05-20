import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('calls onClick', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('applies primary and secondary styles', () => {
        const { rerender } = render(<Button variant="primary">A</Button>);
        expect(screen.getByText('A')).toHaveClass('bg-blue-600');
        rerender(<Button variant="secondary">B</Button>);
        expect(screen.getByText('B')).toHaveClass('bg-gray-200');
    });
});
