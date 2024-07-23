'use client';

import useAnimation from '@Hooks/useAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useParagraphLineMask from '@/effects/Paragraph/Line/Mask/useParagraphLineMask';
import { IAnimationProps } from '@/types/animation';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

const ParagraphLineMask = ({
  children,
  delayEnter,
  delayTrigger,
  start,
  horizontal,
  markers,
  isObserver,
  threshold,
}: ParagraphLineMaskProps): ReactElement => {
  const refContent = useRef<typeRef>(null);

  const { animationIn: playAnimation, animationHide: initAnimation } = useParagraphLineMask({
    refContent,
    delayTrigger,
    delayEnter,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold,
    horizontal,
    isObserver,
    start,
    markers,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
};
export default React.memo(ParagraphLineMask);
