'use client';

import useAnimation from '@Hooks/useAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import { TypesList } from 'split-type';

import useParagraphLineFade from '@/effects/Paragraph/Line/Fade/useParagraphLineFade';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  type?: TypesList;
  start?: string;
  horizontal?: boolean;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

export default function ParagraphLineFade({
  children,
  delayEnter,
  delayTrigger,
  type,
  start,
  horizontal,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  const { animationIn, animationHide } = useParagraphLineFade({
    refContent,
    delayTrigger,
    delayEnter,
    type,
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
