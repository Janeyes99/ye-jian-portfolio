// ProjectDetail Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var ProjectDetail = () => {
  const {
    route,
    navigate
  } = useContext(RouteContext);
  const {
    t,
    lang: lang2
  } = useContext(LanguageContext);
  const slug = route.params?.slug;
  const project = projectsData.find((p) => p.slug === slug);
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [selectedDecathlonIndex, setSelectedDecathlonIndex] = useState(0);
  const [hoveredDecathlonIndex, setHoveredDecathlonIndex] = useState(0);
  const [riversideCanvasOpen, setRiversideCanvasOpen] = useState(false);
  const [riversideContentOpen, setRiversideContentOpen] = useState(false);
  const [riversideMusicPlaying, setRiversideMusicPlaying] = useState(false);
  const [riversideDragging, setRiversideDragging] = useState(false);
  const riversideScrollRef = React.useRef(null);
  const riversideCanvasRef = React.useRef(null);
  const riversideAudioRef = React.useRef(null);
  const riversideDragRef = React.useRef({
    active: false,
    startX: 0,
    scrollLeft: 0
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setCertificatePreview(null);
    setSelectedDecathlonIndex(0);
    setHoveredDecathlonIndex(0);
    setRiversideCanvasOpen(false);
    setRiversideContentOpen(false);
    setRiversideMusicPlaying(false);
    if (riversideAudioRef.current) {
      riversideAudioRef.current.pause();
      riversideAudioRef.current.currentTime = 0;
    }
    setRiversideDragging(false);
    riversideDragRef.current = {
      active: false,
      startX: 0,
      scrollLeft: 0
    };
  }, [slug]);
  if (!project) return /* @__PURE__ */ React.createElement("div", {
    className: "pt-40 text-center font-bold text-xl"
  }, lang2 === "en" ? "Project not found." : "\u672A\u627E\u5230\u9879\u76EE\u3002");
  const renderFigure = (src, alt, caption, index) => /* @__PURE__ */ React.createElement("figure", {
    key: index,
    className: "overflow-hidden rounded-[24px] border border-white/90 bg-white/70 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.10)]"
  }, /* @__PURE__ */ React.createElement("a", {
    href: src,
    target: "_blank",
    rel: "noreferrer",
    className: "block"
  }, /* @__PURE__ */ React.createElement("img", {
    src,
    alt: t(alt) || t(project.title),
    loading: project.slug === "passenger-screen-visual-impact" ? "eager" : "lazy",
    className: "w-full h-auto object-contain bg-white"
  })), caption && /* @__PURE__ */ React.createElement("figcaption", {
    className: "px-5 py-4 text-sm leading-relaxed text-zinc-500 border-t border-zinc-100"
  }, t(caption)));
  const renderPaperFigure = (src, alt, caption, index) => /* @__PURE__ */ React.createElement("figure", {
    key: index,
    className: "overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-[0_18px_46px_-32px_rgba(15,23,42,0.18)]"
  }, /* @__PURE__ */ React.createElement("a", {
    href: src,
    target: "_blank",
    rel: "noreferrer",
    className: "block bg-white"
  }, /* @__PURE__ */ React.createElement("img", {
    src,
    alt: t(alt) || t(project.title),
    loading: index === 0 ? "eager" : "lazy",
    className: "block w-full h-auto object-contain bg-white"
  })), caption && /* @__PURE__ */ React.createElement("figcaption", {
    className: "border-t border-zinc-100 bg-zinc-50/70 px-5 py-4 text-sm leading-relaxed text-zinc-500"
  }, t(caption)));
  const [pdfViewerPage, setPdfViewerPage] = useState(0);
  const renderPdfViewer = (pages, section) => {
    const current = pdfViewerPage;
    const total = pages.length;
    const goTo = (idx) => {
      if (idx >= 0 && idx < total) setPdfViewerPage(idx);
    };
    return /* @__PURE__ */ React.createElement("div", {
      className: "overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-[0_18px_42px_-28px_rgba(15,23,42,0.16)]"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "relative bg-zinc-950"
    }, /* @__PURE__ */ React.createElement("img", {
      src: pages[current].src,
      alt: pages[current].alt ? typeof pages[current].alt === "object" ? pages[current].alt.en || pages[current].alt.cn : pages[current].alt : "",
      loading: "lazy",
      className: "w-full h-auto object-contain max-h-[85vh] mx-auto"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center justify-between px-5 py-4 border-t border-zinc-100 bg-zinc-50/70"
    }, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => goTo(current - 1),
      disabled: current === 0,
      className: "rounded-full px-4 py-2 text-sm font-bold text-zinc-600 hover:bg-zinc-200 disabled:opacity-30 motion-surface"
    }, lang2 === "en" ? "\u2039 Prev" : "\u2039 \u4E0A\u4E00\u9875"), /* @__PURE__ */ React.createElement("span", {
      className: "text-sm font-medium text-zinc-500"
    }, current + 1, " / ", total), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => goTo(current + 1),
      disabled: current === total - 1,
      className: "rounded-full px-4 py-2 text-sm font-bold text-zinc-600 hover:bg-zinc-200 disabled:opacity-30 motion-surface"
    }, lang2 === "en" ? "Next \u203A" : "\u4E0B\u4E00\u9875 \u203A")));
  };
  const renderReportDivider = (sec, i) => {
    const dividerIndex = sec.divider === "analysis" ? 1 : sec.divider === "conclusions" ? 2 : 0;
    const dividerStyle = passengerReportDividerStyles[dividerIndex] || passengerReportDividerStyles[0];
    return /* @__PURE__ */ React.createElement("section", {
      key: i,
      className: "space-y-6"
    }, /* @__PURE__ */ React.createElement("div", {
      className: `rounded-[28px] border ${dividerStyle.accent} bg-white/86 px-6 py-8 md:px-8 md:py-10 shadow-[0_16px_42px_-34px_rgba(15,23,42,0.16)] backdrop-blur-xl`
    }, /* @__PURE__ */ React.createElement("div", {
      className: "mb-6 flex items-center gap-4"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "h-px flex-1 bg-zinc-200/80"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400"
    }, t(dividerStyle.badge)), /* @__PURE__ */ React.createElement("span", {
      className: "h-px flex-1 bg-zinc-200/80"
    })), /* @__PURE__ */ React.createElement("h3", {
      className: "text-center text-[clamp(1.35rem,2.4vw,2rem)] font-bold tracking-[-0.012em] text-zinc-900"
    }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", {
      className: "mx-auto mt-4 max-w-3xl text-center text-base md:text-lg leading-[1.7] text-zinc-600"
    }, t(sec.content))), sec.video && /* @__PURE__ */ React.createElement("figure", {
      className: "overflow-hidden rounded-[24px] border border-white/90 bg-zinc-950 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.16)]"
    }, /* @__PURE__ */ React.createElement("video", {
      controls: true,
      playsInline: true,
      preload: "metadata",
      className: "w-full aspect-video bg-zinc-950"
    }, /* @__PURE__ */ React.createElement("source", {
      src: sec.video,
      type: "video/mp4"
    })), sec.caption && /* @__PURE__ */ React.createElement("figcaption", {
      className: "px-5 py-4 text-sm leading-relaxed text-zinc-500 bg-white border-t border-zinc-100"
    }, t(sec.caption))), sec.image && renderFigure(sec.image, sec.imageAlt, sec.caption, i), sec.images?.length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-1 gap-5"
    }, sec.images.map((image, index) => renderFigure(image.src, image.alt, image.caption, `${i}-${index}`))));
  };
  const renderConfirmationDialogSection = (sec, i) => {
    const figures = sec.images?.length ? sec.images.map((image, index) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption,
      key: `${i}-${index}`
    })) : sec.image ? [{
      src: sec.image,
      alt: sec.imageAlt,
      caption: sec.caption,
      key: `${i}-0`
    }] : [];
    return /* @__PURE__ */ React.createElement("section", {
      key: i,
      className: figures.length > 0 ? "grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:gap-12 items-start" : "max-w-3xl"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "border-l-2 border-blue-500/70 pl-5 md:pl-6"
    }, /* @__PURE__ */ React.createElement("h3", {
      className: "text-[clamp(1.55rem,2.7vw,2.35rem)] font-bold text-zinc-900 leading-[1.12] tracking-[-0.012em]"
    }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", {
      className: "mt-5 text-base md:text-lg font-medium leading-[1.75] text-zinc-600 whitespace-pre-wrap"
    }, t(sec.content))), figures.length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-1 gap-5 min-w-0"
    }, figures.map((figure, index) => renderPaperFigure(figure.src, figure.alt, figure.caption, figure.key || index))));
  };
  const renderPortfolioMediaPanel = (sec, index) => /* @__PURE__ */ React.createElement("figure", {
    className: "overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-950 shadow-[0_22px_60px_-32px_rgba(15,23,42,0.36)]"
  }, (() => {
    const mediaNotes = t(sec.mediaNotes) || [];
    const visualBreakdown = t(sec.visualBreakdown) || [];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "relative aspect-video bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.26),transparent_34%),linear-gradient(135deg,#0b0b0b,#171717_48%,#050505)]"
    }, sec.image ? /* @__PURE__ */ React.createElement("img", {
      src: sec.image,
      alt: t(sec.imageAlt) || t(sec.mediaLabel) || t(sec.title),
      loading: "lazy",
      className: "h-full w-full object-cover"
    }) : /* @__PURE__ */ React.createElement("div", {
      className: "absolute inset-0 flex flex-col justify-between p-6 md:p-8"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center justify-between gap-4"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65"
    }, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", {
      className: "text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/70"
    }, "Visual Frame")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
      className: "mb-4 max-w-[18rem] text-[clamp(1.35rem,2.2vw,2rem)] font-bold leading-[1.08] tracking-[-0.012em] text-white"
    }, t(sec.mediaLabel)), mediaNotes.length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-wrap gap-2"
    }, mediaNotes.map((note, noteIndex) => /* @__PURE__ */ React.createElement("span", {
      key: noteIndex,
      className: "rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-[11px] font-semibold text-white/72"
    }, note)))))), visualBreakdown.length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-1 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3"
    }, visualBreakdown.map((item, itemIndex) => /* @__PURE__ */ React.createElement("div", {
      key: itemIndex,
      className: "bg-zinc-950 px-4 py-4"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200/55"
    }, lang2 === "en" ? `Visual ${itemIndex + 1}` : `\u753B\u9762 ${itemIndex + 1}`), /* @__PURE__ */ React.createElement("p", {
      className: "text-sm font-semibold leading-snug text-white/82"
    }, item)))), sec.caption && /* @__PURE__ */ React.createElement("figcaption", {
      className: "border-t border-white/10 bg-white px-5 py-4 text-sm leading-relaxed text-zinc-500"
    }, t(sec.caption)));
  })());
  const handleRiversideMusicToggle = async (event) => {
    event?.stopPropagation?.();
    const audio = riversideAudioRef.current;
    if (!audio) return;
    if (!audio.paused && !audio.ended) {
      audio.pause();
      setRiversideMusicPlaying(false);
      return;
    }
    try {
      audio.muted = false;
      audio.volume = 1;
      if (audio.readyState < 2) audio.load();
      await audio.play();
      setRiversideMusicPlaying(true);
    } catch {
      setRiversideMusicPlaying(false);
    }
  };
  const scrollRiversideVerticalTo = (targetRatio = riversideExpandedStartRatio) => {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        if (!riversideScrollRef.current) return;
        const canvasSize = riversideScrollRef.current.clientWidth || 720;
        riversideScrollRef.current.scrollTop = Math.round(targetRatio * canvasSize);
      });
    }, 120);
  };
  const scrollRiversideHorizontalTo = (targetRatio = riversideExpandedStartRatio) => {
    window.setTimeout(() => {
      if (!riversideScrollRef.current) return;
      const canvasSize = riversideScrollRef.current.clientHeight || 720;
      riversideScrollRef.current.scrollLeft = Math.round(targetRatio * canvasSize);
    }, 80);
  };
  const handleRiversideContentOpen = () => {
    setRiversideContentOpen(true);
    setRiversideCanvasOpen(false);
    window.setTimeout(() => {
      riversideCanvasRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
    scrollRiversideVerticalTo(riversideExpandedStartRatio);
  };
  const handleRiversideCanvasOpen = () => {
    setRiversideContentOpen(true);
    setRiversideCanvasOpen(true);
    window.setTimeout(() => {
      riversideCanvasRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
    scrollRiversideHorizontalTo(riversideExpandedStartRatio);
  };
  const handleRiversideCanvasClose = (targetRatio = riversideExpandedStartRatio) => {
    setRiversideCanvasOpen(false);
    setRiversideDragging(false);
    riversideDragRef.current = {
      active: false,
      startX: 0,
      scrollLeft: 0
    };
    window.setTimeout(() => {
      riversideCanvasRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
    scrollRiversideVerticalTo(targetRatio);
  };
  const handleRiversideDragStart = (event) => {
    const scroller = riversideScrollRef.current;
    if (!scroller) return;
    riversideDragRef.current = {
      active: true,
      startX: event.pageX - scroller.offsetLeft,
      scrollLeft: scroller.scrollLeft
    };
    setRiversideDragging(true);
  };
  const handleRiversideDragMove = (event) => {
    const scroller = riversideScrollRef.current;
    if (!scroller || !riversideDragRef.current.active) return;
    event.preventDefault();
    const x = event.pageX - scroller.offsetLeft;
    const walk = x - riversideDragRef.current.startX;
    scroller.scrollLeft = riversideDragRef.current.scrollLeft - walk;
  };
  const handleRiversideDragEnd = () => {
    riversideDragRef.current.active = false;
    setRiversideDragging(false);
  };
  const renderRiversideStackFrame = (frame, index) => {
    const image = /* @__PURE__ */ React.createElement("img", {
      src: frame.src,
      alt: t(frame.alt),
      width: frame.width,
      height: frame.height,
      loading: index < 4 ? "eager" : "lazy",
      draggable: false,
      className: "block h-auto w-full select-none bg-white",
      style: {
        marginTop: index === 0 ? 0 : "-1px"
      }
    });
    const isMusicFrame = frame.src === riversideEntryFrames[0].src;
    const isExpandFrame = frame.src === riversideEntryFrames[1].src;
    const isRotateFrame = frame.src === riversideRotateFrame.src;
    const action = isMusicFrame ? {
      onClick: handleRiversideMusicToggle,
      label: t(frame.alt)
    } : isExpandFrame && !riversideContentOpen ? {
      onClick: handleRiversideContentOpen,
      label: t(frame.alt)
    } : isRotateFrame && riversideCanvasOpen ? {
      onClick: () => handleRiversideCanvasClose(),
      label: lang2 === "en" ? "Return to vertical view" : "\u8FD4\u56DE\u7AD6\u5411\u753B\u5E03"
    } : isRotateFrame && !riversideCanvasOpen && riversideContentOpen ? {
      onClick: () => handleRiversideCanvasOpen(),
      label: t(frame.alt)
    } : frame.returnToVertical && riversideCanvasOpen ? {
      onClick: () => handleRiversideCanvasClose(),
      label: lang2 === "en" ? "Return to vertical view" : "\u8FD4\u56DE\u7AD6\u5411\u753B\u5E03"
    } : null;
    return /* @__PURE__ */ React.createElement("div", {
      key: frame.src,
      className: "m-0 block bg-white p-0"
    }, action ? /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: action.onClick || void 0,
      className: "block w-full cursor-pointer p-0 text-left",
      "aria-label": action.label
    }, image) : frame.url ? /* @__PURE__ */ React.createElement("a", {
      href: frame.url,
      target: "_blank",
      rel: "noreferrer",
      className: "block h-full w-full cursor-pointer"
    }, image) : image);
  };
  const renderRiversideArticleStack = (frames) => /* @__PURE__ */ React.createElement("div", {
    className: "m-0 block w-full bg-white p-0 leading-none"
  }, frames.map(renderRiversideStackFrame));
  const renderRiversideDetail = () => {
    const riversideCanvasPx = Math.min(720, Math.max(280, window.innerWidth - 48));
    const riversideCanvasSize = `${riversideCanvasPx}px`;
    const horizontalCanvasWidth = `${Math.round(riversideArticleRatio * riversideCanvasPx)}px`;
    const verticalFrames = riversideContentOpen ? riversideArticleFrames : riversideEntryFrames;
    return /* @__PURE__ */ React.createElement("section", {
      className: "space-y-6"
    }, /* @__PURE__ */ React.createElement("audio", {
      ref: riversideAudioRef,
      preload: "auto",
      onEnded: () => setRiversideMusicPlaying(false),
      onPlay: () => setRiversideMusicPlaying(true),
      onPause: () => setRiversideMusicPlaying(false),
      controls: true,
      className: "hidden"
    }, /* @__PURE__ */ React.createElement("source", {
      src: riversideMusicSrc,
      type: "audio/mpeg"
    })), /* @__PURE__ */ React.createElement("div", {
      ref: riversideCanvasRef,
      className: "relative overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_22px_60px_-42px_rgba(15,23,42,0.24)]",
      style: !riversideCanvasOpen ? {
        width: riversideCanvasSize,
        height: riversideContentOpen ? riversideCanvasSize : void 0,
        marginLeft: "auto",
        marginRight: "auto"
      } : void 0
    }, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: handleRiversideMusicToggle,
      className: "absolute right-4 top-4 z-20 rounded-full border border-white/70 bg-black/72 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.13em] text-white shadow-[0_10px_26px_-18px_rgba(0,0,0,0.65)] backdrop-blur-md hover:bg-black/82 motion-surface",
      "aria-label": riversideMusicPlaying ? lang2 === "en" ? "Pause music" : "\u6682\u505C\u97F3\u4E50" : lang2 === "en" ? "Play music" : "\u64AD\u653E\u97F3\u4E50"
    }, riversideMusicPlaying ? lang2 === "en" ? "Pause music" : "\u6682\u505C\u97F3\u4E50" : lang2 === "en" ? "Play music" : "\u64AD\u653E\u97F3\u4E50"), !riversideCanvasOpen ? /* @__PURE__ */ React.createElement("div", {
      ref: riversideContentOpen ? riversideScrollRef : null,
      className: `${riversideContentOpen ? "h-full overflow-y-auto" : "overflow-hidden"} bg-white leading-none`,
      style: riversideContentOpen ? {
        scrollbarWidth: "none"
      } : void 0
    }, renderRiversideArticleStack(verticalFrames)) : /* @__PURE__ */ React.createElement("div", {
      ref: riversideScrollRef,
      onMouseDown: handleRiversideDragStart,
      onMouseMove: handleRiversideDragMove,
      onMouseUp: handleRiversideDragEnd,
      onMouseLeave: handleRiversideDragEnd,
      className: `flex gap-0 overflow-x-auto bg-white select-none ${riversideDragging ? "cursor-grabbing" : "cursor-grab"}`,
      style: {
        scrollbarWidth: "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "relative shrink-0 bg-white",
      style: {
        width: horizontalCanvasWidth,
        height: riversideCanvasSize
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-0 top-0 origin-top-left bg-white leading-none",
      style: {
        width: riversideCanvasSize,
        transform: "rotate(-90deg) translateX(-100%)",
        transformOrigin: "top left"
      }
    }, renderRiversideArticleStack(riversideArticleFrames))))));
  };
  const renderTouchNGoDetail = () => {
    const [intro, method, designTool, applications, wallOrganizer, documentation, outcome] = project.sections;
    const renderEditorialFigure = (item, key, className = "", imageClassName = "w-full h-auto object-contain") => /* @__PURE__ */ React.createElement("figure", { key, className: `touch-media overflow-hidden rounded-[24px] border border-zinc-200/65 bg-white/78 shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)] ${className}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setCertificatePreview(item.previewSrc || item.src || item.image),
        className: "block w-full cursor-zoom-in overflow-hidden bg-white text-left",
        "aria-label": lang2 === "en" ? "Open image preview" : "\u653E\u5927\u67E5\u770B\u56FE\u7247"
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: item.src || item.image,
          alt: t(item.alt || item.imageAlt) || t(project.title),
          loading: "lazy",
          className: imageClassName
        }
      )
    ), item.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(item.caption)));
    return /* @__PURE__ */ React.createElement("div", { className: "pt-32 md:pt-36 pb-28 px-5 md:px-8 animate-fade-up" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1320px]" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigate(`/${project.category}`),
        className: "mb-12 inline-flex items-center rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.25)] motion-surface hover:border-zinc-300 hover:bg-zinc-100/80 hover:text-zinc-900"
      },
      /* @__PURE__ */ React.createElement(MoveLeft, { size: 15, className: "mr-2" }),
      lang2 === "en" ? "Back" : "\u8FD4\u56DE"
    ), /* @__PURE__ */ React.createElement("header", { className: "grid grid-cols-1 gap-10 border-b border-zinc-200/80 pb-12 md:pb-16 lg:grid-cols-12 lg:gap-12" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-8" }, /* @__PURE__ */ React.createElement("div", { className: "mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, /* @__PURE__ */ React.createElement("span", null, project.year), (t(project.tags) || []).map((tag, index) => /* @__PURE__ */ React.createElement("span", { key: index, className: "before:mr-4 before:text-zinc-300 before:content-['/']" }, tag))), /* @__PURE__ */ React.createElement("h1", { className: "max-w-4xl text-[clamp(2.75rem,7vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-zinc-950" }, t(project.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-8 max-w-[48rem] text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-[1.5] tracking-[-0.012em] text-zinc-500" }, t(project.subtitle))), /* @__PURE__ */ React.createElement("aside", { className: "flex flex-col justify-end gap-7 lg:col-span-4 lg:border-l lg:border-zinc-200/80 lg:pl-9" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, lang2 === "en" ? "Contribution" : "\u9879\u76EE\u8D21\u732E"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold leading-[1.65] text-zinc-700" }, t(project.role))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, lang2 === "en" ? "Practice" : "\u5B9E\u8DF5\u8303\u56F4"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium leading-[1.65] text-zinc-500" }, translateList(project.tools, lang2).join(" \xB7 "))), project.links?.map((link, index) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: index,
        href: link.url,
        target: "_blank",
        rel: "noreferrer",
        className: "inline-flex w-fit items-center gap-3 border-b border-zinc-900 pb-1 text-sm font-bold text-zinc-900 motion-color hover:border-blue-600 hover:text-blue-600"
      },
      t(link.label),
      /* @__PURE__ */ React.createElement(ArrowRight, { size: 15 })
    )))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-10 md:mt-14" }, /* @__PURE__ */ React.createElement("figure", { className: "overflow-hidden rounded-[26px] border border-zinc-800/20 bg-zinc-950 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)]" }, /* @__PURE__ */ React.createElement("video", { controls: true, playsInline: true, preload: "metadata", className: "block w-full aspect-video bg-zinc-950" }, /* @__PURE__ */ React.createElement("source", { src: intro.video, type: "video/mp4" })), /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-relaxed text-zinc-400 md:px-7" }, t(intro.caption)))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal grid grid-cols-1 gap-10 pb-20 pt-36 md:pb-28 md:pt-44 lg:grid-cols-12 lg:items-center lg:gap-16" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "01 / ", lang2 === "en" ? "Overview" : "\u9879\u76EE\u6982\u89C8"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(intro.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-[36rem] text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(intro.content))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 lg:pl-4" }, renderEditorialFigure(
      { image: project.coverImage, imageAlt: project.title },
      "touch-cover",
      "bg-zinc-50",
      "block w-full aspect-[4/3] object-cover"
    ))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal border-y border-zinc-200/80 py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "02 / ", lang2 === "en" ? "System" : "\u7CFB\u7EDF\u65B9\u6CD5"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(method.title))), /* @__PURE__ */ React.createElement("p", { className: "max-w-[42rem] text-base font-medium leading-[1.82] text-zinc-600 md:text-lg lg:col-span-7 lg:justify-self-end" }, t(method.content))), renderEditorialFigure(
      { image: method.image, imageAlt: method.imageAlt, caption: method.caption },
      "touch-method",
      "w-full",
      "block w-full h-auto object-contain"
    )), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mx-auto max-w-[1160px] py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "03 / ", lang2 === "en" ? "Design Tool" : "\u8BBE\u8BA1\u5DE5\u5177"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(designTool.title))), /* @__PURE__ */ React.createElement("p", { className: "max-w-[42rem] text-base font-medium leading-[1.82] text-zinc-600 md:text-lg lg:col-span-7 lg:justify-self-end" }, t(designTool.content))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 items-start gap-4 md:grid-cols-[0.742fr_1fr]" }, renderEditorialFigure(
      {
        image: "assets/portfolio/touch-n-go/design-tool-ab.png",
        imageAlt: designTool.imageAlt
      },
      "touch-tool-ab",
      "w-full bg-zinc-50",
      "block w-full h-auto object-contain"
    ), renderEditorialFigure(
      {
        image: "assets/portfolio/touch-n-go/design-tool-cd.png",
        imageAlt: designTool.imageAlt
      },
      "touch-tool-cd",
      "w-full bg-zinc-50",
      "block w-full h-auto object-contain"
    )), designTool.caption && /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-sm leading-[1.65] text-zinc-500" }, t(designTool.caption))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal rounded-[30px] bg-zinc-100/70 px-5 py-16 md:px-10 md:py-24 lg:px-14" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto mb-12 max-w-3xl text-center" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "04 / ", lang2 === "en" ? "Applications" : "\u5E94\u7528\u8BBE\u8BA1"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(applications.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(applications.content))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-4" }, renderEditorialFigure(
      applications.images[0],
      "touch-app-0",
      "h-full bg-white",
      "block h-auto w-full object-contain"
    )), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-8" }, renderEditorialFigure(
      applications.images[1],
      "touch-app-1",
      "h-full bg-white",
      "block h-auto w-full object-contain"
    )))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "05 / ", lang2 === "en" ? "Core Case" : "\u6838\u5FC3\u6848\u4F8B"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(wallOrganizer.title))), /* @__PURE__ */ React.createElement("p", { className: "max-w-[42rem] text-base font-medium leading-[1.82] text-zinc-600 md:text-lg lg:col-span-7 lg:justify-self-end" }, t(wallOrganizer.content))), /* @__PURE__ */ React.createElement("div", null, renderEditorialFigure(
      { image: wallOrganizer.image, imageAlt: wallOrganizer.imageAlt, caption: wallOrganizer.caption },
      "touch-wall",
      "bg-zinc-50",
      "block w-full h-auto object-contain"
    ))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal border-y border-zinc-200/80 py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mb-10 max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "06 / ", lang2 === "en" ? "Documentation" : "\u5F71\u50CF\u8BB0\u5F55"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(documentation.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(documentation.content))), renderEditorialFigure(
      { image: documentation.image, imageAlt: documentation.imageAlt, caption: documentation.caption },
      "touch-documentation",
      "w-full bg-zinc-50"
    )), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal grid grid-cols-1 gap-10 pt-20 md:pt-28 lg:grid-cols-12 lg:items-center lg:gap-16" }, /* @__PURE__ */ React.createElement("div", { className: "order-2 lg:order-1 lg:col-span-5" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "07 / ", lang2 === "en" ? "Outcome" : "\u7814\u7A76\u7ED3\u679C"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(outcome.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(outcome.content))), /* @__PURE__ */ React.createElement("div", { className: "order-1 lg:order-2 lg:col-span-7" }, renderEditorialFigure(
      { image: outcome.image, imageAlt: outcome.imageAlt, caption: outcome.caption },
      "touch-outcome",
      "bg-zinc-50"
    ))), certificatePreview && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm animate-fade-in-simple md:p-8",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": lang2 === "en" ? "Image preview" : "\u56FE\u7247\u9884\u89C8",
        onClick: () => setCertificatePreview(null)
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "relative flex max-h-[92vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-[24px] bg-white p-2 shadow-[0_32px_100px_-24px_rgba(0,0,0,0.5)] md:p-3",
          onClick: (event) => event.stopPropagation()
        },
        /* @__PURE__ */ React.createElement(
          "img",
          {
            src: certificatePreview,
            alt: t(project.title),
            className: "block max-h-[88vh] max-w-[90vw] object-contain"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setCertificatePreview(null),
            className: "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/92 text-zinc-600 shadow-sm motion-surface hover:bg-zinc-100 hover:text-zinc-950",
            "aria-label": lang2 === "en" ? "Close image preview" : "\u5173\u95ED\u56FE\u7247\u9884\u89C8"
          },
          /* @__PURE__ */ React.createElement(X, { size: 18 })
        )
      )
    )));
  };
  if (project.slug === "touch-n-go") return renderTouchNGoDetail();
  const heroVideoBySlug = {
    "snap-inflatables": "assets/portfolio/snap-inflatables/demo.mp4",
    thermosilicone: "assets/portfolio/thermosilicone/demo.mp4",
    "path-tracking-apparatus": "assets/portfolio/path/demo.mp4",
    "artificial-sky": "assets/portfolio/artificial-sky/demo.mp4",
    "sonic-patrol": "assets/portfolio/sonic-patrol/grand-challenge.mp4",
    "coins-in-the-sky": "assets/portfolio/coins-in-the-sky/hero-video.mp4"
  };
  const primaryVideo = heroVideoBySlug[project.slug] || null;
  const primaryVideoSection = primaryVideo ? project.sections.find((section) => section.video === primaryVideo) : null;
  const activeCertificate = project.sections.find((section) => section.certificate?.src === certificatePreview);
  const renderEditorialImage = (item, key, options = {}) => {
    const src = item?.src || item?.image;
    if (!src) return null;
    const imageClassName = options.imageClassName || "block h-auto max-h-[76vh] w-full object-contain";
    return /* @__PURE__ */ React.createElement(
      "figure",
      {
        key,
        className: `touch-media flex h-full flex-col overflow-hidden rounded-[24px] border border-zinc-200/65 bg-white/78 shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)] ${options.className || ""}`
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: () => setCertificatePreview(src),
          className: `flex min-h-0 w-full flex-1 cursor-zoom-in items-center justify-center overflow-hidden bg-zinc-50/70 text-left ${options.mediaClassName || ""}`,
          "aria-label": lang2 === "en" ? "Open image preview" : "\u653E\u5927\u67E5\u770B\u56FE\u7247"
        },
        /* @__PURE__ */ React.createElement(
          "img",
          {
            src,
            alt: t(item.alt || item.imageAlt) || t(project.title),
            loading: options.eager ? "eager" : "lazy",
            className: imageClassName
          }
        )
      ),
      item.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 bg-white/88 px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(item.caption))
    );
  };
  const renderEditorialVideo = (video, caption, key, options = {}) => /* @__PURE__ */ React.createElement(
    "figure",
    {
      key,
      className: `touch-media overflow-hidden rounded-[26px] border border-zinc-800/20 bg-zinc-950 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)] ${options.className || ""}`
    },
    /* @__PURE__ */ React.createElement("video", { controls: true, playsInline: true, preload: "metadata", className: "block w-full aspect-video bg-zinc-950" }, /* @__PURE__ */ React.createElement("source", { src: video, type: "video/mp4" })),
    caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-relaxed text-zinc-400 md:px-7" }, t(caption))
  );
  const renderEditorialMediaPanel = (sec, index) => {
    const mediaNotes = t(sec.mediaNotes) || [];
    const visualBreakdown = t(sec.visualBreakdown) || [];
    return /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[24px] border border-zinc-200/65 bg-white/82 shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)]" }, /* @__PURE__ */ React.createElement("div", { className: "relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(59,130,246,0.10),transparent_38%),linear-gradient(135deg,#f8fafc,#ffffff_48%,#eef2ff)]" }, sec.image ? /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setCertificatePreview(sec.image),
        className: "block h-full w-full cursor-zoom-in",
        "aria-label": lang2 === "en" ? "Open image preview" : "\u653E\u5927\u67E5\u770B\u56FE\u7247"
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: sec.image,
          alt: t(sec.imageAlt) || t(sec.mediaLabel) || t(sec.title),
          loading: "lazy",
          className: "h-full w-full object-cover"
        }
      )
    ) : /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col justify-between p-6 md:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "rounded-full border border-zinc-200 bg-white/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500" }, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600/70" }, lang2 === "en" ? "Visual frame" : "\u89C6\u89C9\u6846\u67B6")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-4 max-w-[20rem] text-[clamp(1.35rem,2.5vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900" }, t(sec.mediaLabel)), mediaNotes.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, mediaNotes.map((note, noteIndex) => /* @__PURE__ */ React.createElement("span", { key: noteIndex, className: "rounded-full border border-zinc-200 bg-white/82 px-3 py-1.5 text-[11px] font-semibold text-zinc-600" }, note)))))), visualBreakdown.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-px border-t border-zinc-100 bg-zinc-100 sm:grid-cols-3" }, visualBreakdown.map((item, itemIndex) => /* @__PURE__ */ React.createElement("div", { key: itemIndex, className: "bg-white px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400" }, lang2 === "en" ? `Visual ${itemIndex + 1}` : `\u753B\u9762 ${itemIndex + 1}`), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold leading-snug text-zinc-700" }, typeof item === "object" ? t(item) : item)))), sec.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 bg-white px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(sec.caption)));
  };
  const renderSectionText = (sec, index) => {
    const annotationItems = t(sec.annotations) || [];
    const textBlocks = t(sec.textBlocks) || [];
    return /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(index + 1).padStart(2, "0"), " / ", t(sec.title)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, /* @__PURE__ */ React.createElement("h2", { className: "max-w-[46rem] text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(sec.title)), sec.certificate && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setCertificatePreview((prev) => prev === sec.certificate.src ? null : sec.certificate.src),
        className: "inline-flex w-fit shrink-0 items-center gap-2 border-b border-zinc-400 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 motion-color hover:border-blue-600 hover:text-blue-600"
      },
      certificatePreview === sec.certificate.src ? lang2 === "en" ? "Hide certificate" : "\u6536\u8D77\u8BC1\u4E66" : t(sec.certificate.label),
      /* @__PURE__ */ React.createElement(ArrowRight, { size: 14, className: certificatePreview === sec.certificate.src ? "rotate-90" : "" })
    )), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-[42rem] whitespace-pre-wrap text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(sec.content)), textBlocks.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" }, textBlocks.map((block, blockIndex) => /* @__PURE__ */ React.createElement("div", { key: blockIndex, className: "border-t border-zinc-200 pt-4" }, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400" }, t(block.label)), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium leading-[1.7] text-zinc-600" }, t(block.body))))), annotationItems.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "mt-8 space-y-3 border-t border-zinc-200 pt-5" }, annotationItems.map((item, itemIndex) => /* @__PURE__ */ React.createElement("li", { key: itemIndex, className: "flex gap-3 text-sm font-medium leading-[1.7] text-zinc-600" }, /* @__PURE__ */ React.createElement("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" }), /* @__PURE__ */ React.createElement("span", null, item)))), sec.certificate && certificatePreview === sec.certificate.src && /* @__PURE__ */ React.createElement("div", { className: "mt-7 overflow-hidden rounded-[22px] border border-zinc-200/80 bg-white/90 p-3 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.18)] animate-fade-up" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 flex items-center justify-between gap-4 px-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase tracking-[0.14em] text-zinc-500" }, t(sec.certificate.alt)), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setCertificatePreview(null),
        className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 motion-surface hover:bg-zinc-100 hover:text-zinc-900",
        "aria-label": lang2 === "en" ? "Close preview" : "\u5173\u95ED\u9884\u89C8"
      },
      /* @__PURE__ */ React.createElement(X, { size: 16 })
    )), /* @__PURE__ */ React.createElement("a", { href: sec.certificate.src, target: "_blank", rel: "noreferrer", className: "block overflow-hidden rounded-[16px] bg-zinc-50" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: sec.certificate.src,
        alt: t(sec.certificate.alt),
        loading: "lazy",
        className: "max-h-[68vh] w-full object-contain bg-white"
      }
    ))));
  };
  const renderSectionMedia = (sec, index) => {
    const showVideo = sec.video && sec.video !== primaryVideo;
    const images = [
      ...sec.image ? [{ src: sec.image, alt: sec.imageAlt, caption: sec.caption }] : [],
      ...sec.images || []
    ];
    const mediaItems = [];
    if (showVideo) {
      mediaItems.push(renderEditorialVideo(sec.video, sec.caption, `video-${index}`));
    }
    if (sec.mediaLabel) {
      mediaItems.push(/* @__PURE__ */ React.createElement("div", { key: `panel-${index}` }, renderEditorialMediaPanel(sec, index)));
    } else if (images.length === 1) {
      mediaItems.push(
        renderEditorialImage(images[0], `image-${index}-0`, {
          className: "w-full",
          imageClassName: "block h-auto max-h-[76vh] w-full object-contain"
        })
      );
    } else if (images.length === 2) {
      mediaItems.push(
        /* @__PURE__ */ React.createElement("div", { key: `images-${index}`, className: "grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch" }, images.map((image, imageIndex) => renderEditorialImage(image, `image-${index}-${imageIndex}`, {
          className: "min-h-0",
          mediaClassName: "aspect-[4/3]",
          imageClassName: "block h-full w-full object-contain"
        })))
      );
    } else if (images.length > 2) {
      mediaItems.push(
        /* @__PURE__ */ React.createElement("div", { key: `images-${index}`, className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, imageIndex) => renderEditorialImage(image, `image-${index}-${imageIndex}`, {
          className: imageIndex === 0 && images.length % 2 === 1 ? "md:col-span-2" : "",
          mediaClassName: imageIndex === 0 && images.length % 2 === 1 ? "max-h-[76vh]" : "aspect-[4/3]",
          imageClassName: imageIndex === 0 && images.length % 2 === 1 ? "block h-auto max-h-[76vh] w-full object-contain" : "block h-full w-full object-contain"
        })))
      );
    }
    return mediaItems.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "min-w-0 space-y-5" }, mediaItems) : null;
  };
  const renderEditorialSection = (sec, index) => {
    const media = renderSectionMedia(sec, index);
    const isDivider = Boolean(sec.divider);
    const text = renderSectionText(sec, index);
    if (isDivider) {
      return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-y border-zinc-200/80 py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-4xl text-center" }, text), media && /* @__PURE__ */ React.createElement("div", { className: "mt-10" }, media));
    }
    if (!media) {
      return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-t border-zinc-200/80 py-20 first:border-t-0 first:pt-36 md:py-28 md:first:pt-44" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl" }, text));
    }
  const useFullWidthMedia = Boolean(sec.fullWidthMedia || sec.images?.length > 1 || sec.video && sec.video !== primaryVideo || sec.mediaLabel);
    return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-t border-zinc-200/80 py-20 first:border-t-0 first:pt-36 md:py-28 md:first:pt-44" }, useFullWidthMedia ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end lg:gap-14" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-10" }, text)), media) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, text), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7" }, media)));
  };
  const renderArtificialSkyDetail = () => {
    const bodySections = project.sections.filter((sec) => sec.title && sec.video !== primaryVideo);
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-20 md:space-y-24" }, bodySections.map((sec, i) => {
      const sectionNumber = String(i + 1).padStart(2, "0");
      if (sec.layout === "pdf-viewer" && sec.pdfPages?.length) {
        return /* @__PURE__ */ React.createElement("section", { key: `artificial-${i}`, className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, sectionNumber), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold tracking-[-0.02em] leading-[1.08] text-zinc-900" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base md:text-lg leading-[1.8] font-medium text-zinc-600 whitespace-pre-wrap" }, t(sec.content))), renderPdfViewer(sec.pdfPages, sec));
      }
      const images = sec.images || [];
      const hasWideImage = Boolean(sec.image);
      return /* @__PURE__ */ React.createElement("section", { key: `artificial-${i}`, className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, sectionNumber), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold tracking-[-0.02em] leading-[1.08] text-zinc-900" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base md:text-lg leading-[1.8] font-medium text-zinc-600 whitespace-pre-wrap" }, t(sec.content))), hasWideImage && renderFigure(sec.image, sec.imageAlt, sec.caption, `artificial-image-${i}`), images.length === 4 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, index) => /* @__PURE__ */ React.createElement("figure", { key: `artificial-grid-${i}-${index}`, className: "overflow-hidden rounded-[26px] border border-white/90 bg-white/70 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.14)]" }, /* @__PURE__ */ React.createElement("a", { href: image.src, target: "_blank", rel: "noreferrer", className: "block" }, /* @__PURE__ */ React.createElement("img", { src: image.src, alt: t(image.alt) || t(sec.title), loading: "lazy", className: "block h-full w-full object-cover aspect-[4/3] bg-white" })))), sec.caption && /* @__PURE__ */ React.createElement("p", { className: "max-w-[58ch] text-sm leading-[1.7] text-zinc-500" }, t(sec.caption))), images.length === 2 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, index) => renderFigure(image.src, image.alt, image.caption, `artificial-pair-${i}-${index}`))));
    }));
  };
  const renderPassengerScreenReportDetail = () => {
    const chapters = [{
      title: {
        en: "Research Framing",
        cn: "\u7814\u7A76\u95EE\u9898\u4E0E\u5B9E\u9A8C\u6846\u67B6"
      },
      description: {
        en: "The study begins by defining the research question, mapping the full experiment workflow, and reviewing visual-field references that shape the test conditions.",
        cn: "\u7814\u7A76\u9996\u5148\u660E\u786E\u526F\u9A7E\u5C4F\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u753B\u5E45\u662F\u5426\u5F71\u54CD\u9A7E\u9A76\u6CE8\u610F\u529B\uFF0C\u518D\u68B3\u7406\u5B8C\u6574\u5B9E\u9A8C\u8DEF\u5F84\uFF0C\u5E76\u901A\u8FC7\u89C6\u91CE\u4E0E\u8F66\u578B\u8D44\u6599\u754C\u5B9A\u6D4B\u8BD5\u6761\u4EF6\u3002"
      },
      pages: [{
        page: 3,
        title: { en: "Research Question", cn: "\u5B9E\u9A8C\u8BC9\u6C42" },
        content: {
          en: "The core question is whether passenger-screen video placement affects a driver\u2019s ability to maintain attention, and whether different frame sizes produce different levels of distraction.",
          cn: "\u6838\u5FC3\u95EE\u9898\u662F\uFF1A\u526F\u9A7E\u5C4F\u5F71\u50CF\u7684\u4F4D\u7F6E\u662F\u5426\u4F1A\u5F71\u54CD\u9A7E\u9A76\u5458\u4FDD\u6301\u6B63\u5E38\u9A7E\u9A76\u6CE8\u610F\u529B\uFF0C\u4EE5\u53CA\u4E0D\u540C\u5F71\u50CF\u753B\u5E45\u662F\u5426\u4F1A\u4EA7\u751F\u4E0D\u540C\u7A0B\u5EA6\u7684\u89C6\u89C9\u5E72\u6270\u3002"
        }
      }, {
        page: 4,
        title: { en: "Study Roadmap", cn: "\u5B9E\u9A8C\u601D\u8DEF" },
        content: {
          en: "The report separates the work into three connected stages: experiment design, experiment execution, and data analysis. Each stage defines its own research inputs, procedures, and outputs.",
          cn: "\u62A5\u544A\u5C06\u7814\u7A76\u62C6\u5206\u4E3A\u5B9E\u9A8C\u8BBE\u8BA1\u3001\u5B9E\u9A8C\u5C55\u5F00\u4E0E\u6570\u636E\u5206\u6790\u4E09\u4E2A\u8FDE\u7EED\u9636\u6BB5\uFF0C\u5206\u522B\u5BF9\u5E94\u6848\u5934\u5206\u6790\u4E0E\u65B9\u6848\u642D\u5EFA\u3001\u6B63\u5F0F\u6D4B\u8BD5\u4E0E\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u95EE\u5377\u3001\u89C2\u5BDF\u548C\u8BBF\u8C08\u7ED3\u679C\u7684\u7EFC\u5408\u5206\u6790\u3002"
        }
      }, {
        page: 5,
        title: { en: "Desk Research and Visual Range", cn: "\u6848\u5934\u5206\u6790\u4E0E\u89C6\u91CE\u8303\u56F4" },
        content: {
          en: "Human visual-field references, driver eye movement, and representative passenger-screen layouts establish the viewing-angle and placement assumptions used in the experiment.",
          cn: "\u901A\u8FC7\u4EBA\u773C\u89C6\u91CE\u8303\u56F4\u3001\u9A7E\u9A76\u5458\u89C6\u7EBF\u8FD0\u52A8\u548C\u5178\u578B\u526F\u9A7E\u5C4F\u5E03\u5C40\u8D44\u6599\uFF0C\u5EFA\u7ACB\u5B9E\u9A8C\u6240\u91C7\u7528\u7684\u89C6\u89D2\u3001\u8DDD\u79BB\u4E0E\u5C4F\u5E55\u4F4D\u7F6E\u524D\u63D0\u3002"
        }
      }]
    }, {
      title: {
        en: "Experiment Preparation",
        cn: "\u5B9E\u9A8C\u73AF\u5883\u4E0E\u9884\u8BD5\u9A8C"
      },
      description: {
        en: "The simulator environment is assembled first, then a pilot test is used to identify the variables before the seven formal demo conditions are finalized.",
        cn: "\u5148\u5B8C\u6210\u9A7E\u9A76\u6A21\u62DF\u73AF\u5883\u4E0E\u8BBE\u5907\u642D\u5EFA\uFF0C\u518D\u901A\u8FC7\u9884\u8BD5\u9A8C\u8BC6\u522B\u5173\u952E\u53D8\u91CF\uFF0C\u6700\u540E\u5F62\u6210\u4E03\u7EC4\u6B63\u5F0F\u5B9E\u9A8C Demo\u3002"
      },
      pages: [{
        page: 6,
        title: { en: "Environment and Equipment", cn: "\u5B9E\u9A8C\u73AF\u5883\u4E0E\u8BBE\u5907" },
        content: {
          en: "The setup combines a low-traffic highway simulation, two 15.6-inch displays, a variable-switching computer, video recording equipment, and a screen-position reference based on the Toyota Highlander.",
          cn: "\u5B9E\u9A8C\u73AF\u5883\u5305\u542B\u4F4E\u8F66\u6D41\u91CF\u9AD8\u901F\u516C\u8DEF\u6A21\u62DF\u573A\u666F\u3001\u4E24\u5757 15.6 \u82F1\u5BF8\u5C4F\u5E55\u3001\u53D8\u91CF\u5207\u6362\u7535\u8111\u4E0E\u89C6\u9891\u8BB0\u5F55\u8BBE\u5907\uFF0C\u5E76\u53C2\u8003\u6C49\u5170\u8FBE\u7684\u526F\u9A7E\u5C4F\u4F4D\u7F6E\u8FDB\u884C\u5E03\u7F6E\u3002"
        }
      }, {
        page: 7,
        title: { en: "Pilot Test", cn: "\u9884\u8BD5\u9A8C" },
        content: {
          en: "The pilot test compares early screen layouts and image conditions. It identifies position and frame size as the primary variables, while color, brightness, motion frequency, trajectory, and content are controlled as interference factors.",
          cn: "\u9884\u8BD5\u9A8C\u5BF9\u65E9\u671F\u5C4F\u5E55\u4F4D\u7F6E\u548C\u5F71\u50CF\u6761\u4EF6\u8FDB\u884C\u6BD4\u8F83\uFF0C\u786E\u8BA4\u4F4D\u7F6E\u4E0E\u753B\u5E45\u5927\u5C0F\u4E3A\u4E3B\u8981\u5B9E\u9A8C\u53D8\u91CF\uFF0C\u540C\u65F6\u63A7\u5236\u8272\u5F69\u53D8\u5316\u3001\u4EAE\u5EA6\u3001\u53D8\u52A8\u9891\u7387\u3001\u8FD0\u52A8\u8F68\u8FF9\u548C\u5F71\u50CF\u5185\u5BB9\u7B49\u5E72\u6270\u56E0\u7D20\u3002"
        }
      }, {
        page: 8,
        title: { en: "Formal Demo Conditions", cn: "\u6B63\u5F0F\u5B9E\u9A8C Demo \u8BBE\u8BA1" },
        content: {
          en: "Seven conditions, A, B, C, D, B1, C1, and D1, are defined to compare image position and scale while keeping the remaining visual content consistent.",
          cn: "\u6B63\u5F0F\u5B9E\u9A8C\u8BBE\u7F6E A\u3001B\u3001C\u3001D\u3001B1\u3001C1\u3001D1 \u4E03\u7EC4\u6761\u4EF6\uFF0C\u5728\u4FDD\u6301\u5176\u4F59\u5F71\u50CF\u5185\u5BB9\u4E00\u81F4\u7684\u524D\u63D0\u4E0B\uFF0C\u5BF9\u6BD4\u4F4D\u7F6E\u4E0E\u753B\u5E45\u5927\u5C0F\u7684\u5F71\u54CD\u3002"
        }
      }]
    }, {
      title: {
        en: "Participants and Procedure",
        cn: "\u88AB\u8BD5\u4E0E\u6B63\u5F0F\u5B9E\u9A8C\u6D41\u7A0B"
      },
      description: {
        en: "Participant characteristics, viewing distance, the test sequence, and the on-site record are documented before analysis begins.",
        cn: "\u5728\u8FDB\u5165\u6570\u636E\u5206\u6790\u524D\uFF0C\u62A5\u544A\u4F9D\u6B21\u8BB0\u5F55\u88AB\u8BD5\u6784\u6210\u3001\u89C2\u770B\u8DDD\u79BB\u3001\u6B63\u5F0F\u6D4B\u8BD5\u6B65\u9AA4\u4E0E\u73B0\u573A\u6267\u884C\u60C5\u51B5\u3002"
      },
      pages: [{
        page: 9,
        title: { en: "Participant Profile", cn: "\u88AB\u8BD5\u4FE1\u606F" },
        content: {
          en: "Twenty licensed drivers participated: 14 men and 6 women aged 24\u201339, with an average of 7.1 years of driving experience. The average vertical viewing distance was 67 cm.",
          cn: "\u5B9E\u9A8C\u9080\u8BF7 20 \u4F4D\u6301\u6709\u6548\u9A7E\u7167\u7684\u88AB\u8BD5\uFF0C\u5305\u62EC\u7537\u6027 14 \u4F4D\u3001\u5973\u6027 6 \u4F4D\uFF0C\u5E74\u9F84\u4E3A 24\u201339 \u5C81\uFF0C\u5E73\u5747\u9A7E\u9F84 7.1 \u5E74\uFF1B\u5E73\u5747\u5782\u76F4\u89C6\u8DDD\u4E3A 67cm\u3002"
        }
      }, {
        page: 10,
        title: { en: "Procedure and Recording", cn: "\u5B9E\u9A8C\u6D41\u7A0B\u4E0E\u8BB0\u5F55\u65B9\u5F0F" },
        content: {
          en: "Participants receive a briefing, complete basic information, adapt to the simulator, drive steadily at 60\u201380 km/h, experience each two-minute demo, and then complete subjective questionnaires and interviews. Attention-attraction counts are recorded alongside the self-reported data.",
          cn: "\u6D41\u7A0B\u5305\u62EC\u5B9E\u9A8C\u8BF4\u660E\u3001\u57FA\u7840\u4FE1\u606F\u586B\u5199\u3001\u6A21\u62DF\u5668\u9002\u5E94\u3001\u4EE5 60\u201380km/h \u7A33\u5B9A\u9A7E\u9A76\u3001\u6BCF\u7EC4\u4E24\u5206\u949F Demo \u6D4B\u8BD5\u3001\u4E3B\u89C2\u95EE\u5377\u4E0E\u8BBF\u8C08\uFF1B\u540C\u65F6\u8BB0\u5F55\u6CE8\u610F\u529B\u88AB\u5438\u5F15\u7684\u6B21\u6570\uFF0C\u7528\u4E8E\u548C\u4E3B\u89C2\u8BC4\u5206\u4EA4\u53C9\u9A8C\u8BC1\u3002"
        }
      }, {
        page: 11,
        title: { en: "Field Record", cn: "\u5B9E\u9A8C\u73B0\u573A\u8BB0\u5F55" },
        content: {
          en: "The field documentation shows the consistent simulator setup, participant posture, display placement, and recording process used throughout the formal experiment.",
          cn: "\u73B0\u573A\u8BB0\u5F55\u5C55\u793A\u6B63\u5F0F\u5B9E\u9A8C\u4E2D\u4FDD\u6301\u4E00\u81F4\u7684\u6A21\u62DF\u5668\u73AF\u5883\u3001\u88AB\u8BD5\u5750\u59FF\u3001\u526F\u9A7E\u5C4F\u4F4D\u7F6E\u4E0E\u62CD\u6444\u8BB0\u5F55\u8FC7\u7A0B\u3002"
        }
      }]
    }, {
      title: {
        en: "Subjective Ratings and Statistics",
        cn: "\u4E3B\u89C2\u8BC4\u5206\u4E0E\u7EDF\u8BA1\u5206\u6790"
      },
      description: {
        en: "The questionnaire dataset is summarized first, followed by condition-level comparison and statistical testing.",
        cn: "\u5148\u8BF4\u660E\u5B9E\u9A8C\u6570\u636E\u89C4\u6A21\uFF0C\u518D\u4F9D\u6B21\u5448\u73B0\u5404\u5B9E\u9A8C\u6761\u4EF6\u7684\u4E3B\u89C2\u8BC4\u5206\u6BD4\u8F83\u4E0E\u7EDF\u8BA1\u663E\u8457\u6027\u68C0\u9A8C\u3002"
      },
      pages: [{
        page: 13,
        title: { en: "Dataset Overview", cn: "\u5B9E\u9A8C\u6570\u636E\u603B\u89C8" },
        content: {
          en: "The report summarizes the participant sample, 280 subjective-rating records, 140 attention-count records, 140 interview records, and approximately 600 minutes of experiment footage.",
          cn: "\u62A5\u544A\u6C47\u603B\u4E86 20 \u4F4D\u88AB\u8BD5\u3001280 \u6761\u4E3B\u89C2\u8BC4\u5206\u3001140 \u6761\u6CE8\u610F\u529B\u6B21\u6570\u8BB0\u5F55\u3001140 \u6761\u8BBF\u8C08\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u7EA6 600 \u5206\u949F\u5B9E\u9A8C\u5F71\u50CF\u3002"
        }
      }, {
        page: 14,
        title: { en: "Subjective Attention Ratings", cn: "\u6CE8\u610F\u529B\u5F71\u54CD\u4E3B\u89C2\u8BC4\u5206" },
        content: {
          en: "Scores for A through D1 are organized by participant and averaged by condition, establishing the first comparison of how strongly each screen arrangement affected attention.",
          cn: "\u5C06 A \u81F3 D1 \u4E03\u7EC4\u6761\u4EF6\u7684\u8BC4\u5206\u6309\u88AB\u8BD5\u6574\u7406\uFF0C\u5E76\u8BA1\u7B97\u5404\u7EC4\u5E73\u5747\u503C\uFF0C\u5F62\u6210\u4E0D\u540C\u5C4F\u5E55\u5E03\u5C40\u5BF9\u6CE8\u610F\u529B\u5F71\u54CD\u7A0B\u5EA6\u7684\u7B2C\u4E00\u8F6E\u6BD4\u8F83\u3002"
        }
      }, {
        page: 15,
        title: { en: "Rating Distribution", cn: "\u4E3B\u89C2\u8BC4\u5206\u5206\u5E03\u5206\u6790" },
        content: {
          en: "The score distribution is compared across image positions and sizes, revealing which conditions were more frequently perceived as distracting.",
          cn: "\u8FDB\u4E00\u6B65\u6BD4\u8F83\u4E0D\u540C\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u753B\u5E45\u5927\u5C0F\u7684\u8BC4\u5206\u5206\u5E03\uFF0C\u8BC6\u522B\u54EA\u4E9B\u6761\u4EF6\u66F4\u5BB9\u6613\u88AB\u88AB\u8BD5\u611F\u77E5\u4E3A\u5E72\u6270\u9A7E\u9A76\u6CE8\u610F\u529B\u3002"
        }
      }, {
        page: 16,
        title: { en: "Statistical Significance", cn: "\u7EDF\u8BA1\u5B66\u663E\u8457\u6027\u5206\u6790" },
        content: {
          en: "ANOVA and LSD comparisons test whether the observed differences between conditions are statistically meaningful rather than the result of isolated subjective variation.",
          cn: "\u901A\u8FC7 ANOVA \u4E0E LSD \u6BD4\u8F83\u68C0\u9A8C\u5404\u7EC4\u5DEE\u5F02\u662F\u5426\u5177\u6709\u7EDF\u8BA1\u610F\u4E49\uFF0C\u907F\u514D\u4EC5\u51ED\u4E2A\u522B\u88AB\u8BD5\u7684\u4E3B\u89C2\u611F\u53D7\u5F97\u51FA\u7ED3\u8BBA\u3002"
        }
      }]
    }, {
      title: {
        en: "Observed Attention and Interviews",
        cn: "\u6CE8\u610F\u529B\u8BB0\u5F55\u4E0E\u8BBF\u8C08\u53CD\u9988"
      },
      description: {
        en: "Observed attention-attraction counts are compared with questionnaire scores, then qualitative interviews explain the factors behind those patterns.",
        cn: "\u5C06\u89C2\u5BDF\u5230\u7684\u6CE8\u610F\u529B\u5438\u5F15\u6B21\u6570\u4E0E\u95EE\u5377\u8BC4\u5206\u8FDB\u884C\u5BF9\u7167\uFF0C\u518D\u901A\u8FC7\u8BBF\u8C08\u89E3\u91CA\u8FD9\u4E9B\u6570\u636E\u6A21\u5F0F\u80CC\u540E\u7684\u5177\u4F53\u539F\u56E0\u3002"
      },
      pages: [{
        page: 17,
        title: { en: "Attention Counts and Correlation", cn: "\u6CE8\u610F\u529B\u5438\u5F15\u6B21\u6570\u4E0E\u76F8\u5173\u6027" },
        content: {
          en: "Attention-attraction counts and subjective scores show a Pearson correlation coefficient of 0.967 with P < 0.001, providing a strong consistency check between observed behavior and self-reported impact.",
          cn: "\u6CE8\u610F\u529B\u5438\u5F15\u6B21\u6570\u4E0E\u4E3B\u89C2\u8BC4\u5206\u5E73\u5747\u503C\u7684\u76AE\u5C14\u900A\u76F8\u5173\u7CFB\u6570\u4E3A 0.967\uFF0CP\uFF1C0.001\uFF0C\u8BF4\u660E\u89C2\u5BDF\u884C\u4E3A\u4E0E\u4E3B\u89C2\u5F71\u54CD\u8BC4\u4EF7\u4E4B\u95F4\u5177\u6709\u9AD8\u5EA6\u4E00\u81F4\u6027\u3002"
        }
      }, {
        page: 18,
        title: { en: "Interview Feedback Matrix", cn: "\u8BBF\u8C08\u53CD\u9988\u7ED3\u679C\u603B\u8868" },
        content: {
          en: "Interview statements are coded across factors including vertical and horizontal placement, image size, content, sound, motion trajectory, rear-view-mirror conflict, and road conditions.",
          cn: "\u8BBF\u8C08\u5185\u5BB9\u6309\u7167\u4E0A\u4E0B\u4F4D\u7F6E\u3001\u5DE6\u53F3\u4F4D\u7F6E\u3001\u5F71\u50CF\u5C3A\u5BF8\u3001\u5F71\u50CF\u5185\u5BB9\u3001\u58F0\u97F3\u3001\u8FD0\u52A8\u8F68\u8FF9\u3001\u540E\u89C6\u955C\u51B2\u7A81\u4E0E\u9053\u8DEF\u72B6\u51B5\u7B49\u56E0\u7D20\u8FDB\u884C\u7F16\u7801\u6574\u7406\u3002"
        }
      }, {
        page: 19,
        title: { en: "Interview Synthesis", cn: "\u8BBF\u8C08\u5173\u952E\u8BCD\u4E0E\u8865\u5145\u8DDF\u8BBF" },
        content: {
          en: "Keyword clustering and follow-up questions turn the interview matrix into a more focused explanation of why particular positions and visual behaviors attracted attention.",
          cn: "\u901A\u8FC7\u5173\u952E\u8BCD\u805A\u7C7B\u4E0E\u7279\u6B8A\u95EE\u9898\u8DDF\u8BBF\uFF0C\u5C06\u8BBF\u8C08\u603B\u8868\u8FDB\u4E00\u6B65\u8F6C\u5316\u4E3A\u5BF9\u7279\u5B9A\u4F4D\u7F6E\u548C\u89C6\u89C9\u884C\u4E3A\u4E3A\u4F55\u5438\u5F15\u6CE8\u610F\u529B\u7684\u96C6\u4E2D\u89E3\u91CA\u3002"
        }
      }]
    }, {
      title: {
        en: "Conclusions and Recommendations",
        cn: "\u5B9E\u9A8C\u7ED3\u8BBA\u4E0E\u8BBE\u8BA1\u5EFA\u8BAE"
      },
      description: {
        en: "The final pages consolidate the attention-impact pattern and translate the findings into passenger-screen layout recommendations.",
        cn: "\u6700\u540E\u5C06\u6CE8\u610F\u529B\u5F71\u54CD\u89C4\u5F8B\u6C47\u603B\u4E3A\u7ED3\u8BBA\uFF0C\u5E76\u8FDB\u4E00\u6B65\u8F6C\u5316\u4E3A\u526F\u9A7E\u5C4F\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u5E03\u5C40\u5EFA\u8BAE\u3002"
      },
      pages: [{
        page: 21,
        title: { en: "Experiment Conclusions", cn: "\u5B9E\u9A8C\u7ED3\u8BBA" },
        content: {
          en: "The conclusion maps the relative attention impact of the tested conditions, identifies critical placement and size relationships, and summarizes the main findings from the experiment.",
          cn: "\u7ED3\u8BBA\u9875\u6C47\u603B\u4E03\u7EC4\u6761\u4EF6\u7684\u76F8\u5BF9\u6CE8\u610F\u529B\u5F71\u54CD\uFF0C\u8BC6\u522B\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u753B\u5E45\u5927\u5C0F\u7684\u5173\u952E\u5173\u7CFB\uFF0C\u5E76\u96C6\u4E2D\u5448\u73B0\u5B9E\u9A8C\u7684\u4E3B\u8981\u53D1\u73B0\u3002"
        }
      }, {
        page: 22,
        title: { en: "Additional Layout Recommendations", cn: "\u5176\u4ED6\u5E03\u5C40\u5EFA\u8BAE" },
        content: {
          en: "The findings are translated into practical layout guidance and compared with representative passenger-screen configurations already used in production vehicles.",
          cn: "\u7814\u7A76\u7ED3\u679C\u88AB\u8F6C\u5316\u4E3A\u66F4\u5177\u4F53\u7684\u5E03\u5C40\u5EFA\u8BAE\uFF0C\u5E76\u4E0E\u5E02\u9762\u91CF\u4EA7\u8F66\u578B\u4E2D\u7684\u5178\u578B\u526F\u9A7E\u5C4F\u914D\u7F6E\u8FDB\u884C\u5BF9\u7167\u3002"
        }
      }]
    }];
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-24 md:space-y-32" }, chapters.map((chapter, chapterIndex) => /* @__PURE__ */ React.createElement("section", { key: `passenger-report-chapter-${chapterIndex}`, className: "space-y-12 md:space-y-16" }, /* @__PURE__ */ React.createElement("header", { className: "max-w-4xl border-t border-zinc-200/80 pt-10 md:pt-12" }, /* @__PURE__ */ React.createElement("p", { className: "mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(chapterIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-950" }, t(chapter.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base font-medium leading-[1.8] text-zinc-600 md:text-lg" }, t(chapter.description))), /* @__PURE__ */ React.createElement("div", { className: "space-y-14 md:space-y-18" }, chapter.pages.map((page, pageIndex) => {
      const pageSrc = `assets/portfolio/passenger-screen-visual-impact/report-page-${String(page.page).padStart(2, "0")}.png`;
      return /* @__PURE__ */ React.createElement(
        "article",
        {
          key: `passenger-report-page-${page.page}`,
          className: "grid grid-cols-1 gap-7 border-t border-zinc-200/70 pt-10 lg:grid-cols-[minmax(0,0.31fr)_minmax(0,0.69fr)] lg:items-center lg:gap-12 xl:gap-16"
        },
        /* @__PURE__ */ React.createElement("div", { className: "max-w-md" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400" }, String(chapterIndex + 1).padStart(2, "0"), ".", String(pageIndex + 1).padStart(2, "0"), " / PDF ", page.page), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.12] tracking-[-0.018em] text-zinc-900" }, t(page.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-5 text-base font-medium leading-[1.78] text-zinc-600" }, t(page.content))),
        /* @__PURE__ */ React.createElement("figure", { className: "touch-media min-w-0 overflow-hidden rounded-[24px] border border-zinc-200/70 bg-white/85 shadow-[0_20px_54px_-40px_rgba(15,23,42,0.22)]" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setCertificatePreview(pageSrc),
            className: "block w-full cursor-zoom-in bg-white",
            "aria-label": lang2 === "en" ? "Open report page preview" : "\u653E\u5927\u67E5\u770B\u62A5\u544A\u9875"
          },
          /* @__PURE__ */ React.createElement(
            "img",
            {
              src: pageSrc,
              alt: t(page.title),
              loading: chapterIndex === 0 ? "eager" : "lazy",
              className: "block h-auto max-h-[62vh] w-full object-contain bg-white"
            }
          )
        ))
      );
    })))));
  };
  const renderMemoryParkingMedia = (index) => {
    const sec = project.sections[index];
    if (!sec?.image) return null;
    return /* @__PURE__ */ React.createElement("figure", {
      className: "overflow-hidden rounded-[28px] border border-white/90 bg-white/80 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.16)]"
    }, /* @__PURE__ */ React.createElement("a", {
      href: sec.image,
      target: "_blank",
      rel: "noreferrer",
      className: "block bg-white"
    }, /* @__PURE__ */ React.createElement("img", {
      src: sec.image,
      alt: t(sec.imageAlt) || t(sec.title),
      loading: index < 2 ? "eager" : "lazy",
      className: "block w-full max-h-[58vh] object-contain bg-white"
    })), sec.caption && /* @__PURE__ */ React.createElement("figcaption", {
      className: "border-t border-zinc-100 px-5 py-4 text-sm leading-relaxed text-zinc-500"
    }, t(sec.caption)));
  };
  const renderMemoryParkingDetail = () => /* @__PURE__ */ React.createElement("div", {
    className: "space-y-14 md:space-y-18"
  }, project.sections.map((sec, i) => /* @__PURE__ */ React.createElement("section", {
    key: `memory-${i}`,
    className: "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12 xl:gap-14 lg:items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md lg:pr-2"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600"
  }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", {
    className: "text-[clamp(1.45rem,2.45vw,2.15rem)] font-bold tracking-[-0.018em] leading-[1.08] text-zinc-900"
  }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", {
    className: "mt-5 max-w-[32ch] text-base md:text-lg leading-[1.75] font-medium text-zinc-600 whitespace-pre-wrap"
  }, t(sec.content))), /* @__PURE__ */ React.createElement("div", {
    className: "min-w-0"
  }, renderMemoryParkingMedia(i)))));
  const renderCoinsInTheSkyDetail = () => {
    const coinsSections = [{
      key: "overview",
      title: { en: "Overview", cn: "\u9879\u76EE\u6982\u8FF0" },
      content: {
        en: "Coins in the Sky frames workplace feedback as a physical game. By turning typing speed into falling coins, shifting pointers, and visible competition, the installation makes effort, reward, and unequal return legible as a social mechanism instead of an abstract management promise.",
        cn: "Coins in the Sky \u628A\u804C\u573A\u53CD\u9988\u5173\u7CFB\u8F6C\u8BD1\u6210\u4E00\u4E2A\u5B9E\u4F53\u6E38\u620F\u3002\u5B83\u5C06\u6253\u5B57\u901F\u5EA6\u8F6C\u5316\u4E3A\u4E0B\u843D\u7684\u786C\u5E01\u3001\u504F\u8F6C\u7684\u6307\u9488\u4E0E\u53EF\u89C1\u7684\u7ADE\u4E89\uFF0C\u8BA9\u6295\u5165\u3001\u5956\u52B1\u4E0E\u4E0D\u5747\u8861\u56DE\u62A5\u4E0D\u518D\u53EA\u662F\u62BD\u8C61\u627F\u8BFA\uFF0C\u800C\u6210\u4E3A\u53EF\u4EE5\u88AB\u76F4\u63A5\u89C2\u770B\u7684\u793E\u4F1A\u673A\u5236\u3002"
      },
      images: [
        { src: "assets/portfolio/coins-in-the-sky/photo-01.png", alt: { en: "Coins in the Sky overview photo 1", cn: "Coins in the Sky \u6982\u89C8\u56FE 1" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-04.png", alt: { en: "Coins in the Sky overview photo 2", cn: "Coins in the Sky \u6982\u89C8\u56FE 2" } }
      ]
    }, {
      key: "setup",
      title: { en: "Interaction Setup", cn: "\u4EA4\u4E92\u88C5\u7F6E\u4E0E\u4F7F\u7528\u65B9\u5F0F" },
      content: {
        en: "Players type on keyboards to drive the installation. The input speed changes how quickly coins are released and how the exit pointer swings, so the relationship between labor, pressure, and reward becomes a concrete multiplayer situation rather than a hidden workplace metric.",
        cn: "\u73A9\u5BB6\u901A\u8FC7\u952E\u76D8\u8F93\u5165\u9A71\u52A8\u88C5\u7F6E\u3002\u8F93\u5165\u901F\u5EA6\u4F1A\u6539\u53D8\u786C\u5E01\u91CA\u653E\u7684\u8282\u594F\uFF0C\u4E5F\u4F1A\u5F71\u54CD\u51FA\u53E3\u6307\u9488\u7684\u504F\u8F6C\u65B9\u5411\uFF0C\u4E8E\u662F\u52B3\u52A8\u3001\u538B\u529B\u4E0E\u56DE\u62A5\u4E4B\u95F4\u7684\u5173\u7CFB\u88AB\u8F6C\u5316\u4E3A\u4E00\u4E2A\u5177\u4F53\u7684\u591A\u4EBA\u7ADE\u4E89\u573A\u666F\uFF0C\u800C\u4E0D\u518D\u662F\u9690\u85CF\u5728\u5DE5\u4F5C\u73AF\u5883\u4E2D\u7684\u62BD\u8C61\u6307\u6807\u3002"
      },
      images: [
        { src: "assets/portfolio/coins-in-the-sky/photo-02.png", alt: { en: "Interaction setup photo 1", cn: "\u4EA4\u4E92\u88C5\u7F6E\u56FE 1" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-03.png", alt: { en: "Interaction setup photo 2", cn: "\u4EA4\u4E92\u88C5\u7F6E\u56FE 2" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-06.png", alt: { en: "Interaction setup photo 3", cn: "\u4EA4\u4E92\u88C5\u7F6E\u56FE 3" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-07.png", alt: { en: "Interaction setup photo 4", cn: "\u4EA4\u4E92\u88C5\u7F6E\u56FE 4" } }
      ]
    }, {
      key: "mechanism",
      title: { en: "Mechanism Logic", cn: "\u673A\u5236\u903B\u8F91" },
      content: {
        en: "The device visualizes a simple but unequal rule: the more one invests, the more one expects to receive. When more players join, the distribution becomes unstable and visibly biased, because the pointer tilts toward the faster contributor. Feedback is no longer neutral; it is directional, competitive, and unevenly allocated.",
        cn: "\u88C5\u7F6E\u628A\u4E00\u6761\u7B80\u5355\u5374\u4E0D\u5E73\u7B49\u7684\u89C4\u5219\u53EF\u89C6\u5316\uFF1A\u6295\u5165\u8D8A\u591A\uFF0C\u671F\u5F85\u5F97\u5230\u7684\u4E5F\u8D8A\u591A\u3002\u5F53\u66F4\u591A\u73A9\u5BB6\u52A0\u5165\u540E\uFF0C\u5206\u914D\u4F1A\u53D8\u5F97\u4E0D\u7A33\u5B9A\u4E14\u660E\u663E\u504F\u5411\uFF0C\u56E0\u4E3A\u6307\u9488\u4F1A\u5411\u66F4\u5FEB\u7684\u8F93\u5165\u8005\u4E00\u4FA7\u503E\u659C\u3002\u53CD\u9988\u4E0D\u518D\u662F\u4E2D\u6027\u7684\uFF0C\u5B83\u5177\u6709\u65B9\u5411\u6027\u3001\u7ADE\u4E89\u6027\uFF0C\u4E5F\u5E76\u4E0D\u5E73\u5747\u3002"
      },
      motion: [
        { src: "assets/portfolio/coins-in-the-sky/motion-single-fast.gif", alt: { en: "Single-player fast input motion", cn: "\u5355\u4EBA\u5FEB\u901F\u8F93\u5165\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-single-slow.gif", alt: { en: "Single-player slow input motion", cn: "\u5355\u4EBA\u6162\u901F\u8F93\u5165\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-multi-player.gif", alt: { en: "Multi-player competition motion", cn: "\u591A\u4EBA\u7ADE\u4E89\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-pointer-spin.gif", alt: { en: "Pointer swing motion", cn: "\u6307\u9488\u504F\u8F6C\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-coin-payout.gif", alt: { en: "Coin payout motion", cn: "\u786C\u5E01\u56DE\u62A5\u52A8\u56FE" } }
      ]
    }, {
      key: "promises",
      title: { en: "Promises of Return", cn: "\u56DE\u62A5\u60F3\u8C61\u7684\u56DB\u4E2A\u7EF4\u5EA6" },
      content: {
        en: "The project borrows from the \u201Cpie in the sky\u201D effect: people continue over-investing because future return still feels possible. That return may be imagined as survival, social connection, life meaning, or self-actualization. These promises motivate continued effort even when the distribution remains irrational.",
        cn: "\u9879\u76EE\u501F\u7528\u4E86\u201Cpie in the sky\u201D\u6548\u5E94\uFF1A\u5373\u4F7F\u56DE\u62A5\u5206\u914D\u5E76\u4E0D\u5408\u7406\uFF0C\u4EBA\u4EEC\u4F9D\u7136\u4F1A\u6301\u7EED\u8FC7\u5EA6\u6295\u5165\uFF0C\u56E0\u4E3A\u672A\u6765\u7684\u56DE\u62A5\u4ECD\u7136\u770B\u4F3C\u53EF\u80FD\u3002\u8FD9\u79CD\u56DE\u62A5\u53EF\u4EE5\u88AB\u60F3\u8C61\u4E3A\u751F\u5B58\u4FDD\u969C\u3001\u793E\u4F1A\u8FDE\u63A5\u3001\u751F\u6D3B\u610F\u4E49\u6216\u81EA\u6211\u5B9E\u73B0\u3002\u6B63\u662F\u8FD9\u4E9B\u627F\u8BFA\uFF0C\u9A71\u52A8\u7740\u4EBA\u4EEC\u7EE7\u7EED\u52B3\u52A8\u3002"
      },
      values: [
        { src: "assets/portfolio/coins-in-the-sky/value-survival.png", label: { en: "Survival", cn: "\u751F\u5B58\u4FDD\u969C" } },
        { src: "assets/portfolio/coins-in-the-sky/value-social.png", label: { en: "Social Connection", cn: "\u793E\u4F1A\u8FDE\u63A5" } },
        { src: "assets/portfolio/coins-in-the-sky/value-meaning.png", label: { en: "Meaning", cn: "\u751F\u6D3B\u610F\u4E49" } },
        { src: "assets/portfolio/coins-in-the-sky/value-self-actualization.png", label: { en: "Self-Actualization", cn: "\u81EA\u6211\u5B9E\u73B0" } }
      ]
    }, {
      key: "exhibition",
      title: { en: "Exhibition View", cn: "\u5C55\u793A\u8BB0\u5F55" },
      content: {
        en: "The installation was shown in RCA\u2019s work-in-progress setting as a playable environment. Rather than explaining workplace hierarchy through text alone, the piece lets participants feel bias through the rhythm of typing, watching, and waiting for coins to arrive.",
        cn: "\u88C5\u7F6E\u6700\u7EC8\u5728 RCA \u7684 work-in-progress \u5C55\u793A\u73AF\u5883\u4E2D\u4F5C\u4E3A\u4E00\u4E2A\u53EF\u53C2\u4E0E\u7684\u73B0\u573A\u7CFB\u7EDF\u5448\u73B0\u3002\u5B83\u5E76\u4E0D\u662F\u901A\u8FC7\u6587\u5B57\u53BB\u89E3\u91CA\u804C\u573A\u5C42\u7EA7\uFF0C\u800C\u662F\u8BA9\u53C2\u4E0E\u8005\u5728\u6253\u5B57\u3001\u7B49\u5F85\u4E0E\u89C2\u770B\u786C\u5E01\u5206\u914D\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u4EB2\u81EA\u611F\u53D7\u504F\u5DEE\u662F\u5982\u4F55\u53D1\u751F\u7684\u3002"
      },
      images: [
        { src: "assets/portfolio/coins-in-the-sky/photo-05.png", alt: { en: "Exhibition view photo 1", cn: "\u5C55\u793A\u8BB0\u5F55\u56FE 1" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-04.png", alt: { en: "Exhibition view photo 2", cn: "\u5C55\u793A\u8BB0\u5F55\u56FE 2" } }
      ]
    }];
    const renderCoinsFigure = (src, alt, key, eager = false) => /* @__PURE__ */ React.createElement("figure", { key, className: "overflow-hidden rounded-[28px] border border-white/90 bg-white/80 shadow-[0_20px_48px_-32px_rgba(15,23,42,0.14)]" }, /* @__PURE__ */ React.createElement("a", { href: src, target: "_blank", rel: "noreferrer", className: "block bg-white" }, /* @__PURE__ */ React.createElement("img", { src, alt: t(alt), loading: eager ? "eager" : "lazy", className: "block h-full w-full object-cover aspect-[4/3]" })));
    const renderValueFigure = (item, index) => /* @__PURE__ */ React.createElement("figure", { key: `coins-value-${index}`, className: "rounded-[24px] border border-zinc-200/80 bg-white/82 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.16)]" }, /* @__PURE__ */ React.createElement("a", { href: item.src, target: "_blank", rel: "noreferrer", className: "block overflow-hidden rounded-[18px] border border-zinc-100 bg-zinc-50" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: t(item.label), loading: "lazy", className: "block aspect-square w-full object-cover" })), /* @__PURE__ */ React.createElement("figcaption", { className: "pt-4 text-sm font-semibold leading-relaxed text-zinc-700" }, t(item.label)));
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-20 md:space-y-24" }, coinsSections.map((sec, i) => /* @__PURE__ */ React.createElement("section", { key: `coins-${sec.key}`, className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold tracking-[-0.02em] leading-[1.08] text-zinc-900" }, t(sec.title)), sec.content ? /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base md:text-lg leading-[1.8] font-medium text-zinc-600 whitespace-pre-wrap" }, t(sec.content)) : null), sec.images?.length === 2 ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, sec.images.map((image, index) => renderCoinsFigure(image.src, image.alt, `coins-pair-${i}-${index}`, i === 0))) : null, sec.images?.length === 4 ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, sec.images.map((image, index) => renderCoinsFigure(image.src, image.alt, `coins-grid-${i}-${index}`))) : null, sec.motion?.length ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" }, sec.motion.map((image, index) => renderCoinsFigure(image.src, image.alt, `coins-motion-${i}-${index}`))) : null, sec.values?.length ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4" }, sec.values.map((item, index) => renderValueFigure(item, index))) : null)));
  };
  const renderTriEcoDetail = () => {
    const triEcoSections = project.sections || [];
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-24 md:space-y-32" }, triEcoSections.map((sec, i) => {
      const sectionNumber = String(i + 1).padStart(2, "0");
      const imageSrc = sec.image || null;
      const annotationItems = t(sec.annotations) || [];
      const isFieldResearch = Boolean(sec.video);
      return /* @__PURE__ */ React.createElement("section", { key: `tri-eco-${i}`, className: "space-y-10" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, sectionNumber), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.02em] text-zinc-900" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] whitespace-pre-wrap text-base font-medium leading-[1.8] text-zinc-600 md:text-lg" }, t(sec.content)), annotationItems.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "mt-7 space-y-3 border-t border-zinc-200/80 pt-5" }, annotationItems.map((item, itemIndex) => /* @__PURE__ */ React.createElement("li", { key: itemIndex, className: "flex gap-3 text-sm font-medium leading-[1.7] text-zinc-600" }, /* @__PURE__ */ React.createElement("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" }), /* @__PURE__ */ React.createElement("span", null, item)))))), imageSrc && renderEditorialImage(
        { src: imageSrc, alt: sec.imageAlt, caption: sec.caption },
        `tri-eco-image-${i}`,
        {
          className: "w-full bg-white",
          mediaClassName: "aspect-[4000/2225]",
          imageClassName: "block h-full w-full object-contain bg-white"
        }
      ), isFieldResearch && /* @__PURE__ */ React.createElement("figure", { className: "mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/90 bg-zinc-950 shadow-[0_20px_48px_-34px_rgba(15,23,42,0.18)]" }, /* @__PURE__ */ React.createElement(
        "video",
        {
          src: sec.video,
          controls: true,
          playsInline: true,
          preload: "metadata",
          className: "block aspect-video w-full bg-black object-contain"
        }
      ), /* @__PURE__ */ React.createElement("figcaption", { className: "bg-white px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600" }, lang2 === "cn" ? "\u8865\u5145\u8BB0\u5F55\uFF1ASWEEEP Kuusakoski \u7535\u5B50\u5E9F\u5F03\u7269\u5904\u7406\u73B0\u573A\u3002" : "Supplementary field record from the SWEEEP Kuusakoski e-waste treatment facility.")));
    }));
  };
  const renderSonicPatrolDetail = () => {
    const sonicSections = project.sections || [];
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-24 md:space-y-32" }, sonicSections.map((sec, i) => {
      const sectionNumber = String(i + 1).padStart(2, "0");
      const annotationItems = t(sec.annotations) || [];
      const imageSrc = sec.image || null;
      const sectionVideo = sec.video && sec.video !== primaryVideo ? sec.video : null;
      return /* @__PURE__ */ React.createElement("section", { key: `sonic-patrol-${i}`, className: "space-y-10" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, sectionNumber), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.02em] text-zinc-900" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] whitespace-pre-wrap text-base font-medium leading-[1.8] text-zinc-600 md:text-lg" }, t(sec.content)), annotationItems.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "mt-7 space-y-3 border-t border-zinc-200/80 pt-5" }, annotationItems.map((item, itemIndex) => /* @__PURE__ */ React.createElement("li", { key: itemIndex, className: "flex gap-3 text-sm font-medium leading-[1.7] text-zinc-600" }, /* @__PURE__ */ React.createElement("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" }), /* @__PURE__ */ React.createElement("span", null, item)))))), imageSrc && renderEditorialImage(
        { src: imageSrc, alt: sec.imageAlt, caption: sec.caption },
        `sonic-patrol-image-${i}`,
        {
          className: "w-full bg-white",
          mediaClassName: "aspect-[4000/2225]",
          imageClassName: "block h-full w-full object-contain bg-white"
        }
      ), sectionVideo && /* @__PURE__ */ React.createElement("figure", { className: "mx-auto w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/90 bg-zinc-950 shadow-[0_20px_48px_-34px_rgba(15,23,42,0.18)]" }, /* @__PURE__ */ React.createElement("video", { src: sectionVideo, controls: true, playsInline: true, preload: "metadata", className: "block aspect-video w-full bg-black object-contain" }), sec.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "bg-white px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600" }, t(sec.caption))));
    }));
  };
  const renderDecathlonDetail = () => {
    const sections = project.sections || [];
    const safeIndex = Math.min(selectedDecathlonIndex, Math.max(sections.length - 1, 0));
    const sec = sections[safeIndex] || sections[0];
    if (!sec) return null;
    const annotationItems = t(sec.annotations) || [];
    const adjacent = sections.filter((_, index) => index !== safeIndex).slice(0, 3);
    return /* @__PURE__ */ React.createElement("section", { className: "decathlon-detail-grid grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,1.08fr)_minmax(0,0.78fr)] lg:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[28px] border border-zinc-200/70 bg-white/82 p-7 shadow-[0_18px_52px_-42px_rgba(15,23,42,0.22)] backdrop-blur-xl md:p-8" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(safeIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-zinc-950" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-6 whitespace-pre-wrap text-base font-medium leading-[1.78] text-zinc-600" }, t(sec.content))), annotationItems.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "rounded-[28px] border border-zinc-200/70 bg-zinc-100/68 p-7 shadow-[0_18px_52px_-42px_rgba(15,23,42,0.18)] md:p-8" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400" }, lang2 === "en" ? "Product Focus" : "\u4EA7\u54C1\u91CD\u70B9"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-4" }, annotationItems.map((item, itemIndex) => /* @__PURE__ */ React.createElement("li", { key: itemIndex, className: "grid grid-cols-[2.4rem_1fr] gap-3 text-sm font-semibold leading-[1.7] text-zinc-600" }, /* @__PURE__ */ React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] font-bold text-zinc-400 shadow-sm" }, String(itemIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", null, item)))))), /* @__PURE__ */ React.createElement(
        "figure",
        {
          style: { height: "min(820px, 78vh)" },
          className: "touch-media flex w-full flex-col overflow-hidden rounded-[28px] border border-zinc-200/70 bg-white/88 shadow-[0_28px_80px_-54px_rgba(15,23,42,0.28)]"
        },
        /* @__PURE__ */ React.createElement("div", { className: "min-h-0 flex-1 overflow-y-auto bg-white" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setCertificatePreview(sec.image),
            className: "block w-full cursor-zoom-in bg-white text-left",
            "aria-label": lang2 === "en" ? "Open full product page" : "\u653E\u5927\u67E5\u770B\u5B8C\u6574\u5546\u54C1\u9875"
          },
          /* @__PURE__ */ React.createElement(
            "img",
            {
              src: sec.image,
              alt: t(sec.imageAlt),
              loading: "eager",
              className: "block h-auto w-full"
            }
          )
        )),
        /* @__PURE__ */ React.createElement("figcaption", { className: "shrink-0 border-t border-zinc-100 bg-white/92 px-5 py-4 text-sm font-medium leading-[1.65] text-zinc-500" }, t(sec.imageAlt))
      ), /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[28px] border border-zinc-200/70 bg-white/78 p-7 shadow-[0_18px_52px_-42px_rgba(15,23,42,0.18)] md:p-8" }, /* @__PURE__ */ React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400" }, lang2 === "en" ? "Selected Page" : "\u5F53\u524D\u9875\u9762"), /* @__PURE__ */ React.createElement("p", { className: "mt-8 text-[clamp(3rem,7vw,5.5rem)] font-light leading-none tracking-[-0.05em] text-zinc-500" }, String(safeIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "mt-7 h-px bg-zinc-200" }), /* @__PURE__ */ React.createElement("p", { className: "mt-5 text-sm font-semibold leading-[1.7] text-zinc-600" }, t(sec.title))), adjacent.map((item, index) => /* @__PURE__ */ React.createElement("button", { key: `related-decathlon-${index}`, type: "button", onClick: () => {
        const nextIndex = sections.indexOf(item);
        setSelectedDecathlonIndex(nextIndex);
        setHoveredDecathlonIndex(nextIndex);
      }, className: "group flex min-h-[124px] w-full items-end justify-between overflow-hidden rounded-[24px] border border-zinc-200/70 bg-zinc-100/70 p-5 text-left motion-surface hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-[0_18px_46px_-36px_rgba(15,23,42,0.28)]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400" }, String(sections.indexOf(item) + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("p", { className: "max-w-[11rem] text-xl font-semibold leading-[1.04] tracking-[-0.03em] text-zinc-700 group-hover:text-zinc-950" }, t(item.title))), /* @__PURE__ */ React.createElement("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm group-hover:text-blue-600" }, /* @__PURE__ */ React.createElement(ArrowRight, { size: 17 }))))));
  };
  const renderDecathlonProductShowcase = () => {
    const sections = project.sections || [];
    if (!sections.length) return null;
    const activeIndex = Math.min(hoveredDecathlonIndex, sections.length - 1);
    return /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-10 md:mt-14" }, /* @__PURE__ */ React.createElement("div", { className: "decathlon-showcase flex flex-col gap-4 md:h-[560px] md:flex-row md:items-stretch md:gap-5" }, sections.map((sec, index) => {
      const isActive = index === activeIndex;
      const isSelected = index === selectedDecathlonIndex;
      const buttonClass = `group relative min-h-[330px] overflow-hidden rounded-[28px] border bg-white text-left shadow-[0_22px_68px_-52px_rgba(15,23,42,0.34)] motion-surface md:h-full md:hover:flex-[2.1] hover:border-zinc-300 hover:opacity-100 hover:shadow-[0_32px_90px_-58px_rgba(15,23,42,0.42)] ${isActive ? "border-zinc-300 md:flex-[2.1] md:shadow-[0_32px_90px_-58px_rgba(15,23,42,0.42)]" : "border-zinc-200/70 md:flex-[0.72] md:opacity-55"} ${isSelected ? "ring-2 ring-blue-500/35" : ""}`;
      const imageClass = `absolute inset-0 h-full w-full object-cover object-top transition duration-500 md:group-hover:scale-100 group-hover:opacity-95 group-hover:grayscale-0 ${isActive ? "scale-100 opacity-95" : "scale-100 opacity-22 grayscale md:scale-105"}`;
      const numberClass = `text-[clamp(3.8rem,8vw,6.8rem)] font-light leading-none tracking-[-0.055em] transition duration-300 ${isActive ? "text-zinc-300/90" : "text-zinc-200/90"}`;
      const iconClass = `flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition ${isActive ? "text-blue-600" : "text-zinc-400"}`;
      const titleClass = `min-w-0 max-w-[16rem] break-words text-[clamp(1.7rem,3vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-zinc-950 transition duration-300 [overflow-wrap:anywhere] group-hover:opacity-100 ${isActive ? "opacity-100" : "opacity-70 md:text-[1.55rem]"}`;
      const contentClass = `min-w-0 max-w-[32rem] break-words text-sm font-medium leading-[1.72] text-zinc-600 transition duration-300 [overflow-wrap:anywhere] group-hover:opacity-100 group-hover:md:max-h-40 ${isActive ? "opacity-100" : "opacity-0 md:max-h-0 md:overflow-hidden"}`;
      return /* @__PURE__ */ React.createElement("button", { key: `decathlon-product-${index}`, type: "button", onMouseEnter: () => setHoveredDecathlonIndex(index), onFocus: () => setHoveredDecathlonIndex(index), onClick: () => {
        setSelectedDecathlonIndex(index);
        setHoveredDecathlonIndex(index);
        window.setTimeout(() => document.querySelector(".decathlon-detail-grid")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        }), 40);
      }, className: buttonClass }, /* @__PURE__ */ React.createElement("img", { src: sec.image, alt: t(sec.imageAlt), loading: index === 0 ? "eager" : "lazy", className: imageClass }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-white/86 via-white/48 to-white/92" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex h-full min-h-[330px] min-w-0 flex-col justify-between overflow-hidden p-6 md:min-h-0 md:p-8" }, /* @__PURE__ */ React.createElement("p", { className: numberClass }, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex min-w-0 items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: iconClass }, /* @__PURE__ */ React.createElement(ArrowRight, { size: 17 })), isSelected && /* @__PURE__ */ React.createElement("span", { className: "rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white" }, lang2 === "en" ? "Selected" : "\u5DF2\u9009\u4E2D")), /* @__PURE__ */ React.createElement("h3", { className: titleClass }, t(sec.title)), /* @__PURE__ */ React.createElement("p", { className: contentClass }, t(sec.content)))));
    })));
  };
  const renderEditorialHeader = () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate(`/${project.category}`),
      className: "mb-12 inline-flex items-center rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.25)] motion-surface hover:border-zinc-300 hover:bg-zinc-100/80 hover:text-zinc-900"
    },
    /* @__PURE__ */ React.createElement(MoveLeft, { size: 15, className: "mr-2" }),
    lang2 === "en" ? "Back" : "\u8FD4\u56DE"
  ), /* @__PURE__ */ React.createElement("header", { className: "grid grid-cols-1 gap-10 border-b border-zinc-200/80 pb-12 md:pb-16 lg:grid-cols-12 lg:gap-12" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-8" }, /* @__PURE__ */ React.createElement("div", { className: "mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, /* @__PURE__ */ React.createElement("span", null, project.year), (t(project.tags) || []).map((tag, index) => /* @__PURE__ */ React.createElement("span", { key: index, className: "before:mr-4 before:text-zinc-300 before:content-['/']" }, tag))), /* @__PURE__ */ React.createElement("h1", { className: "max-w-5xl text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.042em] text-zinc-950" }, t(project.title)), t(project.subtitle) && /* @__PURE__ */ React.createElement("p", { className: "mt-8 max-w-[48rem] text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium leading-[1.55] tracking-[-0.01em] text-zinc-500" }, t(project.subtitle))), /* @__PURE__ */ React.createElement("aside", { className: "flex flex-col justify-end gap-7 lg:col-span-4 lg:border-l lg:border-zinc-200/80 lg:pl-9" }, t(project.role) && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, lang2 === "en" ? "Contribution" : "\u9879\u76EE\u8D21\u732E"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold leading-[1.65] text-zinc-700" }, t(project.role))), project.tools?.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-400" }, lang2 === "en" ? "Practice" : "\u5B9E\u8DF5\u8303\u56F4"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium leading-[1.65] text-zinc-500" }, translateList(project.tools, lang2).join(" \xB7 "))), project.links?.map((link, index) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: index,
      href: link.url,
      target: "_blank",
      rel: "noreferrer",
      className: "inline-flex w-fit items-center gap-3 border-b border-zinc-900 pb-1 text-sm font-bold text-zinc-900 motion-color hover:border-blue-600 hover:text-blue-600"
    },
    t(link.label),
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 15 })
  )))), project.slug === "decathlon-website" ? renderDecathlonProductShowcase() : /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-10 md:mt-14" }, primaryVideo ? renderEditorialVideo(primaryVideo, primaryVideoSection?.caption, "hero-video") : /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[26px] border border-zinc-200/65 bg-zinc-100 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.34)]" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: project.coverImage,
      alt: t(project.title),
      loading: "eager",
      className: "block w-full aspect-video object-cover"
    }
  ))));
  return /* @__PURE__ */ React.createElement("div", { className: "pt-32 md:pt-36 pb-28 px-5 md:px-8 animate-fade-up" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1320px]" }, renderEditorialHeader(), project.slug === "memory-parking-hmi" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderMemoryParkingDetail()) : project.slug === "passenger-screen-visual-impact" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal mt-20 md:mt-28" }, renderPassengerScreenReportDetail()) : project.slug === "riverside-changsha" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderRiversideDetail()) : project.slug === "artificial-sky" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderArtificialSkyDetail()) : project.slug === "tri-eco-service" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderTriEcoDetail()) : project.slug === "sonic-patrol" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderSonicPatrolDetail()) : project.slug === "decathlon-website" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderDecathlonDetail()) : project.slug === "coins-in-the-sky" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderCoinsInTheSkyDetail()) : project.sections.length > 0 ? /* @__PURE__ */ React.createElement("div", null, project.sections.map(renderEditorialSection)) : /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28 text-zinc-500 text-lg font-medium" }, lang2 === "en" ? "Documentation in progress." : "\u5185\u5BB9\u6574\u7406\u4E2D\u3002"), certificatePreview && !activeCertificate && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm animate-fade-in-simple md:p-8",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": lang2 === "en" ? "Image preview" : "\u56FE\u7247\u9884\u89C8",
      onClick: () => setCertificatePreview(null)
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative flex max-h-[92vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-[24px] bg-white p-2 shadow-[0_32px_100px_-24px_rgba(0,0,0,0.5)] md:p-3",
        onClick: (event) => event.stopPropagation()
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: certificatePreview,
          alt: t(project.title),
          className: "block max-h-[88vh] max-w-[90vw] object-contain"
        }
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: () => setCertificatePreview(null),
          className: "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/92 text-zinc-600 shadow-sm motion-surface hover:bg-zinc-100 hover:text-zinc-950",
          "aria-label": lang2 === "en" ? "Close image preview" : "\u5173\u95ED\u56FE\u7247\u9884\u89C8"
        },
        /* @__PURE__ */ React.createElement(X, { size: 18 })
      )
    )
  )));
}

export default ProjectDetail;
