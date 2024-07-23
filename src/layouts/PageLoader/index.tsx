import { DELAY_TIME_ENTER, TIMING_DURATION_LOADER_OUT } from '@Layouts/Animation/animate';
import useAnimationSignal, { isPlayedState } from '@Layouts/Animation/animationSignal';
import { loadedSate } from '@Layouts/Animation/loadManageSignal';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import s from './styles.module.scss';

export default function PageLoader(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { play, setPlayed } = useAnimationSignal();

  useEffect(() => {
    document.body.classList.add('is-ready');
  }, []);
  useSignalEffect(() => {
    if (loadedSate.value && refContent.current && !isPlayedState.peek()) {
      setTimeout(() => {
        play();
        setPlayed();
      }, DELAY_TIME_ENTER);
      gsap.to(refContent.current, {
        opacity: 0,
        ease: 'power3.inOut',
        duration: TIMING_DURATION_LOADER_OUT,
        onComplete: () => {
          refContent.current?.classList.add(s.isHide);
        },
      });
    }
  });
  return <div className={s.pageLoader} ref={refContent}></div>;
}
