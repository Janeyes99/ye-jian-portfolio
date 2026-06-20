// LoadingSynthesizer Component

import React from 'react';

var LoadingSynthesizer = ({
  lang: lang2
}) => {
  const rootRef = React.useRef(null);
  const blobRef = React.useRef(null);
  const dotARef = React.useRef(null);
  const dotBRef = React.useRef(null);
  const progressRef = React.useRef(null);
  const textRef = React.useRef(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(progressRef.current, {
        transformOrigin: "left center",
        scaleX: reduceMotion ? 1 : 0
      });
      gsap.set(blobRef.current, {
        borderRadius: "44% 56% 62% 38% / 46% 52% 48% 54%",
        transformOrigin: "50% 55%"
      });
      if (reduceMotion) {
        gsap.set([rootRef.current, blobRef.current, dotARef.current, dotBRef.current, textRef.current], {
          autoAlpha: 1,
          clearProps: "transform"
        });
        return;
      }
      gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      }).fromTo(rootRef.current, {
        autoAlpha: 0,
        scale: 0.985
      }, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.28
      }).fromTo(progressRef.current, {
        scaleX: 0
      }, {
        scaleX: 1,
        duration: 1.72,
        ease: "power2.inOut"
      }, 0.08).fromTo(textRef.current, {
        autoAlpha: 0,
        y: 8
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.36
      }, 0.12);
      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: {
          ease: "sine.inOut"
        }
      }).to(blobRef.current, {
        scale: 1.055,
        y: -5,
        rotation: 7,
        borderRadius: "58% 42% 45% 55% / 48% 58% 42% 52%",
        duration: 0.92
      }).to(blobRef.current, {
        scale: 0.985,
        y: 4,
        rotation: -5,
        borderRadius: "42% 58% 60% 40% / 56% 44% 54% 46%",
        duration: 0.92
      });
      gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "sine.inOut"
        }
      }).to(dotARef.current, {
        autoAlpha: 0.76,
        scale: 1.25,
        y: -10,
        duration: 0.78
      }).to(dotARef.current, {
        autoAlpha: 0.18,
        scale: 0.72,
        y: 2,
        duration: 0.86
      }).to(dotBRef.current, {
        autoAlpha: 0.68,
        scale: 1.2,
        y: 8,
        duration: 0.74
      }, 0.18).to(dotBRef.current, {
        autoAlpha: 0.16,
        scale: 0.78,
        y: -3,
        duration: 0.9
      }, 0.94);
    }, rootRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    ref: rootRef,
    className: "flex flex-col items-center justify-center w-full h-full animate-fade-in-simple p-8 bg-white/95 rounded-3xl shadow-[0_34px_90px_rgba(63,63,70,0.07)]"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-36 h-36 flex justify-center items-center mb-10"
  }, /* @__PURE__ */ React.createElement("div", {
    ref: dotARef,
    className: "absolute top-1 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-500/80 shadow-[0_0_18px_rgba(59,130,246,0.45)]"
  }), /* @__PURE__ */ React.createElement("div", {
    ref: dotBRef,
    className: "absolute bottom-5 left-4 w-2.5 h-2.5 rounded-full bg-pink-500/70 shadow-[0_0_18px_rgba(236,72,153,0.38)]"
  }), /* @__PURE__ */ React.createElement("div", {
    ref: blobRef,
    className: "w-28 h-28 bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 shadow-[0_0_54px_rgba(99,102,241,0.48)] will-change-transform"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-5 relative"
  }, /* @__PURE__ */ React.createElement("div", {
    ref: progressRef,
    className: "absolute top-0 left-0 h-full w-full origin-left rounded-full bg-blue-600 will-change-transform"
  })), /* @__PURE__ */ React.createElement("div", {
    ref: textRef,
    className: "text-sm text-zinc-500 font-bold tracking-[0.12em] text-center"
  }, lang2 === "en" ? "Rolling Your Match..." : "\u6B63\u5728\u6447\u51FA\u5339\u914D\u7ED3\u679C..."));
}

export default LoadingSynthesizer;
