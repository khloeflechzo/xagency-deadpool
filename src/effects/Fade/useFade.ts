import Lenis from '@studio-freight/lenis';
import { getDelay, getDelayHr } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import useHorizontalStore from '@/hooks/useHorizontalStore';
import { IAnimationHook, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseFade extends IAnimationHook {
  refContent: MutableRefObject<IAnimationElement | null>;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  from?: string;
}

export default function useFade({
  refContent,
  direction = 'none',
  delayTrigger,
  delayEnter,
  duration = 0.8,
  from = '100%',
}: IUseFade): IValueHookAnimation {
  const { target } = useHorizontalStore();
  const targetScroller = useRef<Lenis | undefined>();

  useEffect(() => {
    targetScroller.current = target?.current;
  }, [target]);

  const initAnimation = useCallback(() => {
    let options = { opacity: 0 };

    if (direction === 'left') options = { ...options, ...{ x: `-${from}` } };
    if (direction === 'right') options = { ...options, ...{ x: `${from}` } };
    if (direction === 'top') options = { ...options, ...{ y: `-${from}` } };
    if (direction === 'bottom') options = { ...options, ...{ y: `${from}` } };

    gsap.killTweensOf(refContent.current);
    gsap.set(refContent.current, options);
  }, [direction, from, refContent]);

  const getDelayCallBack = useCallback((): number => {
    return targetScroller.current
      ? getDelayHr({
          lenis: targetScroller.current,
          refContentCurrent: refContent.current,
          delayEnter,
          delayTrigger,
        })
      : getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
  }, []);

  const playAnimation = useCallback(() => {
    const delay = getDelayCallBack();
    let options = {
      opacity: 1,
      delay,
      ease: 'power3.out',
      overwrite: 'auto',
      duration,
    };

    if (direction === 'left') options = { ...options, ...{ x: 0 } };
    if (direction === 'right') options = { ...options, ...{ x: 0 } };
    if (direction === 'top') options = { ...options, ...{ y: 0 } };
    if (direction === 'bottom') options = { ...options, ...{ y: 0 } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gsap.to(refContent.current, options);
  }, [direction, duration, getDelayCallBack, refContent]);

  return { initAnimation, playAnimation };
}
