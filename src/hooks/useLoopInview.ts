import { useIsInViewport } from '@Hooks/useIsInViewport';
import { Signal, useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

interface IUseLoopInView {
  looper: () => void;
  refInView: MutableRefObject<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>;
}
export const useLoopInView = ({
  looper,
  refInView,
}: IUseLoopInView): { inView: Signal<boolean> } => {
  const { visible: inView } = useIsInViewport({ ref: refInView });

  useSignalEffect(() => {
    if (inView.value) {
      gsap.ticker.add(looper);
    } else {
      gsap.ticker.remove(looper);
    }

    return () => {
      gsap.ticker.remove(looper);
    };
  });

  return { inView };
};
