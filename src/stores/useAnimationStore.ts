import { create } from 'zustand';

type ILoadStore = {
  isPlay: boolean;
  isPlayed: boolean;
  play: () => void;
  reset: () => void;
  setPlayed: () => void;

  isPlayForPopup: boolean;
  playForPopup: () => void;
  resetForPopup: () => void;
};

const useAnimationStore = create<ILoadStore>()((set) => ({
  isPlay: false,
  isPlayed: false,
  play: (): void => set({ isPlay: true }),
  reset: (): void => set({ isPlay: false }),
  setPlayed: (): void => set({ isPlayed: false }),

  isPlayForPopup: false,
  playForPopup: (): void => set({ isPlayForPopup: true }),
  resetForPopup: (): void => set({ isPlayForPopup: false }),
}));

export default useAnimationStore;
