import { signal } from '@preact/signals-react';

const toggleState = signal(false);
const outCompleteState = signal(false);
const inCompleteState = signal(false);
const urlState = signal('/');

type IValues = {
  animationIn: (url: string) => void;
  animationOut: () => void;
  setOutComplete: () => void;
  setInComplete: () => void;
  reset: () => void;
};
export default function usePageEffectSignal(): IValues {
  return {
    animationIn: (url: string): void => {
      toggleState.value = true;
      urlState.value = url;
    },
    animationOut: (): void => {
      toggleState.value = false;
    },
    setOutComplete: (): void => {
      outCompleteState.value = false;
    },
    setInComplete: (): void => {
      inCompleteState.value = true;
    },
    reset: (): void => {
      outCompleteState.value = false;
      inCompleteState.value = false;
      toggleState.value = false;
    },
  };
}

export { inCompleteState, outCompleteState, toggleState, urlState };
