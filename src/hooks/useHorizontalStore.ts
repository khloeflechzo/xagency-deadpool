import Lenis from '@studio-freight/lenis';
import { MutableRefObject } from 'react';
import { create } from 'zustand';

type HorizontalStore = {
  target: MutableRefObject<Lenis | undefined> | null;
  setTarget: (el: MutableRefObject<Lenis | undefined>) => void;
};

const useHorizontalStore = create<HorizontalStore>()((set) => ({
  target: null,
  setTarget: (target: MutableRefObject<Lenis | undefined>): void => set(() => ({ target })),
}));

export default useHorizontalStore;
