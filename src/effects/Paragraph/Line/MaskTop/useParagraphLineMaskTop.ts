import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType from 'split-type';

import { IAnimationHook } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

interface IUseParagraphScroller extends IAnimationHook {
  refContent: MutableRefObject<IAnimationElement | null>;
}

export default function useParagraphLineMaskTop({
  refContent,
  delayTrigger,
  delayEnter,
}: IUseParagraphScroller): {
  animationHide: () => void;
  animationIn: (delay?: number) => void;
  animationOut: (delay?: number) => void;
} {
  const targetScroller = useRef<Lenis | undefined>();
  const { contextSafe } = useGSAP();
  const refText = useRef<SplitType | null>(null);
  const wordCloneds = useRef<HTMLElement[]>([]);

  const pageHide = contextSafe(() => {
    refContent.current?.classList.add(s.LineMask);
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words' });
    gsap.killTweensOf(refText.current.words);

    refText.current.words?.forEach((word) => {
      const span = document.createElement('span');
      span.classList.add('word__clone');
      word.classList.add('word__wrap');
      span.appendChild(word.childNodes[0]);
      word.appendChild(span);
      wordCloneds.current.push(span);
    });

    gsap.set(wordCloneds.current, { yPercent: 110, overwrite: 'auto' });
  });

  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
  }, [targetScroller, delayTrigger, delayEnter]);

  const animationIn = contextSafe((delayIn: number = 0) => {
    const delay = getDelayCallBack();

    if (wordCloneds.current.length) {
      let rows = 0;
      const grWord: Element[][] = [];
      let prevRect = 0;

      wordCloneds.current?.forEach((word, index) => {
        const rectWord = word.getBoundingClientRect();
        if (index > 0) {
          if (rectWord.top > prevRect) {
            prevRect = rectWord.top;
            rows++;
          }
        } else {
          prevRect = rectWord.top;
        }

        if (!grWord[rows]) grWord[rows] = [];
        grWord[rows].push(word);
      });

      grWord.forEach((grW, key) => {
        grW.length &&
          gsap.fromTo(
            grW,
            {
              yPercent: 110,
            },
            {
              yPercent: 0,
              delay: (delayIn || delay) + key / 10,
              ease: 'power3.out',
              duration: 1.2,
              overwrite: 'auto',
            }
          );
      });
    }
  });

  const animationOut = contextSafe((delayOut: number = 0) => {
    if (wordCloneds.current.length) {
      let rows = 0;
      const grWord: Element[][] = [];
      let prevRect = 0;

      wordCloneds.current?.forEach((word, index) => {
        const rectWord = word.getBoundingClientRect();
        if (index > 0) {
          if (rectWord.top > prevRect) {
            prevRect = rectWord.top;
            rows++;
          }
        } else {
          prevRect = rectWord.top;
        }

        if (!grWord[rows]) grWord[rows] = [];
        grWord[rows].push(word);
      });

      grWord.forEach((grW, key) => {
        grW.length &&
          gsap.to(grW, {
            yPercent: -110,
            delay: delayOut + key / 10,
            ease: 'power3.out',
            duration: 0.6,
            overwrite: 'auto',
          });
      });
    }
  });

  return { animationHide: pageHide, animationIn, animationOut };
}
