import s from '@Layouts/Header/styles.module.scss';
import { useLenis } from '@studio-freight/react-lenis';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

interface IUseHideHeader {
  refHeader: MutableRefObject<HTMLDivElement | HTMLAnchorElement>;
}
export default function useHideHeader({ refHeader }: IUseHideHeader): void {
  const refScroller = useRef<{ scrollOld: number }>({ scrollOld: 0 });

  const onScrolling = useCallback(
    ({ scroll }: { scroll: number }) => {
      if (refScroller.current.scrollOld < scroll) {
        refHeader.current?.classList.add(s.isHide);
      } else {
        refHeader.current?.classList.remove(s.isHide);
      }

      refScroller.current.scrollOld = scroll;
    },
    [refHeader]
  );

  useEffect(() => {
    refHeader.current?.classList.remove(s.isHide);
  }, [refHeader]);
  useLenis(onScrolling);
}
