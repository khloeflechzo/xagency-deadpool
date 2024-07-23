import { signal } from '@preact/signals-react';
import { proxy } from 'valtio';

type IValue = {
  registerLoad: (url: string, path?: string) => void;
  reset: () => void;
  isLoaded: () => boolean;
  checkRegisterLoaded: () => void;
};

export const loadedSate = signal(false);
export const isBeforeLoadedSate = signal(false);
const proxyLoader = proxy<{ checker: string[]; counter: number }>({
  checker: [],
  counter: 0,
});

export default function useLoadManageSignal(): IValue {
  const loadedDone = (): void => {
    isBeforeLoadedSate.value = true;
    setTimeout(() => {
      loadedSate.value = true;
    }, 150);
  };

  const handleEvent = (): void => {
    proxyLoader.counter -= 1;
    if (proxyLoader.counter <= 0 && !loadedSate.peek()) {
      loadedDone();
    }
  };

  const addListeners = (xhr: XMLHttpRequest): void => {
    xhr.addEventListener('loadend', handleEvent);
    xhr.addEventListener('error', handleEvent);
  };

  const isLoaded = (): boolean => {
    return proxyLoader.counter <= 0;
  };

  const checkRegisterLoaded = (): void => {
    if (proxyLoader.checker.length <= 0 && !loadedSate.peek()) {
      loadedDone();
    }
  };

  return {
    registerLoad: (url: string, _path?: string): void => {
      if (proxyLoader.checker.indexOf(url) !== -1) return;
      proxyLoader.counter += 1;

      proxyLoader.checker.push(url);
      const xhr = new XMLHttpRequest();
      addListeners(xhr);
      xhr.open('GET', url);
      xhr.send();
    },
    reset: (): void => {
      isBeforeLoadedSate.value = false;
      loadedSate.value = false;
      proxyLoader.counter = 0;
      proxyLoader.checker = [];
    },
    isLoaded,
    checkRegisterLoaded,
  };
}
