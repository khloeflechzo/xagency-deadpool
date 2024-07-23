import { useGSAP } from '@gsap/react';
import { isPlayForPopupState, isPlayState } from '@Layouts/Animation/animationSignal';
import { useComputed, useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IProps extends IValueHookAnimation, IAnimationProps {
  trigger: MutableRefObject<IAnimationElement | null>;
}

export default function useAnimation({
  trigger,
  initAnimation,
  playAnimation,
  isObserver,
  threshold,
  start,
  horizontal,
  markers,
}: IProps): void {
  const refObserver = useRef<IntersectionObserver | null>(null);
  const refGsapTl = useRef<ScrollTrigger | null>(null);
  const isPlayTrigger = useComputed(() => {
    return isPlayForPopupState.value || isPlayState.value;
  });
  const { contextSafe } = useGSAP(() => {
    initAnimation();
  });

  const addTriggerScroller = contextSafe(() => {
    let calcTheshold = threshold || 0;
    if (calcTheshold === 0 && trigger.current) {
      const { height, top } = trigger.current.getBoundingClientRect();
      if (top >= window.innerHeight) {
        calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
        calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
      }
    }

    if (!isObserver) {
      refGsapTl.current = ScrollTrigger.create({
        trigger: trigger.current,
        onEnter: () => playAnimation(),
        start: start || `top+=${calcTheshold}% bottom`,
        horizontal,
        once: true,
        markers,
      });
    } else {
      refObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            playAnimation();
            trigger.current && refObserver.current?.unobserve(trigger.current);
            refObserver.current?.disconnect();
          }
        },
        { threshold: calcTheshold / 100 }
      );
      trigger.current && refObserver.current?.observe(trigger.current);
    }
  });

  useSignalEffect(() => {
    if (!isPlayTrigger.value) return;
    const rect = trigger.current?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight && rect.bottom > 0 && !isObserver) {
      playAnimation();
    } else {
      addTriggerScroller();
    }

    return () => {
      if (isObserver) {
        trigger.current && refObserver.current?.unobserve(trigger.current);
        refObserver.current?.disconnect();
      } else if (refGsapTl.current) {
        refGsapTl.current.kill();
      }
    };
  });
}
