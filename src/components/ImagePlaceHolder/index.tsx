'use client';

import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import Image, { ImageProps } from 'next/image';
import { forwardRef, useEffect, useMemo, useRef } from 'react';

import { getTransitionThumbnail, handleConvertSize } from '@/utils/uiHelper';

import s from './style.module.scss';

interface IImagePlaceHolder extends ImageProps {
  fit?: string;
  className?: string;
  isNoneResponsive?: boolean;
  id?: string;
}

const ImagePlaceHolder = forwardRef<HTMLImageElement, IImagePlaceHolder>((props, ref) => {
  const imageLoadedRef = useRef<HTMLImageElement>(null);
  const { isNoneResponsive } = props;
  const { registerLoad } = useLoadManageSignal();

  const obfit = useMemo((): string => {
    return props.fit || 'cover';
  }, [props.fit]);

  const { w, h } = handleConvertSize({
    width: props.width as number,
    height: props.height as number,
  });

  //for loader manager
  useEffect(() => {
    const rect = imageLoadedRef.current?.getBoundingClientRect();
    if (!rect || rect.top > window.innerHeight) return;

    const { src } = getTransitionThumbnail({
      url: props.src as string,
      height: isNoneResponsive ? h : 100,
      width: isNoneResponsive ? w : 100,
      quality: 100,
    });

    src && registerLoad(src as string, 'IMAGE PLACE');
  }, [isNoneResponsive, h, w]);

  const onLoaded = (): void => {
    imageLoadedRef.current &&
      imageLoadedRef.current?.classList.add(s.imagePreload_placeholder_isLoaded);
    setTimeout(() => {
      imageLoadedRef.current?.remove();
    }, 100);
  };
  return (
    <div
      ref={ref}
      className={`${s.imagePreload} ${s[obfit]} ${props.className} imagePreload`}
      style={props.style}
    >
      {isNoneResponsive ? (
        <Image
          className={`${props.className} ${s.imagePreload_origin}`}
          onLoad={onLoaded}
          {...props}
          width={w}
          height={h}
          sizes="100vw"
          alt={props.alt}
          quality={100}
        />
      ) : (
        <Image
          className={`${props.className} ${s.imagePreload_origin}`}
          onLoad={onLoaded}
          sizes="100vw"
          {...props}
          width={w}
          height={h}
          alt={props.alt}
          quality={100}
          id={props.id}
        />
      )}

      <Image
        ref={imageLoadedRef}
        className={`${props.className} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={100}
        height={100}
        sizes="10vw"
        loading="eager"
        alt="eager"
        id={props.id}
      />
    </div>
  );
});

ImagePlaceHolder.displayName = 'ImagePlaceHolder';
export default ImagePlaceHolder;
