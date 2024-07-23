import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { DependencyList, MutableRefObject } from 'react';
import { useEffect } from 'react';

import { IAnimationElement } from '@/types/common';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

interface IUseScrollTrigger {
  trigger: MutableRefObject<IAnimationElement | null> | undefined;
  start?: string | number | ((self?: ScrollTrigger) => string | number);
  end?: string | number | ((self?: ScrollTrigger) => string | number);
  pin?: boolean | string | HTMLElement;
  anticipatePin?: number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
  scrub?: number | boolean;
  onEnter?: () => void;
  onEnterBack?: (self?: ScrollTrigger) => void;
  onLeave?: () => void;
  onLeaveBack?: () => void;
  onToggle?: (self?: ScrollTrigger) => void;
  onUpdate?: (self?: ScrollTrigger) => void;
  isAnimationClear?: boolean;
  onInit?: () => void;
}

export const useScrollTrigger = (
  {
    trigger,
    start,
    end,
    pin,
    anticipatePin,
    markers,
    scrub,
    onEnter,
    onEnterBack,
    onLeave,
    onLeaveBack,
    onToggle,
    onUpdate,
    toggleActions = 'play none none none',
    once,
  }: IUseScrollTrigger,
  deps: DependencyList
): void => {
  useEffect(() => {
    if (!trigger) return;
    const gsapContext = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger.current,
        start,
        markers,
        end,
        scrub,
        pin,
        toggleActions,
        anticipatePin,
        onUpdate,
        onToggle,
        onEnter,
        onEnterBack,
        onLeave,
        onLeaveBack,
        once,
      });
    }, [trigger]);

    return () => gsapContext?.revert();
  }, [
    anticipatePin,
    end,
    markers,
    toggleActions,
    once,
    onEnterBack,
    onEnter,
    onLeave,
    onLeaveBack,
    onToggle,
    onUpdate,
    pin,
    scrub,
    start,
    trigger,
    deps,
  ]);
};
