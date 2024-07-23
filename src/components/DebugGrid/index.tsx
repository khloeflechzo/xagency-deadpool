'use client';

import cn from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import s from './style.module.scss';

const cx = cn.bind(s);

export const DebugGrid = (): JSX.Element => {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown: (ev: KeyboardEvent) => void = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        localStorage.setItem('isGrid', String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird]
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={cx('grid-debug', `${isGird ? '' : s.hidden}`)}>
      <div className="container">
        <div className={s.grid_wrapper}>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
          <div className="debug_col col-span-1 xs:hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
};
