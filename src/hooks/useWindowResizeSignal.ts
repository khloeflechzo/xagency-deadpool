'use client';

import { useGSAP } from '@gsap/react';
import { useIsomorphicLayoutEffect } from '@Hooks/useIsomorphicLayoutEffect';
import { Signal, useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import { debounce } from '@Utils/uiHelper';
import { useState } from 'react';

interface IDimension {
  width: Signal<number>;
  height: Signal<number>;
  isMobile: Signal<boolean>;
  isTablet: Signal<boolean>;
  isDesktop: Signal<boolean>;
  scrollHeight: Signal<number>;
}

const useWindowResizeSignal = (): IDimension => {
  const width = useSignal(0);
  const height = useSignal(0);
  const scrollHeight = useSignal(0);
  const listener = (): void => {
    width.value = window.innerWidth || document.body.clientWidth || 0;
    height.value = window.innerHeight || document.body.clientHeight || 0;
    scrollHeight.value = document.body.scrollHeight;
  };

  const deBounceListener = debounce(listener, 150);

  useGSAP(() => {
    const resizeObserver = new ResizeObserver((_entries) => {
      scrollHeight.value = document.body.scrollHeight;
    });

    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.unobserve(document.body);
      resizeObserver.disconnect();
    };
  });

  useIsomorphicLayoutEffect(() => {
    deBounceListener();
    window?.addEventListener?.('resize', deBounceListener);
    return () => {
      window?.removeEventListener?.('resize', deBounceListener);
    };
  }, []);

  const isMobile = useComputed(() => {
    return width.value < 768;
  });

  const isTablet = useComputed(() => {
    return width.value >= 768 && width.value <= 1199;
  });

  const isDesktop = useComputed(() => {
    return width.value >= 1200;
  });
  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    scrollHeight,
  };
};

export const useIsMobile = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isMobile } = useWindowResizeSignal();
  useSignalEffect((): void => {
    setIs(isMobile.value);
  });

  return is;
};

export const useIsDesktop = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isDesktop } = useWindowResizeSignal();
  useSignalEffect((): void => {
    setIs(isDesktop.value);
  });
  return is;
};

export const useIsTablet = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isTablet } = useWindowResizeSignal();
  useSignalEffect((): void => {
    setIs(isTablet.value);
  });

  return is;
};

export default useWindowResizeSignal;
