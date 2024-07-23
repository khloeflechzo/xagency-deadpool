'use client';

import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { getDelay, getDelayHr } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useEffect, useRef } from 'react';

import useHorizontalStore from '@/hooks/useHorizontalStore';
import { IAnimationHook, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseFade extends IAnimationHook {
  refContent: MutableRefObject<IAnimationElement | null>;
  scale?: number;
}

export default function useScale({
  refContent,
  duration = 0.6,
  delayTrigger,
  delayEnter,
  scale = 1.2,
}: IUseFade): IValueHookAnimation {
  const { target } = useHorizontalStore();
  const targetScroller = useRef<Lenis | undefined>();
  const { contextSafe } = useGSAP();
  useEffect(() => {
    targetScroller.current = target?.current;
  }, [target]);

  const initAnimation = contextSafe(() => {
    gsap.set(refContent.current, { scale });
  });

  const getDelayCallBack = contextSafe((): number => {
    return targetScroller.current
      ? getDelayHr({
          lenis: targetScroller.current,
          refContentCurrent: refContent.current,
          delayEnter,
          delayTrigger,
        })
      : getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    gsap.to(refContent.current, {
      scale: 1,
      delay,
      ease: 'power3.out',
      overwrite: 'auto',
      duration,
    });
  });

  return { initAnimation, playAnimation };
}
