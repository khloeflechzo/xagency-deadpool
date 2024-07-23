'use client';
import { create } from 'zustand';

type LayoutStore = {
  layout: number;
  toggleLayout: (number: number) => void;
};

const useLayoutStore = create<LayoutStore>((set) => {
  return {
    layout: 0,
    toggleLayout: (newLayout: number): void => {
      set({ layout: newLayout });
    },
  };
});

export { useLayoutStore };
