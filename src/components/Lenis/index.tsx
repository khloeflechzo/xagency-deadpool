'use client';

import { isPlayState } from '@Layouts/Animation/animationSignal';
import { useSignalEffect } from '@preact/signals-react';
import Lenis from '@studio-freight/lenis';
import { ReactLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import React, { PropsWithChildren, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<Lenis>();

  useSignalEffect(() => {
    function update(time: number): void {
      lenisRef.current?.raf(time * 1000);
    }

    if (isPlayState.value) {
      lenisRef.current?.start();
      gsap.ticker.add(update);
    } else {
      lenisRef.current?.stop();
      gsap.ticker.remove(update);
    }

    setTimeout(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    });
    window.lenisRoot = lenisRef;
    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <ReactLenis isStopped={true} root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  );
}
