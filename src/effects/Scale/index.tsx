'use client';

import useAnimation from '@Hooks/useAnimation';
import React, { PropsWithChildren, useRef } from 'react';

import useScale from '@/effects/Scale/useScale';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';
interface IFade extends PropsWithChildren, IAnimationProps {
  scale?: number;
}

export default function Scale({
  delayTrigger,
  delayEnter,
  children,
  duration,
  scale,
  isObserver,
  start,
  horizontal,
  threshold,
}: IFade): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useScale({
    refContent,
    delayTrigger,
    delayEnter,
    duration,
    scale,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    threshold,
    start,
    horizontal,
    markers: false,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return <div className={s.scale}>{React.cloneElement(children, { ...{ ref: refContent } })}</div>;
}
