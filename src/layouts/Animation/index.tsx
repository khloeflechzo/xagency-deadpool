'use client';

import useWindowResizeSignal from '@Hooks/useWindowResizeSignal';
import PageEffect from '@Layouts/PageEffect';
import { inCompleteState, urlState } from '@Layouts/PageEffect/pageEffectSignal';
import PageLoader from '@Layouts/PageLoader';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

import { useDebouncedSignal } from '@/utils/signalUtils';
import { gRefresh } from '@/utils/uiHelper';

interface IProp extends PropsWithChildren {}
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.lenisRoot?.current?.scrollTo(0, { immediate: true });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}
export default function Animate({ children }: IProp): ReactElement {
  const router = useRouter();
  const { scrollHeight } = useWindowResizeSignal();

  const debounceScrollHeight = useDebouncedSignal(scrollHeight, 300);
  useSignalEffect(() => {
    debounceScrollHeight.value && gRefresh();
  });
  useSignalEffect(() => {
    if (!inCompleteState.value) return;
    router.push(urlState.value, { scroll: true });
  });

  return (
    <main id={'main'}>
      <PageLoader />
      <PageEffect />
      <div>{children}</div>
    </main>
  );
}
