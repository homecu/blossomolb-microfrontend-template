import React from 'react';
import { ExampleCard } from '../components/ExampleCard';

/**
 * Página de ejemplo para la feature.
 */
const ExamplePage: React.FC = () => (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <ExampleCard />
    </main>
);

export default ExamplePage;
