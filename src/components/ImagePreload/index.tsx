'use client';

import s from '@Components/ImagePlaceHolder/style.module.scss';
import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import { getTransitionThumbnail, handleConvertSize } from '@Utils/uiHelper';
import Image, { ImageProps } from 'next/image';
import React, { forwardRef, useEffect } from 'react';

import { IImageGenerative } from '@/types/common';

const ImagePreload = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { registerLoad } = useLoadManageSignal();
  const { src } = getTransitionThumbnail({ ...props, quality: 100 } as IImageGenerative);
  const { w, h } = handleConvertSize({
    width: props.width as number,
    height: props.height as number,
  });

  useEffect(() => {
    src && registerLoad(src as string);
  }, [src]);

  return (
    <Image
      ref={ref}
      className={`${props.className} ${s.imagePreload_origin}`}
      sizes="100vw"
      width={w}
      height={h}
      quality={100}
      {...props}
      loading="eager"
      alt={props.alt}
    />
  );
});

ImagePreload.displayName = 'ImagePreload';
export default ImagePreload;
