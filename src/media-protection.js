const protectedSelector = 'img, video, canvas, svg, .touch-media, .portfolio-media';

const isProtectedTarget = (target) => target?.closest?.(protectedSelector);

const blockProtectedAction = (event) => {
  if (isProtectedTarget(event.target)) event.preventDefault();
};

const hardenMedia = (root = document) => {
  root.querySelectorAll?.('img, video').forEach((element) => {
    element.setAttribute('draggable', 'false');
    element.addEventListener('contextmenu', (event) => event.preventDefault(), true);
    element.addEventListener('dragstart', (event) => event.preventDefault(), true);

    if (element.tagName === 'VIDEO') {
      element.setAttribute('controlsList', 'nodownload noplaybackrate');
      element.setAttribute('disablePictureInPicture', '');
    }
  });
};

export const installMediaProtection = () => {
  document.addEventListener('contextmenu', blockProtectedAction, true);
  document.addEventListener('dragstart', blockProtectedAction, true);
  document.addEventListener('auxclick', blockProtectedAction, true);
  document.addEventListener('copy', blockProtectedAction, true);
  document.addEventListener('keydown', (event) => {
    const key = event.key?.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && (key === 's' || key === 'p')) {
      event.preventDefault();
    }
  }, true);

  hardenMedia();
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) hardenMedia(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
};
