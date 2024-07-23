'use client';

import { useGSAP } from '@gsap/react';
import { DELAY_TIME_ENTER, TIMING_DURATION_LOADER_OUT } from '@Layouts/Animation/animate';
import useAnimationSignal from '@Layouts/Animation/animationSignal';
import useLoadManageSignal, { loadedSate } from '@Layouts/Animation/loadManageSignal';
import usePageEffectSignal, {
  inCompleteState,
  toggleState,
} from '@Layouts/PageEffect/pageEffectSignal';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { getDelay, resetScroll } from '@/utils/uiHelper';

import s from './styles.module.scss';

export default function PageEffect(): React.ReactElement {
  const { setInComplete, reset } = usePageEffectSignal();
  const { reset: resetLoader, checkRegisterLoaded } = useLoadManageSignal();
  const { play, reset: resetAnimation } = useAnimationSignal();

  const refContent = useRef(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const { contextSafe } = useGSAP({ scope: logoRef });

  //2check manager loader
  const pathName = usePathname();
  useEffect(() => {
    resetScroll();
    setTimeout(checkRegisterLoaded, 150);
  }, [pathName]);

  const initAnimation = contextSafe(() => {
    const logoWrapper = logoRef.current;
    if (!logoWrapper) return;

    gsap.set(logoWrapper.children[0], { y: '-120%' });
    gsap.set(logoWrapper.children[1], { y: '120%' });
    gsap.set(logoWrapper.children[2], {
      x: '120%',
    });
  });

  const playAnimation = contextSafe(() => {
    const logoWrapper = logoRef.current;
    if (!logoWrapper) return;

    const delay = getDelay({
      refContentCurrent: logoWrapper,
      delayTrigger: 0,
      delayEnter: 0,
    });

    const options = {
      ease: 'power3.inOut',
      duration: 0.6,
      delay,
    };

    gsap.to([logoWrapper.children[1], logoWrapper.children[0]], {
      y: '0',
      ...options,
    });

    gsap.to(logoWrapper.children[2], {
      x: '0',
      ...options,
    });
  });

  const reverseAnimation = contextSafe(() => {
    const logoWrapper = logoRef.current;
    if (!logoWrapper) return;

    const delay = getDelay({
      refContentCurrent: logoWrapper,
      delayTrigger: 0,
      delayEnter: 0,
    });

    const options = {
      ease: 'power3.inOut',
      duration: 0.6,
      delay,
    };

    gsap.to(logoWrapper.children[0], {
      y: '120%',
      ...options,
    });

    gsap.to(logoWrapper.children[1], {
      y: '-120%',
      ...options,
    });

    gsap.to(logoWrapper.children[2], {
      x: '120%',
      ...options,
    });

    return 0.5;
  });

  useSignalEffect(() => {
    initAnimation();
    if (toggleState.value) {
      resetLoader();
      resetAnimation();
      gsap.to(refContent.current, {
        opacity: 1,
        pointerEvents: 'auto',
        ease: 'power3.out',
        duration: 0.6,
        onStart: playAnimation,
        onComplete: setInComplete,
      });
    }
  });

  useSignalEffect(() => {
    if (inCompleteState.value && loadedSate.value) {
      const delay = reverseAnimation();
      setTimeout(
        () => {
          play();
          reset();
        },
        (delay || 0) * 1000 + DELAY_TIME_ENTER
      );
      gsap.to(refContent.current, {
        opacity: 0,
        ease: 'power3.inOut',
        pointerEvents: 'none',
        duration: TIMING_DURATION_LOADER_OUT,
        delay: delay,
      });
    }
  });

  return (
    <div className={cn(s.transition)} ref={refContent}>
      <svg
        width="108"
        height="50"
        viewBox="0 0 627 286"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.transition_logo}
        ref={logoRef}
      >
        <g>
          <path d="M35.4044 99.3739L45.3487 0H0L9.94426 99.3739H35.4044Z" fill="#FF6542" />
          <path
            d="M5.46484 202.813V286.001H38.8769V183.798L133.541 286.001H177.303L74.6692 175.722L168.152 82.4004H124.391L38.8769 167.647"
            fill="#FF6542"
          />
        </g>
        <g>
          <path
            d="M302.241 112.302V256.117H233.037V286.001H409.654V256.117H335.653V82.4004H240.989V112.302H302.241Z"
            fill="#FF6542"
          />
          <path
            d="M297.075 47.6637C302.382 53.0532 308.871 55.7389 316.576 55.7389C324.281 55.7389 330.751 53.1069 336.059 47.8606C341.366 42.6144 344.01 36.079 344.01 28.2723C344.01 20.4657 341.348 13.8049 336.059 8.27221C330.751 2.7574 324.263 0 316.576 0C308.888 0 302.382 2.7574 297.075 8.27221C291.768 13.787 289.123 20.4657 289.123 28.2723C289.123 36.079 291.768 42.2742 297.075 47.6637Z"
            fill="#FF6542"
          />
        </g>
        <g>
          <path
            d="M611.676 96.5448C601.467 84.9601 586.145 79.1768 565.728 79.1768C551.94 79.1768 539.016 82.9548 526.938 90.4929C514.861 98.031 505.128 107.861 497.705 119.983V82.4176H464.293V286.018H497.705V204.012C497.705 175.471 503.4 152.642 514.808 135.542C526.215 118.443 540.127 109.884 556.577 109.884C581.244 109.884 593.568 123.761 593.568 151.496V286.018H626.98V144.226C626.98 124.029 621.867 108.147 611.659 96.5627L611.676 96.5448Z"
            fill="#FF6542"
          />
        </g>
      </svg>
    </div>
  );
}
