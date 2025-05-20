import React from 'react';

/**
 * Botón atómico reutilizable.
 * @param props - Propiedades del botón.
 * @example
 * <Button onClick={() => alert('Hola!')}>Click me</Button>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
    return (
        <button
            className={`px-4 py-2 rounded font-semibold focus:outline-none focus:ring transition-colors 
        ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
