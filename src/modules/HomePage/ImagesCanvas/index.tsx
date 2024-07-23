'use client';

import { FC, useEffect, useRef, useState } from 'react';

import Content from './Content';
import s from './styles.module.scss';

const getCurrentFrame = (index: number): string => {
  return `/images/homepage-${index}.jpg`;
};

const ImageCanvas: FC = () => {
  const numFrames: number = 11;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

  // Preload images and set state when all are loaded
  const preloadImages = (): void => {
    let loadedImages = 0;
    const imageArray = Array(numFrames)
      .fill(null)
      .map((_, index) => {
        const img = new Image();
        img.src = getCurrentFrame(index);
        img.onload = (): void => {
          loadedImages++;
          if (loadedImages === numFrames) {
            setAllImagesLoaded(true);
          }
        };
        return img;
      });
    setImages(imageArray);
  };

  // Handle scrolling
  const handleScroll = (): void => {
    const scrollHeight = window.innerHeight * 2;
    const scrollFraction = window.scrollY / (scrollHeight - window.innerHeight);
    const index = Math.min(numFrames - 1, Math.ceil(scrollFraction * numFrames));
    setFrameIndex(index);
  };

  // Update the size of the canvas to fill the viewport
  const updateCanvasSize = (): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  // Draw the current frame
  const drawFrame = (): void => {
    const canvas = canvasRef.current;
    const img = images[frameIndex];
    if (canvas && img) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Initial setup: image preloading, size adjustment, and event listener setup
  useEffect(() => {
    preloadImages();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // After all images are loaded
  useEffect(() => {
    if (allImagesLoaded) {
      updateCanvasSize();
      drawFrame(); // Initial draw
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [allImagesLoaded]);

  // Redraw canvas whenever frameIndex changes
  useEffect(() => {
    if (allImagesLoaded) {
      drawFrame();
    }
  }, [frameIndex]);

  return (
    <div id="home" className={s.canvas_wrapper}>
      <canvas ref={canvasRef} />
      <div className={s.canvas_wrapper_content}>
        <Content active={frameIndex === 10} />
      </div>
    </div>
  );
};

export default ImageCanvas;
