import { Signal, useSignal } from '@preact/signals-react';
import { useEffect } from 'react';

export default function useMouse(): Signal<{ x: number; y: number }> {
  const mouse = useSignal<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent): void => {
      mouse.value = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return mouse;
}
