import React from 'react';
import { useExample } from '../hooks/useExample';
import { useExampleStore } from '../store/exampleStore';
import { Button } from '../../../components/atoms/Button';

/**
 * Card de ejemplo que muestra integración de hook y store.
 */
export const ExampleCard: React.FC = () => {
    const { count, increment } = useExample();
    const { value, setValue } = useExampleStore();

    return (
        <div className="p-4 border rounded shadow bg-white max-w-xs mx-auto">
            <h2 className="text-lg font-bold mb-2">Ejemplo Zustand + Hook</h2>
            <p className="mb-2">Contador local: {count}</p>
            <Button onClick={increment}>Incrementar local</Button>
            <hr className="my-3" />
            <p className="mb-2">Valor global: {value}</p>
            <Button variant="secondary" onClick={() => setValue(value + 1)}>
                Incrementar global
            </Button>
        </div>
    );
};
