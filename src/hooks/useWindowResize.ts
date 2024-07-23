import { useIsomorphicLayoutEffect } from '@Hooks/useIsomorphicLayoutEffect';
import { debounce } from '@Utils/uiHelper';
import { useMemo, useState } from 'react';

interface IDimension {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scrollHeight: number;
}

const useWindowResize = (): IDimension => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const listener = (): void => {
    setWidth(window.innerWidth || document.body.clientWidth || 0);
    setHeight(window.innerHeight || document.body.clientHeight || 0);
    setScrollHeight(document.body.scrollHeight);
  };

  const deBounceListener = debounce(listener, 150);
  useIsomorphicLayoutEffect(() => {
    deBounceListener();
    window?.addEventListener?.('resize', deBounceListener);
    return () => {
      window?.removeEventListener?.('resize', deBounceListener);
    };
  }, []);

  return useMemo(() => {
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width <= 1199,
      isDesktop: width >= 1200,
      scrollHeight,
    };
  }, [width, height, scrollHeight]);
};

export default useWindowResize;
