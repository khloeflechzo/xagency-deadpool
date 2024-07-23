'use client';

import useAnimation from '@Hooks/useAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useParagraphLineWords from '@/effects/Paragraph/Line/Words/useParagraphLineWords';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  start?: string;
  horizontal?: boolean;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

export default function ParagraphLineWords({
  children,
  delayEnter,
  delayTrigger,
  start,
  horizontal,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);
  const { animationIn, animationHide } = useParagraphLineWords({
    refContent,
    delayTrigger,
    delayEnter,
  });

  useAnimation({
    trigger: refContent,
    initAnimation: animationHide,
    playAnimation: animationIn,
    threshold: 20,
    start,
    horizontal,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
