'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const CanvasLoop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imageUrls = ['/images/content-0.jpg', '/images/content-1.jpg'];

  useEffect(() => {
    if (!canvasRef.current) return;

    const playhead = { frame: 0 };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let curFrame = -1;
    const images = imageUrls.map((url, i) => {
      const img = new Image();
      img.src = url;
      if (i === 0) {
        img.onload = (): void => updateImage();
      }
      return img;
    });

    const updateImage = (): void => {
      const frame = Math.round(playhead.frame);
      if (frame !== curFrame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
        curFrame = frame;
      }
    };

    const tween = gsap.to(playhead, {
      frame: images.length - 1,
      ease: 'none',
      onUpdate: updateImage,
      duration: images.length / 5,
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, [imageUrls]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{
        position: 'sticky',
        width: '100vw',
        height: '100vh',
        top: 0,
        zIndex: 0,
      }}
    />
  );
};

export default CanvasLoop;
