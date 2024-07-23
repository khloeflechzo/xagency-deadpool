import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { getDelay, getDelayHr } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import SplitType from 'split-type';

import useHorizontalStore from '@/hooks/useHorizontalStore';
import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

interface IUseParagraphScroller {
  refContent: MutableRefObject<IAnimationElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
}

export default function useParagraphLineWords({
  refContent,
  delayTrigger,
  delayEnter,
}: IUseParagraphScroller): {
  animationHide: () => void;
  animationIn: (delay?: number) => void;
} {
  const { target } = useHorizontalStore();
  const targetScroller = useRef<Lenis | undefined>();
  const refText = useRef<SplitType | null>(null);
  const { contextSafe } = useGSAP({ scope: refContent });

  useEffect(() => {
    targetScroller.current = target?.current;
  }, [target]);

  useEffect(() => {
    refContent.current?.classList.add(s.lineWords);
  }, [refContent]);

  const getDelayCallBack = useCallback((): number => {
    return targetScroller.current
      ? getDelayHr({
          lenis: targetScroller.current,
          refContentCurrent: refContent.current,
          delayEnter,
          delayTrigger,
        })
      : getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
  }, [targetScroller]);

  const pageHide = contextSafe(() => {
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'lines,words' });
    gsap.killTweensOf(refText.current.words);
    gsap.set(refText.current.words, { y: '100%', overwrite: 'auto' });
  });

  const animationIn = contextSafe((delayIn?: number) => {
    const delay = getDelayCallBack();
    refText.current?.lines &&
      refText.current?.lines.forEach((lines, key) => {
        gsap.to(lines.querySelectorAll('.word'), {
          y: '0%',
          delay: (delayIn || delay) + key / 10,
          ease: 'power3.out',
          duration: 1.2,
          overwrite: 'auto',
        });
      });
  });

  return { animationHide: pageHide, animationIn };
}
