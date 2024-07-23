import { DependencyList, useEffect, useRef } from 'react';

export const useLoop = (looper: () => void, desp: DependencyList): void => {
  const refLoop = useRef<number | null>(null);

  useEffect(() => {
    const fnLoop = (): void => {
      looper();
      refLoop.current = requestAnimationFrame(fnLoop);
    };
    requestAnimationFrame(fnLoop);
    return () => {
      refLoop.current && cancelAnimationFrame(refLoop.current);
    };
  }, [looper, desp]);
};
