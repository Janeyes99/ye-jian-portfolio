import React, { useEffect, useRef, useState } from 'react';

const DeferredVideo = ({ src, preload = 'metadata', ...videoProps }) => {
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setActive(true);
      observer.disconnect();
    }, { rootMargin: '500px 0px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} src={active ? src : undefined} preload={active ? preload : 'none'} {...videoProps} />;
};

export default DeferredVideo;
