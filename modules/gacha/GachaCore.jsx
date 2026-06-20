// Gacha Core Component - Interactive Project Matcher

import React, { useState, useEffect, useContext, useRef } from 'react';
import { LanguageContext } from '@/js/i18n';
import { gachaDimensions, gachaProjectCatalog, gachaScoreKeys } from './gacha-data';
import './gacha-animations.css';

// Gacha Core Component (extracted from sonic-patrol-preview.html)
// NOTE: This component has been extracted from a 360KB single-file build.
// Some imports may need adjustment for the modular environment.

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
}

export default InteractiveGacha;
