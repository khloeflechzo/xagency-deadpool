import { debounce } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SplitType, { TypesList } from 'split-type';

import { IAnimationElement } from '@/types/common';

interface IUseSplitType {
  refTarget: MutableRefObject<IAnimationElement | null>;
  types?: TypesList;
}

export default function useSplitType({ refTarget, types }: IUseSplitType): {
  splitter?: SplitType;
  isReSplit: number;
  clearReSplit: () => void;
} {
  const refResize = useRef<ResizeObserver | null>(null);
  const [isReSplit, setIsReSplit] = useState<number>(0);
  const refCurrentWidth = useRef<number>(0);
  const [splitter, setSplitter] = useState<SplitType>();

  const font = useMemo(() => {
    return refTarget.current
      ? window.getComputedStyle(refTarget.current, null).getPropertyValue('font-family')
      : '';
  }, [refTarget.current]);

  useEffect(() => {
    refTarget.current && gsap.set(refTarget.current, { opacity: 0 });
  }, []);

  useEffect(() => {
    if (!refTarget.current) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const text = new SplitType(refTarget.current, { types });
    setSplitter(text);
    refCurrentWidth.current = refTarget.current.getBoundingClientRect().width;
    const dbouceResize = debounce(() => {
      if (!refTarget.current) return;
      setIsReSplit((pre) => pre + 1);
      text?.split({ types });
      setSplitter(text);
      setTimeout(() => gsap.set(refTarget.current, { opacity: 1 }), 50);
    }, 100);

    refResize.current = new ResizeObserver(dbouceResize);
    refResize.current?.observe(refTarget.current);

    return () => {
      refResize.current?.disconnect();
      refResize.current = null;
    };
  }, [font]);

  const clearReSplit = useCallback((): void => {
    if (!refTarget.current || !refResize.current) return;
    refResize.current?.unobserve(refTarget.current);
    refResize.current?.disconnect();
    refResize.current = null;
  }, [refTarget]);

  return { splitter, isReSplit, clearReSplit };
}
