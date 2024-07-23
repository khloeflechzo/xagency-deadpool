'use client';

import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay, getDelayHr } from '@Utils/uiHelper';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { CSSProperties, useCallback, useRef } from 'react';

import useHorizontalStore from '@/hooks/useHorizontalStore';
import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IProp extends IAnimationProps {
  color?: 'white' | 'dark' | 'silver';
  size?: number;
  direction?: 'left' | 'right';
  position?: 'top' | 'bottom';
  isObserver?: boolean;
}

export default function Line({
  color = 'white',
  size = 1,
  delayTrigger,
  delayEnter,
  duration,
  direction = 'left',
  position = 'bottom',
  isObserver = false,
}: IProp): React.ReactElement {
  const { target: targetScroller } = useHorizontalStore();
  const lineRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: lineRef });

  const initAnimation = contextSafe((): void => {
    const directionOption = direction === 'left' ? { left: 0 } : { right: 0 };
    const positionOptions = position === 'top' ? { top: 0 } : { bottom: 0 };
    gsap.set(lineRef.current, {
      width: '0%',
      ...directionOption,
      ...positionOptions,
    });
  });

  const getDelayCallBack = useCallback((): number => {
    return targetScroller
      ? getDelayHr({
          lenis: targetScroller.current,
          refContentCurrent: lineRef.current,
          delayEnter,
          delayTrigger,
        })
      : getDelay({ refContentCurrent: lineRef.current, delayEnter, delayTrigger });
  }, [targetScroller]);

  const playAnimation = contextSafe((): void => {
    const delay = getDelayCallBack();

    gsap.to(lineRef.current, {
      width: '100%',
      ease: 'power3.inOut',
      duration: duration || 1.2,
      delay,
    });
  });

  useAnimation({
    trigger: lineRef,
    initAnimation,
    playAnimation,
    isObserver,
  });

  return (
    <div
      ref={lineRef}
      className={cn(s.line, s[`line__${color}`])}
      style={{ '--size': `${size}px` } as CSSProperties}
    ></div>
  );
}
