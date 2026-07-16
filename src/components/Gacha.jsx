import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { LanguageContext, RouteContext } from '../app/contexts.jsx';
import { prefetchRoute } from '../app/route-loaders.js';
import { gachaDimensions, gachaProjectCatalog } from '../data/catalog.js';
import { prefetchProjectData } from '../data/project-loaders.js';

var capsuleLayouts = [[{
  left: "8%",
  top: "62%"
}, {
  left: "18%",
  top: "48%"
}, {
  left: "29%",
  top: "65%"
}, {
  left: "40%",
  top: "52%"
}, {
  left: "52%",
  top: "66%"
}, {
  left: "64%",
  top: "55%"
}, {
  left: "76%",
  top: "64%"
}, {
  left: "14%",
  top: "30%"
}, {
  left: "26%",
  top: "20%"
}, {
  left: "38%",
  top: "30%"
}, {
  left: "50%",
  top: "18%"
}, {
  left: "62%",
  top: "28%"
}, {
  left: "74%",
  top: "36%"
}, {
  left: "82%",
  top: "50%"
}, {
  left: "20%",
  top: "72%"
}, {
  left: "43%",
  top: "76%"
}, {
  left: "59%",
  top: "78%"
}, {
  left: "7%",
  top: "44%"
}, {
  left: "70%",
  top: "14%"
}], [{
  left: "10%",
  top: "36%"
}, {
  left: "21%",
  top: "58%"
}, {
  left: "32%",
  top: "45%"
}, {
  left: "44%",
  top: "66%"
}, {
  left: "56%",
  top: "52%"
}, {
  left: "68%",
  top: "68%"
}, {
  left: "80%",
  top: "57%"
}, {
  left: "18%",
  top: "18%"
}, {
  left: "30%",
  top: "31%"
}, {
  left: "42%",
  top: "20%"
}, {
  left: "54%",
  top: "30%"
}, {
  left: "66%",
  top: "20%"
}, {
  left: "78%",
  top: "34%"
}, {
  left: "8%",
  top: "60%"
}, {
  left: "25%",
  top: "75%"
}, {
  left: "49%",
  top: "76%"
}, {
  left: "63%",
  top: "42%"
}, {
  left: "74%",
  top: "48%"
}, {
  left: "36%",
  top: "58%"
}], [{
  left: "8%",
  top: "55%"
}, {
  left: "20%",
  top: "42%"
}, {
  left: "31%",
  top: "70%"
}, {
  left: "43%",
  top: "56%"
}, {
  left: "55%",
  top: "72%"
}, {
  left: "67%",
  top: "58%"
}, {
  left: "79%",
  top: "46%"
}, {
  left: "13%",
  top: "24%"
}, {
  left: "25%",
  top: "34%"
}, {
  left: "37%",
  top: "18%"
}, {
  left: "49%",
  top: "27%"
}, {
  left: "61%",
  top: "18%"
}, {
  left: "73%",
  top: "30%"
}, {
  left: "82%",
  top: "40%"
}, {
  left: "18%",
  top: "73%"
}, {
  left: "43%",
  top: "78%"
}, {
  left: "57%",
  top: "42%"
}, {
  left: "69%",
  top: "76%"
}, {
  left: "30%",
  top: "52%"
}]];
var capsuleStyles = [{
  color: "bg-gradient-to-br from-red-400 via-rose-500 to-red-700",
  payloadGradient: "linear-gradient(135deg, #fecdd3 0%, #fb7185 54%, #be123c 100%)",
  payloadDot: "#ffe4e6",
  delay: "0s",
  rot: 15
}, {
  color: "bg-gradient-to-br from-blue-300 via-sky-500 to-blue-700",
  payloadGradient: "linear-gradient(135deg, #dbeafe 0%, #38bdf8 54%, #1d4ed8 100%)",
  payloadDot: "#bfdbfe",
  delay: "0.06s",
  rot: -20
}, {
  color: "bg-gradient-to-br from-emerald-300 via-green-500 to-emerald-700",
  payloadGradient: "linear-gradient(135deg, #dcfce7 0%, #34d399 54%, #047857 100%)",
  payloadDot: "#bbf7d0",
  delay: "0.12s",
  rot: 45
}, {
  color: "bg-gradient-to-br from-violet-300 via-purple-500 to-fuchsia-700",
  payloadGradient: "linear-gradient(135deg, #ede9fe 0%, #a855f7 55%, #7e22ce 100%)",
  payloadDot: "#f3e8ff",
  delay: "0.18s",
  rot: -10
}, {
  color: "bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-600",
  payloadGradient: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 55%, #c2410c 100%)",
  payloadDot: "#fff7ed",
  delay: "0.04s",
  rot: 80
}, {
  color: "bg-gradient-to-br from-slate-500 via-zinc-700 to-black",
  payloadGradient: "linear-gradient(135deg, #f3f4f6 0%, #6b7280 58%, #111827 100%)",
  payloadDot: "#e5e7eb",
  delay: "0.22s",
  rot: 5
}, {
  color: "bg-gradient-to-br from-pink-300 via-rose-500 to-pink-700",
  payloadGradient: "linear-gradient(135deg, #fce7f3 0%, #f43f5e 54%, #be185d 100%)",
  payloadDot: "#fbcfe8",
  delay: "0.08s",
  rot: -60
}, {
  color: "bg-gradient-to-br from-orange-300 via-orange-500 to-red-600",
  payloadGradient: "linear-gradient(135deg, #fed7aa 0%, #f97316 54%, #c2410c 100%)",
  payloadDot: "#ffedd5",
  delay: "0.14s",
  rot: 30
}, {
  color: "bg-gradient-to-br from-cyan-200 via-cyan-500 to-teal-700",
  payloadGradient: "linear-gradient(135deg, #cffafe 0%, #22d3ee 52%, #0f766e 100%)",
  payloadDot: "#ecfeff",
  delay: "0.2s",
  rot: -40
}, {
  color: "bg-gradient-to-br from-lime-200 via-lime-500 to-green-700",
  payloadGradient: "linear-gradient(135deg, #ecfccb 0%, #84cc16 54%, #15803d 100%)",
  payloadDot: "#f7fee7",
  delay: "0.1s",
  rot: 35
}, {
  color: "bg-gradient-to-br from-fuchsia-300 via-pink-500 to-violet-700",
  payloadGradient: "linear-gradient(135deg, #fae8ff 0%, #ec4899 52%, #7e22ce 100%)",
  payloadDot: "#fce7f3",
  delay: "0.24s",
  rot: -32
}, {
  color: "bg-gradient-to-br from-amber-200 via-yellow-500 to-orange-500",
  payloadGradient: "linear-gradient(135deg, #fef9c3 0%, #eab308 54%, #ea580c 100%)",
  payloadDot: "#fffbeb",
  delay: "0.16s",
  rot: 62
}, {
  color: "bg-gradient-to-br from-sky-200 via-blue-500 to-indigo-700",
  payloadGradient: "linear-gradient(135deg, #e0f2fe 0%, #3b82f6 55%, #3730a3 100%)",
  payloadDot: "#dbeafe",
  delay: "0.28s",
  rot: -72
}, {
  color: "bg-gradient-to-br from-rose-200 via-red-400 to-red-700",
  payloadGradient: "linear-gradient(135deg, #ffe4e6 0%, #f87171 54%, #b91c1c 100%)",
  payloadDot: "#fee2e2",
  delay: "0.32s",
  rot: 24
}, {
  color: "bg-gradient-to-br from-teal-200 via-teal-500 to-cyan-800",
  payloadGradient: "linear-gradient(135deg, #ccfbf1 0%, #14b8a6 54%, #155e75 100%)",
  payloadDot: "#f0fdfa",
  delay: "0.26s",
  rot: -18
}, {
  color: "bg-gradient-to-br from-purple-200 via-violet-500 to-purple-800",
  payloadGradient: "linear-gradient(135deg, #f3e8ff 0%, #8b5cf6 54%, #581c87 100%)",
  payloadDot: "#ede9fe",
  delay: "0.34s",
  rot: 52
}, {
  color: "bg-gradient-to-br from-green-200 via-emerald-500 to-green-800",
  payloadGradient: "linear-gradient(135deg, #dcfce7 0%, #10b981 54%, #166534 100%)",
  payloadDot: "#bbf7d0",
  delay: "0.3s",
  rot: -48
}, {
  color: "bg-gradient-to-br from-indigo-200 via-blue-500 to-indigo-800",
  payloadGradient: "linear-gradient(135deg, #e0e7ff 0%, #3b82f6 54%, #3730a3 100%)",
  payloadDot: "#c7d2fe",
  delay: "0.36s",
  rot: 12
}, {
  color: "bg-gradient-to-br from-orange-200 via-amber-500 to-rose-600",
  payloadGradient: "linear-gradient(135deg, #ffedd5 0%, #f59e0b 48%, #e11d48 100%)",
  payloadDot: "#fff7ed",
  delay: "0.38s",
  rot: -66
}];
var capsulePayloads = [{
  blob: {
    left: "19%",
    top: "16%",
    width: "50%",
    height: "50%",
    background: "linear-gradient(135deg, #4f73f3 0%, #8c5be4 60%, #d454a0 100%)",
    borderRadius: "55% 45% 62% 38% / 45% 40% 60% 55%",
    transform: "rotate(-9deg)"
  },
  dot: {
    left: "20%",
    top: "35%",
    width: "13%",
    height: "13%",
    background: "#f0c4e8"
  }
}, {
  blob: {
    left: "24%",
    top: "14%",
    width: "46%",
    height: "54%",
    background: "linear-gradient(145deg, #48bfe8 0%, #6c63df 58%, #ad5bd7 100%)",
    borderRadius: "48% 52% 45% 55% / 58% 42% 58% 42%",
    transform: "rotate(14deg)"
  },
  dot: {
    left: "64%",
    top: "25%",
    width: "10%",
    height: "10%",
    background: "#d7f4ff"
  }
}, {
  blob: {
    left: "20%",
    top: "20%",
    width: "54%",
    height: "43%",
    background: "linear-gradient(135deg, #7bd36f 0%, #28b482 52%, #2e7fd5 100%)",
    borderRadius: "62% 38% 42% 58% / 47% 58% 42% 53%",
    transform: "rotate(-21deg)"
  },
  dot: {
    left: "23%",
    top: "19%",
    width: "11%",
    height: "11%",
    background: "#f4f0b5"
  }
}, {
  blob: {
    left: "27%",
    top: "16%",
    width: "42%",
    height: "52%",
    background: "linear-gradient(140deg, #ff8cb9 0%, #b064e8 54%, #5b73ee 100%)",
    borderRadius: "46% 54% 61% 39% / 52% 48% 42% 58%",
    transform: "rotate(8deg)"
  },
  dot: {
    left: "17%",
    top: "34%",
    width: "12%",
    height: "12%",
    background: "#ffd6ea"
  }
}, {
  blob: {
    left: "18%",
    top: "15%",
    width: "55%",
    height: "48%",
    background: "linear-gradient(135deg, #f5cd4c 0%, #f59d35 52%, #db5685 100%)",
    borderRadius: "52% 48% 40% 60% / 45% 52% 48% 55%",
    transform: "rotate(-14deg)"
  },
  dot: {
    left: "65%",
    top: "18%",
    width: "12%",
    height: "12%",
    background: "#fff0a8"
  }
}, {
  blob: {
    left: "24%",
    top: "18%",
    width: "48%",
    height: "47%",
    background: "linear-gradient(135deg, #6b7280 0%, #1f2937 65%, #111827 100%)",
    borderRadius: "58% 42% 55% 45% / 42% 54% 46% 58%",
    transform: "rotate(18deg)"
  },
  dot: {
    left: "25%",
    top: "20%",
    width: "13%",
    height: "13%",
    background: "#d1d5db"
  }
}];
var CapsuleShell = ({
  color,
  payloadGradient,
  payloadDot,
  rot = 0,
  variant = 0,
  forceDomePayload = false
}) => {
  const payload = capsulePayloads[variant % capsulePayloads.length];
  const fillGradient = payloadGradient || payload.blob.background;
  const fillDot = payloadDot || payload.dot.background;
  const payloadBlobStyle = {
    ...payload.blob,
    background: fillGradient
  };
  const payloadDotStyle = {
    ...payload.dot,
    background: fillDot
  };
  const domePayloadStyle = {
    left: "16%",
    top: "8%",
    width: "68%",
    height: "76%",
    background: fillGradient,
    borderRadius: payload.blob.borderRadius,
    transform: (payload.blob.transform || "") + " scale(1.06)"
  };
  const domeDotStyle = {
    left: payload.dot.left,
    top: "44%",
    width: "14%",
    height: "14%",
    background: fillDot
  };
  const upperMask = {
    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 59%)",
    maskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 59%)"
  };
  const upperSpeckleStyle = {
    ...upperMask,
    backgroundImage: "radial-gradient(circle at 22% 35%, rgba(255,255,255,0.42) 0 1px, transparent 1.8px), radial-gradient(circle at 68% 28%, rgba(255,255,255,0.24) 0 0.8px, transparent 1.6px)",
    backgroundSize: "8px 8px, 11px 11px"
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full rounded-full overflow-hidden bg-sky-50/10 shadow-[inset_-4px_-7px_10px_rgba(0,0,0,0.23),0_7px_14px_rgba(63,63,70,0.18)]",
    style: {
      transform: "rotate(" + rot + "deg)"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[1] rounded-full bg-gradient-to-br from-white/64 via-white/32 to-slate-100/18"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute z-[8] opacity-64 blur-[3px] shadow-[0_5px_12px_rgba(99,102,241,0.10)]",
    style: payloadBlobStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute z-[9] rounded-full opacity-36 blur-[2.8px]",
    style: payloadDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[18] rounded-full overflow-hidden pointer-events-none"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full",
    style: upperMask
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute opacity-[0.44] blur-[4.5px] saturate-110",
    style: domePayloadStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute rounded-full opacity-[0.24] blur-[4px]",
    style: domeDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full bg-white/44 shadow-[inset_0_-6px_14px_rgba(255,255,255,0.52)]"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-x-0 bottom-0 z-10 h-[52%] " + color + " shadow-[inset_-4px_-6px_10px_rgba(0,0,0,0.32)]"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-20 rounded-full overflow-hidden pointer-events-none"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full border border-white/78 bg-gradient-to-br from-white/76 via-white/54 to-slate-100/30 shadow-[inset_3px_6px_12px_rgba(255,255,255,0.92),inset_-5px_-7px_12px_rgba(100,116,139,0.12),0_2px_5px_rgba(100,116,139,0.10)]",
    style: upperMask
  })), forceDomePayload && /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[23] rounded-full overflow-hidden pointer-events-none",
    style: upperMask
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute opacity-[0.68] blur-[3.6px] saturate-125",
    style: domePayloadStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute rounded-full opacity-[0.42] blur-[2.8px]",
    style: domeDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full bg-white/8"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-[4%] z-[24] rounded-full opacity-18 pointer-events-none",
    style: upperSpeckleStyle
  }));
};
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
};
var InteractiveGacha = () => {
  const {
    t,
    lang: lang2
  } = useContext(LanguageContext);
  const {
    navigate
  } = useContext(RouteContext);
  const [params, setParams] = useState({
    screenMatter: 50,
    practicalExperimental: 50,
    systemObject: 50
  });
  const [results, setResults] = useState([]);
  const [gachaStatus, setGachaStatus] = useState("idle");
  const [dispensedCapsuleIndex, setDispensedCapsuleIndex] = useState(0);
  const [capsuleLayout, setCapsuleLayout] = useState(0);
  const [capsulesAreShuffling, setCapsulesAreShuffling] = useState(false);
  const [activeTuner, setActiveTuner] = useState(null);
  const [machineHovered, setMachineHovered] = useState(false);
  const sequenceRef = React.useRef(0);
  const shuffleSettleRef = React.useRef(null);
  const tunerDragRef = React.useRef(null);
  const resetGacha = () => {
    sequenceRef.current += 1;
    setGachaStatus("idle");
    setResults([]);
  };
  const clampParam = (value) => Math.max(0, Math.min(100, Math.round(value)));
  const handleParamChange = (id, value) => {
    const nextValue = clampParam(value);
    setParams((prev) => prev[id] === nextValue ? prev : {
      ...prev,
      [id]: nextValue
    });
    if (gachaStatus !== "idle") {
      resetGacha();
    }
  };
  const beginTunerDrag = (event, id) => {
    if (event.button !== void 0 && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    tunerDragRef.current = {
      id,
      startY: event.clientY,
      startValue: params[id]
    };
    setActiveTuner(id);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const moveTunerDrag = (event) => {
    const drag = tunerDragRef.current;
    if (!drag) return;
    event.preventDefault();
    const nextValue = drag.startValue + (drag.startY - event.clientY) * 0.45;
    handleParamChange(drag.id, nextValue);
  };
  const endTunerDrag = (event) => {
    if (!tunerDragRef.current) return;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    tunerDragRef.current = null;
    setActiveTuner(null);
  };
  const handleTunerKeyDown = (event, id) => {
    const current = params[id];
    let nextValue = current;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") nextValue = current + 3;
    else if (event.key === "ArrowDown" || event.key === "ArrowLeft") nextValue = current - 3;
    else if (event.key === "PageUp") nextValue = current + 10;
    else if (event.key === "PageDown") nextValue = current - 10;
    else if (event.key === "Home") nextValue = 0;
    else if (event.key === "End") nextValue = 100;
    else return;
    event.preventDefault();
    handleParamChange(id, nextValue);
  };
  const getMatchedProjects = () => {
    const scoredProjects = gachaProjectCatalog.map((project, catalogIndex) => {
      const sumSq = gachaScoreKeys.reduce((total, key) => {
        const diff = params[key] - project.scores[key];
        return total + diff * diff;
      }, 0);
      return {
        ...project,
        distance: Math.sqrt(sumSq),
        catalogIndex
      };
    });
    return scoredProjects.sort((a, b) => a.distance - b.distance || a.catalogIndex - b.catalogIndex).slice(0, 3).map(({
      catalogIndex,
      ...project
    }) => project);
  };
  const generateResults = () => {
    if (gachaStatus !== "idle") return;
    const sequence = sequenceRef.current + 1;
    sequenceRef.current = sequence;
    setGachaStatus("opening");
    setResults([]);
    setDispensedCapsuleIndex((prev) => {
      const offset = Math.floor(Math.random() * (capsuleStyles.length - 1)) + 1;
      return (prev + offset) % capsuleStyles.length;
    });
    setTimeout(() => {
      if (sequenceRef.current === sequence) {
        setGachaStatus("capsuleReady");
      }
    }, 950);
  };
  const openDispensedCapsule = () => {
    if (gachaStatus !== "capsuleReady") return;
    const sequence = sequenceRef.current + 1;
    sequenceRef.current = sequence;
    setResults(getMatchedProjects());
    setGachaStatus("loading");
    setTimeout(() => {
      if (sequenceRef.current === sequence) {
        setGachaStatus("results");
      }
    }, 1800);
  };
  const shuffleCapsules = () => {
    if (shuffleSettleRef.current) {
      window.clearTimeout(shuffleSettleRef.current);
    }
    setCapsulesAreShuffling(true);
    setCapsuleLayout((prev) => (prev + 1) % capsuleLayouts.length);
    shuffleSettleRef.current = window.setTimeout(() => {
      setCapsulesAreShuffling(false);
    }, 1500);
  };
  useEffect(() => {
    const interval = window.setInterval(shuffleCapsules, 12e3);
    return () => {
      window.clearInterval(interval);
      if (shuffleSettleRef.current) window.clearTimeout(shuffleSettleRef.current);
    };
  }, []);
  const isSpinning = gachaStatus === "opening";
  const hasDispensedCapsule = ["capsuleReady", "loading", "results"].includes(gachaStatus);
  const capsules = capsuleStyles.map((cap, index) => ({
    ...cap,
    ...capsuleLayouts[capsuleLayout][index]
  }));
  const dispensedCapsuleStyle = capsuleStyles[dispensedCapsuleIndex] || capsuleStyles[0];
  const dispensedCapsuleColor = dispensedCapsuleStyle.color;
  const dispensedCapsuleRot = dispensedCapsuleStyle.rot;
  const dispensedCapsuleVariant = dispensedCapsuleIndex % capsulePayloads.length;
  return /* @__PURE__ */ React.createElement("div", {
    className: "w-full relative py-4 md:py-6 flex flex-col items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full max-w-[480px] mx-auto z-10"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `relative rounded-[3rem] p-5 md:p-7 flex flex-col ${isSpinning ? "animate-rumble" : ""} motion-surface`,
    onMouseEnter: () => setMachineHovered(true),
    onMouseLeave: () => setMachineHovered(false),
    style: {
      background: machineHovered ? "linear-gradient(145deg, #ffffff 0%, #fbfbfc 56%, #f1f3f7 100%)" : "linear-gradient(145deg, #ffffff 0%, #fafafa 58%, #eef0f4 100%)",
      border: machineHovered ? "1px solid rgba(226,232,240,0.72)" : "1px solid rgba(255,255,255,0.95)",
      boxShadow: machineHovered ? "0 30px 64px -18px rgba(99,102,241,0.045), 0 0 0 1px rgba(226,232,240,0.58), inset 0 4px 18px rgba(255,255,255,0.82)" : "0 34px 86px -34px rgba(63,63,70,0.08), 0 0 0 1px rgba(255,255,255,0.72), inset 0 4px 18px rgba(255,255,255,0.92)"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-[252px] rounded-[2.5rem] rounded-b-2xl overflow-hidden mb-8 border border-white/50 cursor-pointer",
    role: "button",
    tabIndex: 0,
    "aria-label": lang2 === "en" ? "Shuffle capsules" : "\u6296\u843D\u626D\u86CB",
    onClick: shuffleCapsules,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        shuffleCapsules();
      }
    },
    style: {
      background: "radial-gradient(120% 120% at 50% 100%, rgba(255,255,255,0.16) 0%, rgba(220,232,255,0.12) 50%, rgba(255,255,255,0.52) 100%)",
      boxShadow: "inset 0 16px 32px rgba(255,255,255,0.95), inset 0 -8px 18px rgba(63,63,70,0.08), 0 12px 24px rgba(148,163,184,0.14)"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-[3%] left-[10%] right-[10%] height-[35%] h-[100px] bg-gradient-to-b from-white/90 to-transparent rounded-[50%_50%_20%_20%] transform -rotate-6 blur-[1px] pointer-events-none z-10"
  }), capsules.map((cap, i) => /* @__PURE__ */ React.createElement("div", {
    key: i,
    className: `group absolute w-12 h-12 transition-[left,top] duration-[820ms] ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer will-change-[left,top] ${isSpinning ? "animate-capsule-jostle" : ""}`,
    style: {
      left: cap.left,
      top: cap.top,
      transitionDelay: cap.delay
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: `relative w-full h-full motion-capsule ${capsulesAreShuffling ? "animate-capsule-settle" : ""}`,
    style: {
      animationDelay: cap.delay
    }
  }, /* @__PURE__ */ React.createElement(CapsuleShell, {
    color: cap.color,
    payloadGradient: cap.payloadGradient,
    payloadDot: cap.payloadDot,
    rot: cap.rot,
    variant: i
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: "relative z-10 flex items-start justify-center mb-2 px-0 gap-3 sm:gap-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex-[1.55] min-w-0 h-[224px] px-1 pt-6 pb-0 relative"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute -top-1 left-1 text-[10px] font-black text-zinc-500 tracking-[0.22em] uppercase"
  }, "TUNER"), /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto grid h-full w-full max-w-[300px] grid-cols-3 gap-x-8 sm:max-w-[360px] sm:gap-x-12"
  }, gachaDimensions.map((dim) => {
    const value = params[dim.id];
    const fillOffset = Math.abs(value - 50);
    const fillTop = value >= 50 ? 100 - value + "%" : "50%";
    const handleTop = 100 - value + "%";
    return /* @__PURE__ */ React.createElement("label", {
      key: dim.id,
      className: "min-w-0 h-full flex flex-col items-center justify-between text-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "h-6 -translate-y-1.5 flex items-end justify-center text-[7.8px] font-black uppercase tracking-[0.01em] text-zinc-500 leading-[1] max-w-[76px] break-words"
    }, t(dim.right)), /* @__PURE__ */ React.createElement("div", {
      className: "relative h-[152px] w-9 sm:w-11 flex items-center justify-center my-0.5 rounded-2xl touch-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/80 " + (activeTuner === dim.id ? "cursor-grabbing" : "cursor-grab"),
      role: "slider",
      tabIndex: 0,
      "aria-orientation": "vertical",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": value,
      "aria-label": t(dim.left) + " / " + t(dim.right),
      onPointerDown: (e) => beginTunerDrag(e, dim.id),
      onPointerMove: moveTunerDrag,
      onPointerUp: endTunerDrag,
      onPointerCancel: endTunerDrag,
      onLostPointerCapture: endTunerDrag,
      onKeyDown: (e) => handleTunerKeyDown(e, dim.id)
    }, /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-1/2 top-0 h-full w-2.5 -translate-x-1/2 rounded-full bg-zinc-300/80 shadow-[inset_0_2px_5px_rgba(63,63,70,0.18)] pointer-events-none"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-1/2 top-1/2 h-[1px] w-6 sm:w-7 -translate-x-1/2 bg-zinc-400/45 shadow-[0_1px_0_rgba(255,255,255,0.75)] pointer-events-none"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-1/2 w-2.5 -translate-x-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.45)] pointer-events-none",
      style: {
        top: fillTop,
        height: fillOffset + "%"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-1/2 z-10 h-6 w-9 sm:w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/80 bg-gradient-to-br from-white to-zinc-100 shadow-[0_6px_12px_rgba(63,63,70,0.18),inset_0_2px_5px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(63,63,70,0.08)] pointer-events-none",
      style: {
        top: handleTop
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-1/2 top-1/2 h-1.5 w-4 sm:w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.38)]"
    }))), /* @__PURE__ */ React.createElement("span", {
      className: "h-6 translate-y-1.5 flex items-start justify-center text-[7.8px] font-black uppercase tracking-[0.01em] text-zinc-500 leading-[1] max-w-[76px] break-words"
    }, t(dim.left)));
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "relative mt-6 w-28 md:w-32 h-[200px] flex shrink-0 flex-col items-center justify-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-24 h-24 md:w-[104px] md:h-[104px] flex items-center justify-center shrink-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full bg-purple-500/14 blur-lg"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-[3px] border-purple-100",
    style: {
      background: "conic-gradient(from 180deg at 50% 50%, #f8fafc, #ffffff, #eef0f4, #ffffff, #f8fafc)",
      boxShadow: "0 8px 20px rgba(99,102,241,0.13), inset 0 -4px 8px rgba(63,63,70,0.07), inset 0 4px 12px rgba(255,255,255,1)"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full border-[3px] border-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.34)] pointer-events-none"
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: generateResults,
    className: "relative w-[72px] h-[72px] md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center cursor-pointer motion-dial-button shadow-[0_12px_20px_rgba(0,0,0,0.13),inset_0_4px_8px_rgba(255,255,255,1)] " + (isSpinning ? "animate-spin-dial pointer-events-none" : gachaStatus !== "idle" ? "pointer-events-none opacity-90" : "")
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-9 h-3.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-700 shadow-[inset_0_3px_6px_rgba(0,0,0,0.42),0_2px_4px_rgba(255,255,255,0.8)]"
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "relative w-28 h-[86px] flex items-end justify-center shrink-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 rounded-t-xl rounded-b-md bg-gradient-to-b from-white to-zinc-100 border border-white/90 shadow-[0_3px_8px_rgba(148,163,184,0.16),inset_0_2px_4px_rgba(255,255,255,0.95)] z-10"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "relative w-24 h-14 rounded-t-md rounded-b-2xl bg-gradient-to-b from-zinc-100 to-zinc-300 overflow-visible flex items-end justify-center pb-1.5 shadow-[inset_0_8px_16px_rgba(113,113,122,0.22),0_3px_8px_rgba(255,255,255,0.82)] border border-white/80"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-3 right-3 h-3 bg-zinc-500/16 rounded-b-full blur-[1px]"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-x-4 bottom-2 h-5 rounded-full bg-white/35 blur-md"
  }), hasDispensedCapsule && /* @__PURE__ */ React.createElement("div", {
    className: "absolute left-1/2 top-1/2 z-20 w-12 h-12 -translate-x-1/2 -translate-y-1/2"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: openDispensedCapsule,
    disabled: gachaStatus !== "capsuleReady",
    "aria-label": lang2 === "en" ? "Open capsule" : "\u6253\u5F00\u626D\u86CB",
    className: "relative block w-12 h-12 rounded-full animate-capsule-exit motion-outlet-capsule focus:outline-none focus-visible:outline-none p-0 border-0 bg-transparent " + (gachaStatus === "capsuleReady" ? "cursor-pointer" : "pointer-events-none")
  }, /* @__PURE__ */ React.createElement(CapsuleShell, {
    color: dispensedCapsuleColor,
    payloadGradient: dispensedCapsuleStyle.payloadGradient,
    payloadDot: dispensedCapsuleStyle.payloadDot,
    rot: dispensedCapsuleRot,
    variant: dispensedCapsuleVariant,
    forceDomePayload: true
  }))))))), (gachaStatus === "loading" || gachaStatus === "results") && /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-50 flex items-center justify-center pointer-events-auto"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 bg-white/30 backdrop-blur-md rounded-[3.5rem] transition-opacity duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "relative z-10 w-[86%] max-w-[390px] h-[72%] min-h-[410px] max-h-[500px] flex flex-col items-center justify-center animate-fade-in-simple"
  }, gachaStatus === "opening" && /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full flex justify-center items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-32 h-32"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-0 w-full h-1/2 bg-white/50 backdrop-blur-md rounded-t-full border border-white/60 shadow-lg",
    style: {
      animation: "top-crack 0.4s 0.8s forwards"
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500 to-indigo-700 rounded-b-full border border-blue-400 shadow-2xl",
    style: {
      animation: "bottom-crack 0.4s 0.8s forwards"
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-[-50px] pointer-events-none rounded-[40px]",
    style: {
      animation: "flash-bang 0.6s 0.8s forwards"
    }
  })), gachaStatus === "loading" && /* @__PURE__ */ React.createElement(LoadingSynthesizer, {
    lang: lang2
  }), gachaStatus === "results" && /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-full flex flex-col bg-white rounded-3xl p-5 shadow-[0_42px_110px_-28px_rgba(63,63,70,0.10)] border border-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between mb-4 px-1 border-b border-gray-100 pb-3 shrink-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-3 h-3 rounded-full bg-purple-500 animate-pulse mr-3 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "text-xs font-bold text-purple-600 tracking-widest uppercase"
  }, lang2 === "en" ? "Project Match" : "\u5339\u914D\u7ED3\u679C")), /* @__PURE__ */ React.createElement("button", {
    onClick: resetGacha,
    className: "text-[10px] text-zinc-400 hover:text-zinc-900 uppercase font-bold tracking-wider transition-colors px-3 py-1 bg-gray-50 rounded-full hover:bg-gray-200"
  }, lang2 === "en" ? "Close" : "\u5173\u95ED")), /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-rows-3 gap-3 flex-1 min-h-0"
  }, results.map((res) => /* @__PURE__ */ React.createElement("div", {
    key: res.id,
    onClick: () => res.slug ? navigate("/project", {
      slug: res.slug
    }) : navigate("/" + res.category),
    onMouseEnter: () => {
      const path = res.slug ? "/project" : "/" + res.category;
      prefetchRoute(path);
      if (res.slug) prefetchProjectData(res.slug);
    },
    onFocus: () => {
      const path = res.slug ? "/project" : "/" + res.category;
      prefetchRoute(path);
      if (res.slug) prefetchProjectData(res.slug);
    },
    onTouchStart: () => {
      const path = res.slug ? "/project" : "/" + res.category;
      prefetchRoute(path);
      if (res.slug) prefetchProjectData(res.slug);
    },
    className: "bg-white rounded-2xl p-4 h-full min-h-0 flex justify-between items-center cursor-pointer hover:bg-blue-50 border border-gray-100 hover:border-blue-200 motion-surface group shadow-[0_1px_2px_rgba(0,0,0,0.015)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03),0_2px_4px_-2px_rgba(0,0,0,0.03)]"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "min-w-0 pr-3 overflow-hidden"
  }, /* @__PURE__ */ React.createElement("h4", {
    className: "text-sm md:text-base font-bold text-zinc-900 mb-1 leading-tight line-clamp-2"
  }, t(res.title)), /* @__PURE__ */ React.createElement("span", {
    className: "text-xs text-zinc-400"
  }, res.slug ? lang2 === "en" ? "Open project details" : "\u67E5\u770B\u9879\u76EE\u8BE6\u60C5" : lang2 === "en" ? "View category" : "\u67E5\u770B\u5206\u7C7B")), /* @__PURE__ */ React.createElement("div", {
    className: "w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white motion-color shrink-0 shadow-sm"
  }, /* @__PURE__ */ React.createElement(ArrowRight, {
    size: 18
  })))))))))));
};

export default InteractiveGacha;
