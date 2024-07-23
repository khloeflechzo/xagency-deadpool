import usePageEffectSignal from '@Layouts/PageEffect/pageEffectSignal';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export default function useRouterEffect(): {
  routerEffect: ({ url }: { url: string }) => void;
} {
  const pathName = usePathname();
  const { animationIn } = usePageEffectSignal();
  const timer = useRef<NodeJS.Timeout>();

  const routerEffect = ({ url }: { url: string }): void => {
    if (url === pathName) return;
    animationIn(url);
    timer.current && clearTimeout(timer.current);
  };

  return { routerEffect };
}
