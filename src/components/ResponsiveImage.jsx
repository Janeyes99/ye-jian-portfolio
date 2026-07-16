import React from 'react';

const optimizedWidths = [480, 960];
const optimizablePattern = /\.(gif|jpe?g|png)(?:\?.*)?$/i;

const variantUrl = (src, width, format) => {
  const [path] = String(src || '').split('?');
  return path.replace(/\.[^.\/]+$/, `.w${width}.${format}`);
};

const buildSrcSet = (src, format) => optimizedWidths
  .map((width) => `${variantUrl(src, width, format)} ${width}w`)
  .join(', ');

const ResponsiveImage = ({ src, sizes = '100vw', ...imageProps }) => {
  if (!import.meta.env.PROD || !optimizablePattern.test(src || '')) {
    return <img src={src} {...imageProps} />;
  }

  const isGif = /\.gif(?:\?.*)?$/i.test(src);
  return (
    <picture>
      {!isGif && <source type="image/avif" srcSet={buildSrcSet(src, 'avif')} sizes={sizes} />}
      <source type="image/webp" srcSet={buildSrcSet(src, 'webp')} sizes={sizes} />
      <img src={src} {...imageProps} />
    </picture>
  );
};

export default ResponsiveImage;
