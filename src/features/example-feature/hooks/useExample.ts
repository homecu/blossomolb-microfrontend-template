import { useState } from 'react';

/**
 * Hook de ejemplo para lógica de negocio reutilizable.
 */
export function useExample() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
