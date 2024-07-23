import { forwardRef, VideoHTMLAttributes } from 'react';

const VideoPreload = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(
  (props, ref) => {
    return <video ref={ref} {...props} />;
  }
);

VideoPreload.displayName = 'VideoPreload';

export default VideoPreload;
