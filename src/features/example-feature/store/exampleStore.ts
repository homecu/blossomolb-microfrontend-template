import { create } from 'zustand';

interface ExampleState {
  value: number;
  setValue: (v: number) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  value: 0,
  setValue: (v) => set({ value: v }),
}));
