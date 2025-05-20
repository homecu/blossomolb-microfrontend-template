import React from 'react';
import { Button } from '../components/atoms/Button';

const HomePage: React.FC = () => (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Microfrontend BlossomOLB Demo</h1>
        <Button onClick={() => alert('Clicked!')}>Click</Button>
    </main>
);

export default HomePage;
