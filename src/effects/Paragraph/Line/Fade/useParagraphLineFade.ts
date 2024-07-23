import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useEffect, useRef } from 'react';
import SplitType, { TypesList } from 'split-type';

import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

interface IUseParagraphScroller {
  refContent: MutableRefObject<IAnimationElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  type?: TypesList;
}

export default function useParagraphLineFade({
  refContent,
  delayTrigger,
  delayEnter,
}: IUseParagraphScroller): {
  animationHide: () => void;
  animationIn: (delay?: number) => void;
} {
  const { contextSafe } = useGSAP();
  const refText = useRef<SplitType | null>(null);

  const pageHide = contextSafe(() => {
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'lines,words' });

    gsap.killTweensOf(refText.current);
    refText.current.words?.length &&
      gsap.set(refText.current.words, { y: '100%', opacity: 0, overwrite: 'auto' });
  });

  const animationIn = contextSafe((delayIn?: number) => {
    const mDelayIn = typeof delayIn !== 'number' ? 0 : delayIn;

    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    refText.current?.lines &&
      refText.current?.lines.forEach((lines, key) => {
        gsap.to(lines.querySelectorAll('.word'), {
          y: '0%',
          opacity: 1,
          delay: (mDelayIn || delay) + key / 10,
          ease: 'power3.out',
          duration: 1.6,
          overwrite: 'auto',
        });
      });
  });

  useEffect(() => {
    refContent.current?.classList.add(s.lineFade);
  }, [refContent]);

  return { animationHide: pageHide, animationIn };
}
