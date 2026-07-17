import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, MoveLeft, X } from 'lucide-react';
import { LanguageContext, RouteContext } from '../app/contexts.jsx';
import { loadProjectData } from '../data/project-loaders.js';
import { passengerReportDividerStyles, riversideArticleFrames, riversideArticleRatio, riversideEntryFrames, riversideExpandedStartRatio, riversideMusicSrc, riversideRotateFrame, translateList } from '../data/detail-support.js';
import { getPreviewCrop, getPreviewFrameStyle, getPreviewImageStyle } from './CategoryRoute.jsx';
import DeferredVideo from '../components/DeferredVideo.jsx';

var ProjectDetail = ({ project }) => {
  const {
    route,
    navigate
  } = useContext(RouteContext);
  const {
    t,
    lang: lang2
  } = useContext(LanguageContext);
  const slug = route.params?.slug;
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [selectedDecathlonIndex, setSelectedDecathlonIndex] = useState(0);
  const [hoveredDecathlonIndex, setHoveredDecathlonIndex] = useState(null);
  const [selectedMiracleModuleIndex, setSelectedMiracleModuleIndex] = useState(0);
  const [hoveredMiracleModuleIndex, setHoveredMiracleModuleIndex] = useState(null);
  const [selectedMiracleBrandIndex, setSelectedMiracleBrandIndex] = useState(0);
  const [selectedMiracleProductIndex, setSelectedMiracleProductIndex] = useState(0);
  const [miracleProductCarouselIndex, setMiracleProductCarouselIndex] = useState(0);
  const [miracleProductCarouselActive, setMiracleProductCarouselActive] = useState(false);
  const [miraclePreviewModes, setMiraclePreviewModes] = useState({});
  const [miracleExtendedCarouselIndex, setMiracleExtendedCarouselIndex] = useState({});
  const [ss4HeroScreens, setSs4HeroScreens] = useState({
    left: false,
    center: false,
    right: false
  });
  const [ss4HeroMoving, setSs4HeroMoving] = useState(false);
  const [ss4HeroHudTicker, setSs4HeroHudTicker] = useState({ motion: 0, tick: 0 });
  const [ss4HeroConfig, setSs4HeroConfig] = useState({
    showHorizon: false,
    showReticle: false,
    showCabin: false,
    showDots: false,
    vignette: false,
    blurEdge: false,
    lowDetail: false,
    infoLoad: "none"
  });
  const miracleCarouselRef = React.useRef(null);
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
    setHoveredDecathlonIndex(null);
    setSelectedMiracleModuleIndex(0);
    setHoveredMiracleModuleIndex(null);
    setSelectedMiracleBrandIndex(0);
    setSelectedMiracleProductIndex(0);
    setMiracleProductCarouselIndex(0);
    setMiracleProductCarouselActive(false);
    setMiraclePreviewModes({});
    setMiracleExtendedCarouselIndex({});
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
    setSs4HeroMoving(false);
    setSs4HeroHudTicker({ motion: 0, tick: 0 });
    setSs4HeroScreens({
      left: false,
      center: false,
      right: false
    });
  }, [slug]);
  useEffect(() => {
    if (slug !== "smart-solution-4-motion-comfort") return;
    const videos = Array.from(document.querySelectorAll("[data-ss4-hero-video='true']"));
    videos.forEach((video) => {
      video.muted = true;
      if (ss4HeroMoving) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [slug, ss4HeroMoving, ss4HeroScreens.left, ss4HeroScreens.center, ss4HeroScreens.right]);
  useEffect(() => {
    if (slug !== "smart-solution-4-motion-comfort" || !ss4HeroMoving) return;
    const syncScreens = () => {
      const videos = Array.from(document.querySelectorAll("[data-ss4-hero-video='true']"));
      const masterVideo = videos.find((video) => video.dataset.ss4Screen === "center") || videos[0];
      if (!masterVideo || !Number.isFinite(masterVideo.currentTime)) return;
      videos.forEach((video) => {
        if (video === masterVideo || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const targetTime = masterVideo.currentTime % video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.32) {
          video.currentTime = targetTime;
        }
      });
    };
    const syncTimer = window.setInterval(syncScreens, 700);
    return () => window.clearInterval(syncTimer);
  }, [slug, ss4HeroMoving]);
  useEffect(() => {
    if (slug !== "smart-solution-4-motion-comfort") return;
    if (!ss4HeroMoving && ss4HeroConfig.infoLoad !== "high") return;
    const ticker = window.setInterval(() => {
      setSs4HeroHudTicker((prev) => ({
        motion: prev.motion + (ss4HeroMoving ? 90 : 0),
        tick: prev.tick + 1
      }));
    }, 100);
    return () => window.clearInterval(ticker);
  }, [slug, ss4HeroMoving, ss4HeroConfig.infoLoad]);
  useEffect(() => {
    setMiracleProductCarouselActive(false);
    const node = miracleCarouselRef.current;
    if (project?.slug !== "miracle-miles" || selectedMiracleModuleIndex !== 0 || !node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setMiracleProductCarouselActive(true);
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [project?.slug, selectedMiracleModuleIndex, selectedMiracleBrandIndex, selectedMiracleProductIndex]);
  useEffect(() => {
    if (project?.slug !== "miracle-miles" || selectedMiracleModuleIndex !== 0 || !miracleProductCarouselActive) return;
    const interval = window.setInterval(() => {
      setMiracleProductCarouselIndex((prev) => (prev + 1) % 2);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [project?.slug, selectedMiracleModuleIndex, selectedMiracleBrandIndex, selectedMiracleProductIndex, miracleProductCarouselActive]);
  if (!project) return /* @__PURE__ */ React.createElement("div", {
    className: "pt-40 text-center font-bold text-xl"
  }, lang2 === "en" ? "Project not found." : "\u672A\u627E\u5230\u9879\u76EE\u3002");
  const renderFigure = (src, alt, caption, index) => /* @__PURE__ */ React.createElement("figure", {
    key: index,
    className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_42px_-28px_rgba(15,23,42,0.10)]"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => setCertificatePreview(src),
    className: "block w-full cursor-zoom-in bg-transparent text-left",
    "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片"
  }, /* @__PURE__ */ React.createElement("img", {
    src,
    alt: t(alt) || t(project.title),
    loading: project.slug === "passenger-screen-visual-impact" ? "eager" : "lazy",
    className: "w-full h-auto object-contain"
  })), caption && /* @__PURE__ */ React.createElement("figcaption", {
    className: "px-5 py-4 text-sm leading-relaxed text-zinc-500 border-t border-zinc-100"
  }, t(caption)));
  const renderPaperFigure = (src, alt, caption, index) => /* @__PURE__ */ React.createElement("figure", {
    key: index,
    className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_46px_-32px_rgba(15,23,42,0.14)]"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => setCertificatePreview(src),
    className: "block w-full cursor-zoom-in bg-transparent text-left",
    "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片"
  }, /* @__PURE__ */ React.createElement("img", {
    src,
    alt: t(alt) || t(project.title),
    loading: index === 0 ? "eager" : "lazy",
    className: "block w-full h-auto object-contain"
  })), caption && /* @__PURE__ */ React.createElement("figcaption", {
    className: "border-t border-zinc-100 bg-transparent px-5 py-4 text-sm leading-relaxed text-zinc-500"
  }, t(caption)));
  const [pdfViewerPage, setPdfViewerPage] = useState(0);
  const renderPdfViewer = (pages, section) => {
    const current = pdfViewerPage;
    const total = pages.length;
    const goTo = (idx) => {
      if (idx >= 0 && idx < total) setPdfViewerPage(idx);
    };
    return /* @__PURE__ */ React.createElement("div", {
      className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_42px_-28px_rgba(15,23,42,0.14)]"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "relative bg-zinc-950"
    }, /* @__PURE__ */ React.createElement("img", {
      src: pages[current].src,
      alt: pages[current].alt ? typeof pages[current].alt === "object" ? pages[current].alt.en || pages[current].alt.cn : pages[current].alt : "",
      loading: "lazy",
      className: "w-full h-auto object-contain mx-auto"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center justify-between px-5 py-4 border-t border-zinc-100 bg-transparent"
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
    }, /* @__PURE__ */ React.createElement("div", {
      className: "aspect-video w-full overflow-hidden bg-zinc-950"
    }, /* @__PURE__ */ React.createElement("video", {
      controls: true,
      playsInline: true,
      preload: "none",
      poster: getVideoPoster(sec.video, project.coverImage),
      className: "h-full w-full bg-zinc-950 object-contain"
    }, /* @__PURE__ */ React.createElement("source", {
      src: sec.video,
      type: "video/mp4"
    }))), sec.caption && /* @__PURE__ */ React.createElement("figcaption", {
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
      className: "relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.26),transparent_34%),linear-gradient(135deg,#0b0b0b,#171717_48%,#050505)]"
    }, sec.image ? /* @__PURE__ */ React.createElement("img", {
      src: sec.image,
      alt: t(sec.imageAlt) || t(sec.mediaLabel) || t(sec.title),
      loading: "lazy",
      className: "h-full w-full object-contain"
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
      className: "border-t border-white/10 bg-transparent px-5 py-4 text-sm leading-relaxed text-zinc-500"
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
      className: "block h-auto w-full select-none",
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
      className: "m-0 block bg-transparent p-0"
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
    className: "m-0 block w-full bg-transparent p-0 leading-none"
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
      preload: "none",
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
      className: "relative overflow-hidden rounded-[30px] border border-zinc-200/45 bg-transparent shadow-[0_22px_60px_-42px_rgba(15,23,42,0.24)]",
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
      className: `${riversideContentOpen ? "h-full overflow-y-auto" : "overflow-hidden"} bg-transparent leading-none`,
      style: riversideContentOpen ? {
        scrollbarWidth: "none"
      } : void 0
    }, renderRiversideArticleStack(verticalFrames)) : /* @__PURE__ */ React.createElement("div", {
      ref: riversideScrollRef,
      onMouseDown: handleRiversideDragStart,
      onMouseMove: handleRiversideDragMove,
      onMouseUp: handleRiversideDragEnd,
      onMouseLeave: handleRiversideDragEnd,
      className: `flex gap-0 overflow-x-auto bg-transparent select-none ${riversideDragging ? "cursor-grabbing" : "cursor-grab"}`,
      style: {
        scrollbarWidth: "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "relative shrink-0 bg-transparent",
      style: {
        width: horizontalCanvasWidth,
        height: riversideCanvasSize
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "absolute left-0 top-0 origin-top-left bg-transparent leading-none",
      style: {
        width: riversideCanvasSize,
        transform: "rotate(-90deg) translateX(-100%)",
        transformOrigin: "top left"
      }
    }, renderRiversideArticleStack(riversideArticleFrames))))));
  };
  const renderTouchNGoDetail = () => {
    const [intro, method, designTool, applications, wallOrganizer, documentation, outcome] = project.sections;
    const renderEditorialFigure = (item, key, className = "", imageClassName = "w-full h-auto object-contain") => /* @__PURE__ */ React.createElement("figure", { key, className: `touch-media overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)] ${className}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setCertificatePreview(item.previewSrc || item.src || item.image),
        className: "block w-full cursor-zoom-in overflow-hidden bg-transparent text-left",
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
    return /* @__PURE__ */ React.createElement("div", { className: "pt-32 md:pt-36 pb-28 px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1320px]" }, /* @__PURE__ */ React.createElement(
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
    )))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-10 md:mt-14" }, /* @__PURE__ */ React.createElement("figure", { className: "overflow-hidden rounded-[26px] border border-zinc-800/20 bg-zinc-950 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)]" }, /* @__PURE__ */ React.createElement("div", { className: "aspect-video w-full overflow-hidden bg-zinc-950" }, /* @__PURE__ */ React.createElement("video", { controls: true, playsInline: true, preload: "none", poster: "assets/portfolio/touch-n-go/video-poster.jpg", className: "block h-full w-full bg-zinc-950 object-contain" }, /* @__PURE__ */ React.createElement("source", { src: intro.video, type: "video/mp4" }))), /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-relaxed text-zinc-400 md:px-7" }, t(intro.caption)))), /* @__PURE__ */ React.createElement("section", { className: "touch-reveal space-y-10 pb-20 pt-36 md:pb-28 md:pt-44" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "01 / ", lang2 === "en" ? "Overview" : "\u9879\u76EE\u6982\u89C8"), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-900" }, t(intro.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-[36rem] text-base font-medium leading-[1.82] text-zinc-600 md:text-lg" }, t(intro.content))), /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl" }, renderEditorialFigure(
      {
        image: "assets/portfolio/touch-n-go/reusable-fastening-units.png",
        imageAlt: {
          en: "Touch-n-Go reusable fastening unit variants",
          cn: "Touch-n-Go 可复用连接单元形态"
        }
      },
      "touch-cover",
      "bg-transparent",
      "block h-auto w-full object-contain"
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
          className: "relative flex max-h-[92vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-[18px] bg-transparent shadow-[0_32px_100px_-24px_rgba(0,0,0,0.5)]",
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
    "coins-in-the-sky": "assets/portfolio/coins-in-the-sky/hero-video.mp4",
    "memory-parking-hmi": "assets/portfolio/memory-parking/memory-parking-promo-zh.mp4?v=20260710"
  };
  const heroImageBySlug = {
    "memory-parking-hmi": "assets/portfolio/memory-parking/hero-loop.gif?v=20260701"
  };
  const videoPosterBySrc = {
    "assets/portfolio/snap-inflatables/demo.mp4": "assets/portfolio/snap-inflatables/demo-poster.jpg",
    "assets/portfolio/thermosilicone/demo.mp4": "assets/portfolio/thermosilicone/demo-poster.jpg",
    "assets/portfolio/path/demo.mp4": "assets/portfolio/path/demo-poster.jpg",
    "assets/portfolio/path/touch-click-color.mp4": "assets/portfolio/path/touch-click-color-poster.jpg",
    "assets/portfolio/path/touch-hold-color.mp4": "assets/portfolio/path/touch-hold-color-poster.jpg",
    "assets/portfolio/artificial-sky/demo.mp4": "assets/portfolio/artificial-sky/demo-poster.jpg",
    "assets/portfolio/sonic-patrol/grand-challenge.mp4": "assets/portfolio/sonic-patrol/grand-challenge-poster.jpg",
    "assets/portfolio/coins-in-the-sky/hero-video.mp4": "assets/portfolio/coins-in-the-sky/hero-video-poster.jpg",
    "assets/portfolio/touch-n-go/video.mp4": "assets/portfolio/touch-n-go/video-poster.jpg",
    "assets/portfolio/memory-parking/memory-parking-promo-zh.mp4": "assets/portfolio/memory-parking/memory-parking-promo-zh-poster.png?v=20260710"
  };
  const videoAspectBySrc = {
    "assets/portfolio/memory-parking/memory-parking-hero.mp4": "aspect-[640/337]"
  };
  const getVideoPoster = (video, fallback = "") => videoPosterBySrc[(video || "").split("?")[0]] || fallback;
  const getVideoAspect = (video, fallback = "aspect-video") => videoAspectBySrc[(video || "").split("?")[0]] || fallback;
  const primaryVideo = heroVideoBySlug[project.slug] || null;
  const primaryEmbed = project.heroEmbed || null;
  const primaryImage = heroImageBySlug[project.slug] || project.coverImage;
  const heroImageFitsContain = project.heroImageFit === "contain";
  const primaryVideoSection = primaryVideo ? project.sections.find((section) => section.video === primaryVideo) : null;
  const activeCertificate = project.sections.find((section) => section.certificate?.src === certificatePreview);
  const activePreviewCrop = getPreviewCrop(certificatePreview);
  const renderEditorialImage = (item, key, options = {}) => {
    const src = item?.src || item?.image;
    if (!src) return null;
    const imageClassName = options.imageClassName || "block h-auto w-full object-contain";
    return /* @__PURE__ */ React.createElement(
      "figure",
      {
        key,
        className: `touch-media flex h-full flex-col overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)] ${options.className || ""}`
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: () => setCertificatePreview(src),
          className: `flex min-h-0 w-full flex-1 cursor-zoom-in items-center justify-center overflow-hidden bg-transparent text-left ${options.mediaClassName || ""}`,
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
      item.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 bg-transparent px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(item.caption))
    );
  };
	  const renderEditorialVideo = (video, caption, key, options = {}) => {
	    const poster = options.poster || getVideoPoster(video, project.coverImage);
	    const aspectClassName = options.aspectClassName || getVideoAspect(video);
	    const figureClassName = options.figureClassName || `touch-media overflow-hidden rounded-[26px] border border-zinc-800/20 bg-zinc-950 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)] ${options.className || ""}`;
	    const mediaClassName = options.mediaClassName || `w-full overflow-hidden bg-zinc-950 ${aspectClassName}`;
	    const videoClassName = options.videoClassName || "block h-full w-full bg-zinc-950 object-contain";
	    const captionClassName = options.captionClassName || "border-t border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-relaxed text-zinc-400 md:px-7";
	    return /* @__PURE__ */ React.createElement(
	      "figure",
	      {
	        key,
	        className: figureClassName
	      },
	      /* @__PURE__ */ React.createElement("div", { className: mediaClassName }, /* @__PURE__ */ React.createElement("video", {
	        controls: options.controls ?? true,
	        autoPlay: Boolean(options.autoPlay),
	        loop: Boolean(options.loop),
	        muted: Boolean(options.muted),
	        playsInline: true,
	        preload: options.preload || "none",
	        poster,
	        className: videoClassName
	      }, /* @__PURE__ */ React.createElement("source", { src: video, type: "video/mp4" }))),
	      caption && /* @__PURE__ */ React.createElement("figcaption", { className: captionClassName }, t(caption))
	    );
	  };
  const renderEditorialEmbed = (embedUrl, caption, key, options = {}) => {
    if (!embedUrl) return null;
    const aspectClassName = options.aspectClassName || "aspect-video";
    return /* @__PURE__ */ React.createElement(
      "figure",
      {
        key,
        className: `touch-media overflow-hidden rounded-[26px] border border-zinc-800/20 bg-zinc-950 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)] ${options.className || ""}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `w-full overflow-hidden bg-zinc-950 ${aspectClassName}` }, /* @__PURE__ */ React.createElement("iframe", {
        src: embedUrl,
        title: `${t(project.title)} video`,
        loading: "lazy",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowFullScreen: true,
        className: "block h-full w-full border-0 bg-zinc-950"
      })),
      caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-relaxed text-zinc-400 md:px-7" }, t(caption))
    );
  };
  const renderSS4MotionComfortHero = () => {
    const e = React.createElement;
    const text = (en, cn) => lang2 === "en" ? en : cn;
    const screenVideos = {
      left: "assets/portfolio/smart-solution-4-motion-comfort/ss4-left-motion.mp4",
      center: "assets/portfolio/smart-solution-4-motion-comfort/ss4-center-motion.mp4",
      right: "assets/portfolio/smart-solution-4-motion-comfort/ss4-right-motion.mp4"
    };
    const screenLabels = {
      left: text("Left Screen", "左屏"),
      center: text("Center Screen", "中间屏"),
      right: text("Right Screen", "右屏")
    };
    const placeholderLabels = {
      left: text("Not opened", "未开启"),
      center: text("Not cast", "未投送"),
      right: text("Not opened", "未开启")
    };
    const toggleScreen = (screen) => {
      setSs4HeroScreens((prev) => ({
        ...prev,
        [screen]: !prev[screen]
      }));
    };
    const toggleConfig = (key) => {
      setSs4HeroConfig((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    };
    const screenIsActive = (screen) => ss4HeroScreens[screen];
    const markerOptions = [
      { key: "showHorizon", label: text("Fixed horizon", "固定地平线") },
      { key: "showReticle", label: text("Center reticle", "中心参考准星") },
      { key: "showCabin", label: text("Cabin frame", "座舱前挡风框") },
      { key: "showDots", label: text("Edge dots", "边缘防晕圆点") }
    ];
    const effectOptions = [
      { key: "vignette", label: text("Vignette", "晕影暗角") },
      { key: "blurEdge", label: text("Edge blur", "边缘动态模糊") },
      { key: "lowDetail", label: text("Low detail", "低画质模式") }
    ];
    const infoOptions = [
      { key: "none", label: text("None", "无") },
      { key: "low", label: text("Low", "低") },
      { key: "high", label: text("High", "高") }
    ];
    const switchButton = (option) => {
      const active = Boolean(ss4HeroConfig[option.key]);
      return e(
        "button",
        {
          key: option.key,
          type: "button",
          onClick: () => toggleConfig(option.key),
          className: `flex items-center justify-between rounded-[10px] border px-3 py-2 text-left text-xs font-semibold transition ${active ? "border-cyan-400/45 bg-cyan-400/12 text-cyan-100" : "border-slate-700/80 bg-slate-900/60 text-slate-400 hover:border-slate-500"}`
        },
        e("span", null, option.label),
        e(
          "span",
          { className: `relative h-4 w-8 rounded-full transition ${active ? "bg-cyan-400" : "bg-slate-700"}` },
          e("span", {
            className: "absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition",
            style: { left: active ? "18px" : "2px" }
          })
        )
      );
    };
    const playScreenVideo = (event) => {
      const video = event.currentTarget;
      video.muted = true;
      if (!ss4HeroMoving) {
        video.pause();
        return;
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };
    const renderOverlay = (screen) => {
      const overlayNodes = [];
      const frameStyle = { aspectRatio: "16 / 9" };
      const cabinPoints = {
        left: "72,79 100,82 100,100 62,100",
        center: "0,82 25,79 75,79 100,82 100,100 0,100",
        right: "28,79 0,82 0,100 38,100"
      };
      const hudCodes = [0, 1, 2, 3].map((index) => {
        const value = ((ss4HeroHudTicker.tick + 1) * (index + 7) * 2654431) % 16777215;
        return Math.floor(value).toString(16).padStart(6, "0").toUpperCase().slice(0, 6);
      });
      if (ss4HeroConfig.showHorizon) {
        overlayNodes.push(e("div", { key: "horizon", className: "absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/60" }));
      }
      if (ss4HeroConfig.showReticle) {
        overlayNodes.push(e(
          "div",
          { key: "reticle", className: "absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/85" },
          e("span", { className: "absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" })
        ));
      }
      if (ss4HeroConfig.infoLoad !== "none" && screen === "center") {
        const velocityLabel = Math.round(ss4HeroHudTicker.motion / 10).toString();
        overlayNodes.push(e(
          "div",
          { key: "hud-load", className: "pointer-events-none absolute inset-0 z-10 font-mono text-[12px] text-cyan-300 [text-shadow:0_0_10px_rgba(34,211,238,0.55)]" },
          e(
            "div",
            { className: "absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 text-cyan-300" },
            e("span", { className: "absolute left-0 top-0 h-[25px] w-[25px] border-l border-t border-cyan-300" }),
            e("span", { className: "absolute right-0 top-0 h-[25px] w-[25px] border-r border-t border-cyan-300" }),
            e("span", { className: "absolute bottom-0 left-0 h-[25px] w-[25px] border-b border-l border-cyan-300" }),
            e("span", { className: "absolute bottom-0 right-0 h-[25px] w-[25px] border-b border-r border-cyan-300" }),
            e("span", { className: "absolute left-[-92px] top-1/2 w-20 -translate-y-1/2 text-right" }, "FOV: 110°"),
            e("span", { className: "absolute right-[-116px] top-1/2 w-24 -translate-y-1/2 text-left" }, `VEL: ${velocityLabel} M/S`)
          ),
          ss4HeroConfig.infoLoad === "high" ? e(
            React.Fragment,
            null,
            e(
              "div",
              { className: "absolute space-y-[2px] text-right text-cyan-300", style: { left: "calc(50% - 220px)", top: "calc(50% - 150px)" } },
              e("p", null, "[ SYS_NOMINAL ]"),
              e("p", null, "BATT: 87% | PWR: 42kW"),
              e("p", null, "ALT: 142m | HDG: 274")
            ),
            e(
              "div",
              { className: "absolute space-y-[2px] text-right text-cyan-300", style: { left: "calc(50% - 220px)", top: "calc(50% + 130px)" } },
              hudCodes.map((code) => e("p", { key: code }, `VALIDATING : 0x${code} <`))
            ),
            e(
              "div",
              { className: "absolute h-[120px] w-[120px] text-cyan-300", style: { left: "calc(50% + 200px)", top: "calc(50% - 160px)" } },
              e("span", { className: "absolute inset-0 rounded-full border border-cyan-300" }),
              e("span", { className: "absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300" }),
              e("span", { className: "absolute left-1/2 top-1/2 h-px w-[60px] origin-left bg-cyan-300", style: { animation: "ss4-radar-sweep 1.6s linear infinite" } }),
              e("span", { className: "absolute h-2 w-2 rounded-full bg-red-500", style: { left: "calc(50% + 16px)", top: "calc(50% - 29px)" } })
            ),
            e(
              "div",
              { className: "absolute space-y-[2px] text-left text-cyan-300", style: { left: "calc(50% + 220px)", top: "calc(50% + 130px)" } },
              [0, 1, 2, 3].map((index) => e("p", { key: index }, `> RADAR_TRK_0${index} : LOCKED`))
            )
          ) : null
        ));
      }
      if (ss4HeroConfig.showCabin) {
        overlayNodes.push(e(
          "svg",
          { key: "cabin", viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "pointer-events-none absolute inset-0 z-10 h-full w-full" },
          e("polygon", {
            points: cabinPoints[screen] || cabinPoints.center,
            fill: screen === "center" ? "#0f172a" : "rgba(15, 23, 42, 0.94)",
            stroke: screen === "center" ? "#1e293b" : "rgba(30, 41, 59, 0.9)",
            strokeWidth: "0.28",
            vectorEffect: "non-scaling-stroke"
          }),
          screen === "center" ? e("rect", { x: "35", y: "77.2", width: "30", height: "1.8", fill: "#1e293b" }) : null
        ));
      }
      if (ss4HeroConfig.showDots) {
        overlayNodes.push(e(
          "div",
          { key: "dots", className: "pointer-events-none absolute inset-0 z-10" },
          [1, 2, 3, 4, 5, 6, 7].map((step) => e(
            React.Fragment,
            { key: `v-${step}` },
            e("span", { className: "absolute h-[10px] w-[10px] rounded-full bg-white/60", style: { left: "15px", top: `calc(${step / 8 * 100}% - 5px)` } }),
            e("span", { className: "absolute h-[10px] w-[10px] rounded-full bg-white/60", style: { right: "15px", top: `calc(${step / 8 * 100}% - 5px)` } })
          )),
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((step) => e(
            React.Fragment,
            { key: `h-${step}` },
            e("span", { className: "absolute h-[10px] w-[10px] rounded-full bg-white/60", style: { left: `calc(${step / 12 * 100}% - 5px)`, top: "15px" } }),
            e("span", { className: "absolute h-[10px] w-[10px] rounded-full bg-white/60", style: { left: `calc(${step / 12 * 100}% - 5px)`, bottom: "15px" } })
          ))
        ));
      }
      if (ss4HeroConfig.lowDetail) {
        overlayNodes.push(e(
          "div",
          { key: "low-detail", className: "pointer-events-none absolute left-0 right-0 top-1/2 z-20 -translate-y-1/2 overflow-hidden", style: frameStyle },
          e("div", {
            className: "absolute inset-x-0 top-0 pointer-events-none",
            style: {
              height: "37.5%",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              background: "rgba(0,0,0,0.08)",
              opacity: 0.8
            }
          }),
          e("div", {
            className: "absolute inset-x-0 pointer-events-none",
            style: {
              top: "37.5%",
              height: "12.5%",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0))",
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              opacity: 0.8
            }
          })
        ));
      }
      if (ss4HeroConfig.vignette) {
        overlayNodes.push(e(
          "div",
          {
            key: "vignette-overlay",
            className: "pointer-events-none absolute left-0 right-0 top-1/2 z-30 -translate-y-1/2 overflow-hidden transition-opacity duration-300",
            style: {
              ...frameStyle,
              background: "radial-gradient(ellipse at center, transparent 44%, rgba(0,0,0,0.96) 100%)",
              boxShadow: "inset 0 0 220px rgba(0,0,0,1)"
            }
          }
        ));
      }
      if (ss4HeroConfig.blurEdge) {
        overlayNodes.push(e(
          "div",
          {
            key: "edge-blur-overlay",
            className: "pointer-events-none absolute left-0 right-0 top-1/2 z-40 -translate-y-1/2 overflow-hidden transition-opacity duration-300",
            style: {
              ...frameStyle,
              background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent 16%, transparent 84%, rgba(0,0,0,0.5))",
              backdropFilter: "blur(3.333px)",
              WebkitBackdropFilter: "blur(3.333px)",
              maskImage: "linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)"
            }
          }
        ));
      }
      return overlayNodes;
    };
    const renderScreenSlot = (screen) => {
      const active = screenIsActive(screen);
      const placementClass = {
        left: "md:absolute md:right-[75%] md:top-1/2 md:w-1/2 md:origin-right md:[transform:translateY(-50%)_rotateY(90deg)]",
        center: "md:absolute md:left-1/2 md:top-1/2 md:w-1/2 md:origin-center md:[transform:translateX(-50%)_translateY(-50%)]",
        right: "md:absolute md:left-[75%] md:top-1/2 md:w-1/2 md:origin-left md:[transform:translateY(-50%)_rotateY(-90deg)]"
      };
      const videoClassName = [
        "block h-full w-full object-cover transition duration-500",
        active ? "opacity-100" : "opacity-0",
        active && ss4HeroMoving ? "ss4-motion-active" : "",
        "scale-100"
      ].filter(Boolean).join(" ");
      const screenContent = [
        e("video", {
          key: "video",
          src: screenVideos[screen],
          autoPlay: ss4HeroMoving,
          muted: true,
          loop: true,
          playsInline: true,
          preload: "auto",
          disablePictureInPicture: true,
          "data-ss4-hero-video": "true",
          "data-ss4-screen": screen,
          onLoadedData: playScreenVideo,
          onCanPlay: playScreenVideo,
          className: videoClassName
        }),
        ...(active ? renderOverlay(screen) : [
        e(
          "div",
          { key: "empty", className: "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-950 text-slate-600" },
          e("div", { className: "h-10 w-16 rounded-[10px] border border-slate-800 bg-slate-900/70" }),
          e(
            "span",
            { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500" },
            placeholderLabels[screen]
          )
        )
        ])
      ];
      return e(
        "div",
        {
          key: screen,
          className: `relative aspect-video w-full overflow-hidden rounded-[14px] border bg-black shadow-[0_18px_58px_-42px_rgba(8,145,178,0.72)] md:[backface-visibility:hidden] md:[transform-style:preserve-3d] ${placementClass[screen]} ${screen === "center" ? "md:z-20" : "md:z-10"} ${active ? "border-cyan-300/35" : "border-slate-700/75"}`
        },
        ...screenContent,
        e("div", { className: "absolute left-3 top-3 z-20 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-white/82 backdrop-blur-md" }, screenLabels[screen])
      );
    };
    const primaryButtonClass = (active, color = "cyan") => {
      if (color === "green") return active ? "border-red-400/55 bg-red-500/12 text-red-300" : "border-emerald-400/55 bg-emerald-400/12 text-emerald-300";
      return active ? "border-cyan-400/55 bg-cyan-400/12 text-cyan-200" : "border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-500";
    };
    const controlPanel = e(
      "div",
      { className: "lg:col-span-8" },
      e(
        "div",
        { className: "flex flex-wrap gap-2 rounded-[16px] border border-slate-800 bg-slate-900/80 p-3" },
        e(
          "button",
          {
            type: "button",
            onClick: () => setSs4HeroMoving((prev) => !prev),
            className: `rounded-[10px] border px-4 py-2 text-sm font-bold transition ${primaryButtonClass(ss4HeroMoving, "green")}`
          },
          ss4HeroMoving ? text("Stop motion simulation", "停止运动模拟") : text("Start motion simulation", "启动运动模拟")
        ),
        e(
          "button",
          {
            type: "button",
            onClick: () => toggleScreen("center"),
            className: `rounded-[10px] border px-4 py-2 text-sm font-bold transition ${primaryButtonClass(ss4HeroScreens.center)}`
          },
          ss4HeroScreens.center ? text("Stop center cast", "停止中间屏投送") : text("Cast center screen", "投送中间屏")
        ),
        e(
          React.Fragment,
          null,
          e(
            "button",
            {
              type: "button",
              onClick: () => toggleScreen("left"),
              className: `rounded-[10px] border px-4 py-2 text-sm font-bold transition ${primaryButtonClass(ss4HeroScreens.left)}`
            },
            ss4HeroScreens.left ? text("Close left screen", "关闭左屏") : text("Open left screen", "打开左屏")
          ),
          e(
            "button",
            {
              type: "button",
              onClick: () => toggleScreen("right"),
              className: `rounded-[10px] border px-4 py-2 text-sm font-bold transition ${primaryButtonClass(ss4HeroScreens.right)}`
            },
            ss4HeroScreens.right ? text("Close right screen", "关闭右屏") : text("Open right screen", "打开右屏")
          )
        ),
        e(
          "button",
          {
            type: "button",
            onClick: () => {
              setSs4HeroMoving(false);
            },
            className: "rounded-[10px] bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
          },
          text("End and record", "结束并记录")
        )
      )
    );
    const configPanel = e(
      "div",
      { className: "rounded-[16px] border border-slate-800 bg-slate-900/82 p-4 lg:col-span-4" },
      e("div", { className: "mb-4 border-b border-white/10 pb-3" }, e("p", { className: "text-sm font-bold text-cyan-300" }, text("Visual Parameter Configuration", "视觉参数配置"))),
      e(
        "div",
        { className: "space-y-5" },
        e(
          "div",
          null,
          e("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500" }, text("Visual marker layer", "视觉标记层")),
          e("div", { className: "space-y-2" }, markerOptions.map(switchButton))
        ),
        e(
          "div",
          null,
          e("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500" }, text("Image enhancement / performance", "画面增强 / 性能")),
          e("div", { className: "space-y-2" }, effectOptions.map(switchButton))
        ),
        e(
          "div",
          null,
          e("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500" }, text("HUD information load", "HUD 信息负载")),
          e(
            "div",
            { className: "grid grid-cols-3 gap-2" },
            infoOptions.map((option) => e(
              "button",
              {
                key: option.key,
                type: "button",
                onClick: () => setSs4HeroConfig((prev) => ({ ...prev, infoLoad: option.key })),
                className: `rounded-[10px] border px-2 py-2 text-xs font-bold transition ${ss4HeroConfig.infoLoad === option.key ? "border-cyan-300 bg-cyan-400/80 text-white" : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500"}`
              },
              option.label
            ))
          )
        )
      )
    );
    return e(
      "section",
      { className: "touch-reveal mt-10 md:mt-14" },
      e(
        "div",
        { className: "overflow-hidden rounded-[30px] border border-slate-800 bg-slate-950 text-slate-100 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.55)]" },
        e(
          "div",
          { className: "min-h-[620px] w-full p-3 md:aspect-video md:min-h-0 md:p-4" },
          e("div", { className: "relative flex h-full flex-col justify-center gap-3 md:block md:[perspective:1180px] md:[perspective-origin:50%_48%] md:[transform-style:preserve-3d]" }, ["left", "center", "right"].map(renderScreenSlot))
        ),
        e("div", { className: "grid grid-cols-1 gap-5 border-t border-white/10 bg-slate-950/96 p-4 md:p-5 lg:grid-cols-12" }, controlPanel, configPanel)
      )
    );
  };
  const renderEditorialMediaPanel = (sec, index) => {
    const mediaNotes = t(sec.mediaNotes) || [];
    const visualBreakdown = t(sec.visualBreakdown) || [];
    const panelNumber = String(index + 1).padStart(2, "0");
    if (sec.image) {
      return /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)]" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(59,130,246,0.10),transparent_38%),linear-gradient(135deg,#f8fafc,#ffffff_48%,#eef2ff)]" }, /* @__PURE__ */ React.createElement(
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
          className: "h-full w-full object-contain"
        }
      )
    )), visualBreakdown.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-px border-t border-zinc-100 bg-zinc-100 sm:grid-cols-3" }, visualBreakdown.map((item, itemIndex) => /* @__PURE__ */ React.createElement("div", { key: itemIndex, className: "bg-white px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400" }, lang2 === "en" ? `Visual ${itemIndex + 1}` : `\u753B\u9762 ${itemIndex + 1}`), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold leading-snug text-zinc-700" }, typeof item === "object" ? t(item) : item)))), sec.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 bg-transparent px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(sec.caption)));
    }
    return /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white/80 shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)]" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_54%,#eef4ff_100%)] p-6 md:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "mb-7 flex flex-col gap-5 md:flex-row md:items-start md:justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "mb-5 inline-flex rounded-full border border-zinc-200 bg-white/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500" }, panelNumber), /* @__PURE__ */ React.createElement("p", { className: "max-w-[28rem] text-[clamp(1.45rem,2.4vw,2.35rem)] font-semibold leading-[1.05] text-zinc-900" }, t(sec.mediaLabel)), mediaNotes.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-2" }, mediaNotes.map((note, noteIndex) => /* @__PURE__ */ React.createElement("span", { key: noteIndex, className: "rounded-full border border-zinc-200 bg-white/78 px-3 py-1.5 text-[11px] font-semibold text-zinc-600" }, note)))), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600/70 md:pt-1" }, lang2 === "en" ? "Validation frame" : "\u9A8C\u8BC1\u6846\u67B6")), visualBreakdown.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-3" }, visualBreakdown.map((item, itemIndex) => /* @__PURE__ */ React.createElement("div", { key: itemIndex, className: "rounded-[18px] border border-zinc-200/70 bg-white/82 p-4 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.22)]" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400" }, lang2 === "en" ? `Direction ${itemIndex + 1}` : `\u65B9\u5411 ${itemIndex + 1}`), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold leading-snug text-zinc-700" }, typeof item === "object" ? t(item) : item))))), sec.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "border-t border-zinc-100 bg-transparent px-5 py-4 text-sm leading-[1.65] text-zinc-500" }, t(sec.caption)));
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
        className: "h-auto w-full object-contain bg-white"
      }
    ))));
  };
  const renderSectionMedia = (sec, index) => {
    const showVideo = sec.video && sec.video !== primaryVideo;
    const videos = sec.videos || [];
    const images = [
      ...sec.image ? [{ src: sec.image, alt: sec.imageAlt, caption: sec.caption }] : [],
      ...sec.images || []
    ];
    const mediaItems = [];
    const useEqualThreeImageRow = sec.title?.en === "Literature Supports and Model Tests" && images.length === 3;
    const useDocumentSequenceLayout = sec.imageLayout === "documentSequence";
    if (showVideo) {
      mediaItems.push(renderEditorialVideo(sec.video, sec.caption, `video-${index}`));
    }
	    if (videos.length > 0) {
	      mediaItems.push(
	        /* @__PURE__ */ React.createElement("div", { key: `videos-${index}`, className: "grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch" }, videos.map((video, videoIndex) => renderEditorialVideo(video.src, video.caption, `video-${index}-${videoIndex}`, {
	          figureClassName: "touch-media min-h-0 overflow-hidden rounded-[24px] border border-zinc-200/45 bg-white shadow-[0_18px_54px_-42px_rgba(15,23,42,0.20)]",
	          mediaClassName: "aspect-video w-full overflow-hidden bg-white",
	          videoClassName: "block h-full w-full bg-white object-cover",
	          controls: false,
	          autoPlay: true,
	          loop: true,
	          muted: true,
	          preload: "auto",
	          captionClassName: "border-t border-zinc-100 bg-white px-5 py-4 text-sm leading-[1.65] text-zinc-500"
	        })))
	      );
	    }
    if (sec.mediaLabel) {
      mediaItems.push(/* @__PURE__ */ React.createElement("div", { key: `panel-${index}` }, renderEditorialMediaPanel(sec, index)));
    } else if (images.length === 1) {
      mediaItems.push(
        renderEditorialImage(images[0], `image-${index}-0`, {
          className: "w-full",
          imageClassName: "block h-auto w-full object-contain"
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
        useDocumentSequenceLayout ? /* @__PURE__ */ React.createElement("div", { key: `images-${index}`, className: "grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start" }, images.map((image, imageIndex) => renderEditorialImage(image, `image-${index}-${imageIndex}`, {
          className: `min-h-0 !h-auto shadow-none ${image.className || ""}`,
          mediaClassName: image.mediaClassName || "!flex-none",
          imageClassName: image.imageClassName || "block h-auto w-full object-contain"
        }))) : useEqualThreeImageRow ? /* @__PURE__ */ React.createElement("div", { key: `images-${index}`, className: "grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch" }, images.map((image, imageIndex) => renderEditorialImage(image, `image-${index}-${imageIndex}`, {
          className: "min-h-0",
          mediaClassName: "aspect-[4961/3508] !flex-none",
          imageClassName: "block h-full w-full object-contain"
        }))) : /* @__PURE__ */ React.createElement("div", { key: `images-${index}`, className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, imageIndex) => renderEditorialImage(image, `image-${index}-${imageIndex}`, {
          className: imageIndex === 0 && images.length % 2 === 1 ? "md:col-span-2" : "",
          mediaClassName: imageIndex === 0 && images.length % 2 === 1 ? "" : "aspect-[4/3]",
          imageClassName: imageIndex === 0 && images.length % 2 === 1 ? "block h-auto w-full object-contain" : "block h-full w-full object-contain"
        })))
      );
    }
    return mediaItems.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "min-w-0 space-y-5" }, mediaItems) : null;
  };
  const renderEditorialSection = (sec, index) => {
    if (sec.layout === "pdf-viewer" && sec.pdfPages?.length) {
      const text = renderSectionText(sec, index);
      return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-t border-zinc-200/80 py-20 first:border-t-0 first:pt-36 md:py-28 md:first:pt-44" }, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end lg:gap-14" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-10" }, text)), renderPdfViewer(sec.pdfPages, sec));
    }
    const media = renderSectionMedia(sec, index);
    const isDivider = Boolean(sec.divider);
    const text = renderSectionText(sec, index);
    if (isDivider) {
      return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-y border-zinc-200/80 py-20 md:py-28" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-4xl text-center" }, text), media && /* @__PURE__ */ React.createElement("div", { className: "mt-10" }, media));
    }
    if (!media) {
      return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-t border-zinc-200/80 py-20 first:border-t-0 first:pt-36 md:py-28 md:first:pt-44" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl" }, text));
    }
  const useFullWidthMedia = Boolean(sec.fullWidthMedia || sec.images?.length > 1 || sec.videos?.length > 0 || sec.video && sec.video !== primaryVideo || sec.mediaLabel);
    return /* @__PURE__ */ React.createElement("section", { key: index, className: "touch-reveal border-t border-zinc-200/80 py-20 first:border-t-0 first:pt-36 md:py-28 md:first:pt-44" }, useFullWidthMedia ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "mb-10 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end lg:gap-14" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-10" }, text)), media) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5" }, text), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7" }, media)));
  };
  const renderEA01UDetail = () => {
    const renderEA01UHeader = (number, title) => /* @__PURE__ */ React.createElement("div", {
      className: "mb-10 max-w-4xl"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "min-w-0"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600"
    }, number), /* @__PURE__ */ React.createElement("h3", {
      className: "text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900"
    }, title)));
    const renderEA01UChapterHeader = (eyebrow, title, description) => /* @__PURE__ */ React.createElement("header", {
      className: "touch-reveal max-w-4xl border-t border-zinc-200/80 pt-12 md:pt-16"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600"
    }, eyebrow), /* @__PURE__ */ React.createElement("h2", {
      className: "text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-950"
    }, title), /* @__PURE__ */ React.createElement("p", {
      className: "mt-5 max-w-[68ch] text-base font-medium leading-[1.8] text-zinc-600 md:text-lg"
    }, description));
    const vpaGifs = [{
      src: "assets/portfolio/ea01u/vpa-balance-bird.gif?v=20260714-hd-720",
      label: {
        en: "Balance Bird",
        cn: "平衡鸟"
      }
    }, {
      src: "assets/portfolio/ea01u/vpa-music.gif?v=20260714-hd-720",
      label: {
        en: "Music",
        cn: "普通音乐"
      }
    }, {
      src: "assets/portfolio/ea01u/vpa-high-energy-music.gif?v=20260714-hd-720",
      label: {
        en: "High-energy Music",
        cn: "高能音乐"
      }
    }, {
      src: "assets/portfolio/ea01u/vpa-fishing.gif?v=20260714-hd-720",
      label: {
        en: "Fishing",
        cn: "钓鱼"
      }
    }];
    const vpaPlazaPersonas = [{
      slug: "default-custom",
      name: {
        en: "Default & Custom",
        cn: "默认&自定义"
      },
      definition: {
        en: "Freely define your AI companion's persona, personality, and ability preferences to create an in-car VPA that fits your habits and makes every conversation feel more intuitive.",
        cn: "支持用户自由定义专属 AI 伙伴的人设、性格与能力偏好，打造更符合个人习惯的车载 VPA，让每一次对话都更有默契。"
      }
    }, {
      slug: "secretary",
      name: {
        en: "Personal Secretary",
        cn: "贴心秘书"
      },
      definition: {
        en: "A dedicated travel AI secretary with full-scenario intelligent services that plans routes, arranges transport, and handles itinerary reminders for calm, efficient journeys.",
        cn: "搭载全场景智能服务的专属出行 AI 秘书，一站式规划路线、安排车次、提醒行程琐事，妥善打理出行各类事务，让每一段旅途都从容省心、高效顺畅。"
      }
    }, {
      slug: "road-trip",
      name: {
        en: "Road-trip Assistant",
        cn: "自驾游助手"
      },
      definition: {
        en: "Designed for road trips, nearby escapes, and urban exploration, it plans routes and recommends activities and rest stops along the way so every drive feels easier, freer, and more fun.",
        cn: "面向自驾游、周边游和城市漫游等出行场景，智能规划路线、推荐沿途玩乐与休息点，陪你发现旅途惊喜，让每一段自驾都更轻松、有趣、自由。"
      }
    }, {
      slug: "child-care",
      name: {
        en: "Child Care",
        cn: "儿童关怀"
      },
      definition: {
        en: "A child-focused AI VPA combining safety guidance with playful companionship, proactively reminding children about seat belts and risky behavior in ways they enjoy.",
        cn: "儿童专属，打造安全守护与趣味陪伴式 AI VPA，主动提醒安全带、危险行为等风险，用孩子更喜欢的方式互动，让亲子出行更安心、更有乐趣。"
      }
    }, {
      slug: "emotional-healing",
      name: {
        en: "Emotional Wellbeing",
        cn: "情绪疗愈"
      },
      definition: {
        en: "For anxious, tired, irritated, or low driving moments, it senses the user's state and uses gentle conversation, breathing guidance, and ambience adjustments to help restore calm and energy.",
        cn: "面向焦虑、疲惫、烦躁、低落等驾驶情绪场景，细腻感知用户状态，并通过温柔对话、呼吸与氛围调节，陪你慢慢放松下来，恢复内心能量。"
      }
    }];
    const vpaPlazaStates = [{
      slug: "default",
      label: {
        en: "Default",
        cn: "默认"
      }
    }, {
      slug: "listening",
      label: {
        en: "Listening",
        cn: "聆听"
      }
    }, {
      slug: "thinking",
      label: {
        en: "Thinking",
        cn: "思考"
      }
    }, {
      slug: "broadcast",
      label: {
        en: "Speaking",
        cn: "播报"
      }
    }, {
      slug: "error",
      label: {
        en: "Error",
        cn: "错误"
      }
    }];
    const introductionSection = /* @__PURE__ */ React.createElement("section", {
      className: "pb-16 md:pb-20"
    }, renderEA01UChapterHeader("INTRODUCTION", lang2 === "en" ? "Introduction" : "项目介绍", lang2 === "en" ? "EA01U is Desay SV's flagship AI intelligent cockpit platform for next-generation smart vehicles. Built on a high-performance cockpit domain controller, an edge-cloud integrated architecture, and multimodal AI, the project explores interaction methods including AI Agents, 3D HMI, multiscreen collaboration, voice, and touchless gestures. It also supports unified coordination across cockpit, driving, parking, and cross-device tasks." : "EA01U 是德赛西威面向下一代智能汽车打造的旗舰级 AI 智能座舱平台。项目以高性能座舱域控、端云融合架构和多模态 AI 为基础，探索 AI Agent、3D HMI、多屏协同、语音及隔空手势等交互方式，并支持座舱、驾驶、泊车和跨设备任务的统一协同。"), /* @__PURE__ */ React.createElement("figure", {
      className: "mt-10 aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/launcher-balance-bird.mp4",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "data-ea01u-launcher-video": "true",
      className: "block h-full w-full object-cover"
    })));
    const researchChapterHeader = renderEA01UChapterHeader("DESIGN RATIONALE", lang2 === "en" ? "Design Rationale" : "设计推演", lang2 === "en" ? "Research across technical architecture, interaction patterns, voice persona, and vehicle-domain capabilities establishes the rationale and actionable principles for the experience design." : "从技术架构、交互范式、语音人格与垂域能力等维度建立设计依据，并将研究结论转化为可执行的体验原则。");
    const outcomesChapterHeader = renderEA01UChapterHeader("DESIGN OUTCOMES", lang2 === "en" ? "Experience Design & Implementation" : "体验设计与方案落地", lang2 === "en" ? "Building on those insights, the work translates core cockpit concepts into designed and prototyped experiences across Launcher, VPA, AI Storyline, and personalization." : "基于前期洞察，完成 Launcher、VPA、AI 故事线与个性化能力等核心座舱体验方案，并通过动态原型呈现关键交互。");
    const launcherCardEditingSection = /* @__PURE__ */ React.createElement("section", {
      className: "touch-reveal border-t border-zinc-200/80 py-20 md:py-28"
    }, renderEA01UHeader("02", lang2 === "en" ? "Launcher Card Editing" : "Launcher 卡片编辑"), /* @__PURE__ */ React.createElement("div", {
      className: "space-y-6 md:space-y-8"
    }, /* @__PURE__ */ React.createElement("figure", {
      className: "w-full"
    }, /* @__PURE__ */ React.createElement("figcaption", {
      className: "mb-3 text-xs font-medium text-zinc-500 md:text-sm"
    }, lang2 === "en" ? "Adaptive Card Swapping" : "卡片互换自适应"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/launcher-card-reorder.mp4?v=20260712-launcher-display-only-v4",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "data-ea01u-launcher-card-video": "reorder",
      className: "block h-full w-full object-cover"
    }))), /* @__PURE__ */ React.createElement("figure", {
      className: "w-full"
    }, /* @__PURE__ */ React.createElement("figcaption", {
      className: "mb-3 text-xs font-medium text-zinc-500 md:text-sm"
    }, lang2 === "en" ? "Drag to Reorder" : "拖拽换位"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/launcher-card-drag.mp4",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "data-ea01u-launcher-card-video": "drag",
      className: "block h-full w-full object-cover"
    })))));
    const renderSimulatedClick = (target, left, top, animation) => /* @__PURE__ */ React.createElement("div", {
      className: "pointer-events-none absolute z-30 opacity-0",
      style: {
        left,
        top,
        width: "1.5625%",
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
        animation
      },
      "data-ea01u-click-target": target
    }, /* @__PURE__ */ React.createElement("svg", {
      viewBox: "0 0 40 40",
      "aria-hidden": "true",
      className: "absolute inset-0 block h-full w-full overflow-visible"
    }, /* @__PURE__ */ React.createElement("circle", {
      cx: "20",
      cy: "20",
      r: "18",
      fill: "#fff",
      fillOpacity: "0.32",
      stroke: "#fff",
      strokeWidth: "4"
    })));
    const storylineAnimationStyles = `
      @keyframes ea01u-storyline-popup {
        0%, 29.99% { visibility: hidden; }
        30%, 74.99% { visibility: visible; }
        75%, 100% { visibility: hidden; }
      }
      @keyframes ea01u-storyline-click {
        0%, 19.99%, 30%, 100% { opacity: 0; }
        20%, 29.99% { opacity: 1; }
      }
      @keyframes ea01u-storyline-close-click {
        0%, 64.99%, 75%, 100% { opacity: 0; }
        65%, 74.99% { opacity: 1; }
      }
    `;
    const renderEA01UFigureLabel = (en, cn) => /* @__PURE__ */ React.createElement("figcaption", {
      className: "mb-3 text-xs font-medium text-zinc-500 md:text-sm"
    }, lang2 === "en" ? en : cn);
    const storylineSection = /* @__PURE__ */ React.createElement("section", {
      className: "touch-reveal border-t border-zinc-200/80 py-20 md:py-28"
    }, renderEA01UHeader("03", lang2 === "en" ? "Experience Journey" : "体验旅程"), /* @__PURE__ */ React.createElement("figure", {
      className: "w-full"
    }, renderEA01UFigureLabel("Proactive Welcome", "上车主动问候"), /* @__PURE__ */ React.createElement("div", {
      className: "relative aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement("style", null, storylineAnimationStyles), /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/ai-storyline.jpg",
      alt: lang2 === "en" ? "EA01U AI storyline dashboard without back button" : "移除返回按钮的 EA01U AI 故事线画面",
      loading: "lazy",
      "data-ea01u-ai-storyline": "true",
      className: "absolute inset-0 block h-full w-full object-cover"
    }), /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/ai-storyline-scratch-popup.png?v=20260713-storyline-popup",
      alt: lang2 === "en" ? "Sentinel video popup for the vehicle scratch alert" : "车身剐蹭哨兵视频弹窗",
      loading: "eager",
      decoding: "sync",
      "data-ea01u-ai-storyline-popup": "true",
      className: "invisible absolute block object-cover rounded-[clamp(5px,0.65vw,14px)]",
      style: {
        left: "32.6171875%",
        top: "10%",
        width: "26.7578125%",
        height: "46.875%",
        animation: "ea01u-storyline-popup 8.4s step-end infinite"
      }
    }), renderSimulatedClick("storyline-scratch", "42.4%", "56.2%", "ea01u-storyline-click 8.4s linear infinite"), renderSimulatedClick("storyline-close", "33.95%", "14.2%", "ea01u-storyline-close-click 8.4s linear infinite"))), /* @__PURE__ */ React.createElement("figure", {
      className: "mt-6 w-full md:mt-8",
      "data-ea01u-ai-storyline-brief": "true"
    }, renderEA01UFigureLabel("AI Briefing", "AI 简报"), /* @__PURE__ */ React.createElement("div", {
      className: "relative aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/ai-storyline-brief.webp?v=20260713-static-brief",
      alt: lang2 === "en" ? "AI briefing preference screen" : "AI 简报偏好页面",
      loading: "lazy",
      className: "absolute inset-0 block h-full w-full object-cover"
    }))), /* @__PURE__ */ React.createElement("figure", {
      className: "mt-6 w-full md:mt-8",
      "data-ea01u-ai-storyline-fog-light": "true"
    }, renderEA01UFigureLabel("Fog Light Control", "雾灯控制"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/ai-storyline-fog-on.webp?v=20260713-fog-light",
      alt: lang2 === "en" ? "Fog lights switched on" : "雾灯已开启页面",
      loading: "lazy",
      "data-ea01u-ai-storyline-fog-light-state": "on",
      className: "block h-full w-full object-cover"
    }))), /* @__PURE__ */ React.createElement("figure", {
      className: "mt-6 w-full md:mt-8",
      "data-ea01u-ai-storyline-call-journey": "true"
    }, renderEA01UFigureLabel("Call Journey", "电话旅程"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/ai-storyline-call-journey.mp4?v=20260715-call-6s",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "aria-label": lang2 === "en" ? "Phone call journey from dialing through call summary" : "从拨号到通话小结的场景跳转演示",
      className: "block h-full w-full object-cover"
    }))), /* @__PURE__ */ React.createElement("figure", {
      className: "mt-6 w-full md:mt-8",
      "data-ea01u-ai-storyline-music": "true"
    }, renderEA01UFigureLabel("Music Playback", "音乐播放"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/ai-storyline-music.webp?v=20260713-storyline-music",
      alt: lang2 === "en" ? "AI storyline music playback screen" : "AI 故事线歌曲播放页面",
      loading: "lazy",
      className: "block h-full w-full object-cover"
    }))));
    const vpaAnimationStyles = `
      @keyframes ea01u-ai-view {
        0%, 49.99% { visibility: hidden; }
        50%, 99.99% { visibility: visible; }
        100% { visibility: hidden; }
      }
      @keyframes ea01u-ai-click {
        0%, 40.99%, 50%, 100% { opacity: 0; }
        41%, 49.99% { opacity: 1; }
      }
      @keyframes ea01u-actions-click {
        0%, 90.99% { opacity: 0; }
        91%, 99.99% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    const vpaFigure = /* @__PURE__ */ React.createElement("figure", {
      className: "relative mt-12 aspect-[16/5] w-full overflow-hidden",
      "data-ea01u-vpa-mode": "animated"
    }, /* @__PURE__ */ React.createElement("style", null, vpaAnimationStyles), /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/vpa-action-library.jpg",
      alt: lang2 === "en" ? "VPA action library" : "VPA 动作库",
      loading: "eager",
      decoding: "sync",
      "data-ea01u-vpa-view": "actions",
      className: "absolute inset-0 block h-full w-full object-cover"
    }), /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/vpa-ai-creation.jpg",
      alt: lang2 === "en" ? "VPA AI creation" : "VPA AI 创作",
      loading: "eager",
      decoding: "sync",
      "data-ea01u-vpa-view": "ai",
      className: "invisible absolute inset-0 block h-full w-full object-cover",
      style: {
        animation: "ea01u-ai-view 8.24s step-end infinite"
      }
    }), renderSimulatedClick("ai", "47.7%", "9.8%", "ea01u-ai-click 8.24s linear infinite"), renderSimulatedClick("actions", "41.1%", "9.8%", "ea01u-actions-click 8.24s linear infinite"));
    const gifRow = /* @__PURE__ */ React.createElement("div", {
      className: "mt-12",
      "data-ea01u-gif-row": "true"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "mb-5 text-sm font-bold text-zinc-700 md:text-base"
    }, lang2 === "en" ? "Preset VPA Actions" : "预设 VPA 动作"), /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-4 gap-3 md:gap-5"
    }, vpaGifs.map((item) => /* @__PURE__ */ React.createElement("figure", {
      key: item.src,
      className: "min-w-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "aspect-square w-full overflow-hidden bg-zinc-50/70"
    }, /* @__PURE__ */ React.createElement("img", {
      src: item.src,
      alt: t(item.label),
      loading: "lazy",
      "data-ea01u-vpa-gif": t(item.label),
      className: "block h-full w-full object-contain"
    }))))));
    const vpaOutfitVideos = /* @__PURE__ */ React.createElement("div", {
      className: "mt-12 space-y-6 md:space-y-8",
      "data-ea01u-vpa-outfit-videos": "true"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "mb-5 text-sm font-bold text-zinc-700 md:text-base"
    }, lang2 === "en" ? "Desktop Entry" : "桌面入口"), /* @__PURE__ */ React.createElement("figure", {
      className: "w-full"
    }, /* @__PURE__ */ React.createElement("figcaption", {
      className: "mb-3 text-xs font-medium text-zinc-500 md:text-sm"
    }, lang2 === "en" ? "Not generated (default state)" : "未生成时（默认态）"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/vpa-outfit-guidance.mp4",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "aria-label": lang2 === "en" ? "VPA not generated default state" : "VPA 未生成时默认态",
      "data-ea01u-vpa-outfit-video": "guidance",
      className: "block h-full w-full object-cover"
    }))), /* @__PURE__ */ React.createElement("figure", {
      className: "w-full"
    }, /* @__PURE__ */ React.createElement("figcaption", {
      className: "mb-3 text-xs font-medium text-zinc-500 md:text-sm"
    }, lang2 === "en" ? "Generating in the background" : "后台生成时"), /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/5] w-full overflow-hidden"
    }, /* @__PURE__ */ React.createElement(DeferredVideo, {
      src: "assets/portfolio/ea01u/vpa-outfit-generating.mp4",
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      "aria-label": lang2 === "en" ? "VPA generating in the background" : "VPA 后台生成时",
      "data-ea01u-vpa-outfit-video": "generating",
      className: "block h-full w-full object-cover"
    }))));
    const vpaSection = /* @__PURE__ */ React.createElement("section", {
      className: "touch-reveal border-t border-zinc-200/80 py-20 md:py-28"
    }, renderEA01UHeader("01", lang2 === "en" ? "VPA AI Creation" : "VPA AI 创作"), vpaOutfitVideos, vpaFigure, gifRow);
    const vpaPlazaStateTable = /* @__PURE__ */ React.createElement("div", {
      className: "mt-12 overflow-hidden rounded-[28px] border border-zinc-200/60 bg-[#f5f6f9] shadow-[0_24px_70px_-52px_rgba(15,23,42,0.28)]",
      "data-ea01u-vpa-plaza-table": "true"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "overflow-x-auto p-2.5 md:p-4"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "w-full min-w-[1120px] table-fixed border-separate border-spacing-0 bg-[#f5f6f9]"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      scope: "col",
      className: "sticky left-0 z-20 w-28 border-b border-white/90 bg-[#f5f6f9] px-4 py-5 text-center align-middle text-sm font-semibold text-zinc-600"
    }, lang2 === "en" ? "State" : "状态"), vpaPlazaPersonas.map((persona) => /* @__PURE__ */ React.createElement("th", {
      key: persona.slug,
      scope: "col",
      className: "border-b border-white/90 bg-[#f5f6f9] px-4 py-5 text-center align-middle text-sm font-semibold text-zinc-900"
    }, t(persona.name))))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      scope: "row",
      className: "sticky left-0 z-20 border-b border-white/90 bg-[#f5f6f9] px-4 py-5 text-center align-middle text-sm font-semibold text-zinc-600"
    }, lang2 === "en" ? "Definition" : "定义"), vpaPlazaPersonas.map((persona) => /* @__PURE__ */ React.createElement("td", {
      key: `${persona.slug}-definition`,
      className: "border-b border-white/90 bg-[#f5f6f9] px-4 py-5 align-top"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-[13px] font-medium leading-[1.7] text-zinc-600"
    }, t(persona.definition))))), vpaPlazaStates.map((state) => /* @__PURE__ */ React.createElement("tr", {
      key: state.slug
    }, /* @__PURE__ */ React.createElement("th", {
      scope: "row",
      className: "sticky left-0 z-20 border-b border-white/80 bg-[#f5f6f9] px-4 py-4 text-center align-middle text-sm font-semibold text-zinc-700"
    }, t(state.label)), vpaPlazaPersonas.map((persona) => /* @__PURE__ */ React.createElement("td", {
      key: `${persona.slug}-${state.slug}`,
      className: "border-b border-white/80 bg-[#f5f6f9] p-2"
    }, /* @__PURE__ */ React.createElement("img", {
      src: `assets/portfolio/ea01u/vpa-plaza-${persona.slug}-${state.slug}.gif?v=20260712-vpa-background-fix`,
      alt: `${t(persona.name)} · ${t(state.label)}`,
      loading: "lazy",
      decoding: "async",
      "data-ea01u-vpa-plaza-state": `${persona.slug}-${state.slug}`,
      className: "block aspect-[12/11] h-auto w-full rounded-[14px] bg-[#f5f6f9] object-contain ring-1 ring-inset ring-white/80"
    })))))))));
    const vpaCustomizationContent = /* @__PURE__ */ React.createElement("div", {
      className: "mt-16 md:mt-20"
    }, /* @__PURE__ */ React.createElement("h4", {
      className: "mb-8 text-[clamp(1.35rem,2.2vw,2rem)] font-bold leading-[1.15] text-zinc-900"
    }, lang2 === "en" ? "Custom VPA" : "自定义 VPA"), /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-1 gap-5 lg:grid-cols-2"
    }, /* @__PURE__ */ React.createElement("figure", {
      className: "aspect-[1280/707] w-full"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/vpa-custom-style-scroll.webp?v=20260715-vpa-bottom-spacing-fix",
      alt: lang2 === "en" ? "Custom VPA modal scrolling through its settings" : "自定义 VPA 弹窗内容上下滚动",
      loading: "lazy",
      "data-ea01u-vpa-custom-style": "true",
      className: "block h-full w-full object-contain"
    })), /* @__PURE__ */ React.createElement("figure", {
      className: "aspect-[1280/707] w-full"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/vpa-custom-description.webp?v=20260713-vpa-corner-cleanup",
      alt: lang2 === "en" ? "VPA modal switching from style customization to description generation" : "VPA 弹窗从风格自定义切换到描述生成",
      loading: "lazy",
      "data-ea01u-vpa-custom-description": "true",
      className: "block h-full w-full object-contain"
    }))));
    const vpaPlazaSection = /* @__PURE__ */ React.createElement("section", {
      className: "touch-reveal border-t border-zinc-200/80 py-20 md:py-28"
    }, renderEA01UHeader("04", lang2 === "en" ? "VPA Plaza" : "VPA 广场"), /* @__PURE__ */ React.createElement("figure", {
      className: "aspect-[1280/707] w-full"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "assets/portfolio/ea01u/vpa-plaza-dialog.webp?v=20260713-launcher-click-ring",
      alt: lang2 === "en" ? "VPA Plaza switching between start and close conversation states" : "VPA 广场从开始对话切换到关闭对话",
      loading: "lazy",
      "data-ea01u-vpa-plaza": "true",
      className: "block h-full w-full object-contain"
    })), vpaPlazaStateTable, vpaCustomizationContent);
    return /* @__PURE__ */ React.createElement("div", {
      className: "space-y-0"
    }, introductionSection, researchChapterHeader, /* @__PURE__ */ React.createElement("div", {
      className: "[&_h2]:!text-[clamp(1.7rem,3vw,2.6rem)] [&_h2]:!font-semibold [&_h2]:!tracking-[-0.02em] [&>section:first-child]:!pt-16 md:[&>section:first-child]:!pt-20"
    }, project.sections.map(renderEditorialSection)), outcomesChapterHeader, /* @__PURE__ */ React.createElement("div", {
      className: "[&>section:first-child]:!border-t-0 [&>section:first-child]:!pt-16 md:[&>section:first-child]:!pt-20"
    }, vpaSection, launcherCardEditingSection, storylineSection, vpaPlazaSection));
  };
  const renderMiraclePair = (pair, sectionIndex, pairIndex) => {
    const key = `miracle-${sectionIndex}-${pairIndex}`;
    const hasProposal = Boolean(pair.proposal?.src);
    const hasFinal = Boolean(pair.final?.src);
    const activeMode = miraclePreviewModes[key] || (hasFinal ? "final" : "proposal");
    const activeImage = activeMode === "proposal" && hasProposal ? pair.proposal : pair.final || pair.proposal;
    const setMode = (mode) => setMiraclePreviewModes((prev) => ({ ...prev, [key]: mode }));
    const modeButton = (mode, label) => /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onMouseEnter: () => setMode(mode),
      onFocus: () => setMode(mode),
      className: `rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-150 ${activeMode === mode ? "bg-zinc-900 text-white shadow-sm" : "bg-zinc-100/80 text-zinc-500 hover:bg-zinc-200/80 hover:text-zinc-800"}`
    }, label);
    const renderMainVisual = () => {
      if (!activeImage) return null;
      if (activeMode === "final") {
        return /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[28px] border border-zinc-200/50 bg-zinc-50/70 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.28)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(activeImage.src), className: "block w-full cursor-zoom-in overflow-y-auto bg-white/70 p-3 text-left max-h-[72vh] md:max-h-[78vh]" }, /* @__PURE__ */ React.createElement("img", { src: activeImage.src, alt: t(activeImage.alt) || t(pair.title), loading: "lazy", className: "mx-auto block h-auto max-w-full object-contain" })), pair.carousel?.length ? /* @__PURE__ */ React.createElement("div", { className: "border-t border-zinc-200/70 bg-white/85 p-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex snap-x gap-3 overflow-x-auto pb-1" }, pair.carousel.map((item, itemIndex) => /* @__PURE__ */ React.createElement("button", { key: itemIndex, type: "button", onClick: () => setCertificatePreview(item.src), className: "min-w-[42%] snap-start overflow-hidden rounded-[18px] border border-zinc-200/70 bg-white shadow-[0_14px_36px_-30px_rgba(15,23,42,0.3)] sm:min-w-[28%] lg:min-w-[22%]" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: t(item.alt) || t(pair.title), loading: "lazy", className: "block aspect-[4/3] h-full w-full object-cover" }))))) : null);
      }
      return renderEditorialImage(activeImage, `${key}-${activeMode}`, { className: "min-h-0", mediaClassName: "max-h-[74vh]", imageClassName: "block h-auto max-h-[74vh] w-full object-contain" });
    };
    return /* @__PURE__ */ React.createElement("article", { key, className: "touch-reveal grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.26fr)_minmax(0,0.74fr)] lg:gap-9 lg:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "pt-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(pairIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h4", { className: "mt-3 text-xl md:text-2xl font-bold tracking-[-0.02em] leading-tight text-zinc-900" }, t(pair.title)), t(pair.description) && /* @__PURE__ */ React.createElement("p", { className: "mt-4 max-w-[34ch] text-sm md:text-base font-medium leading-[1.75] text-zinc-600" }, t(pair.description)), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-2" }, hasProposal && modeButton("proposal", lang2 === "en" ? (hasFinal ? "Visual Proposal" : "Direction") : (hasFinal ? "视觉方案" : "方向方案")), hasFinal && modeButton("final", lang2 === "en" ? "Delivered View" : "完成画面"))), renderMainVisual());
  };
  const renderMiraclePostGallery = (items = []) => items.length ? /* @__PURE__ */ React.createElement("div", { className: "mb-14 overflow-hidden rounded-[28px] border border-zinc-200/50 bg-white/70 p-3 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.25)]" }, /* @__PURE__ */ React.createElement("div", { className: "flex snap-x gap-3 overflow-x-auto pb-1" }, items.map((item, index) => /* @__PURE__ */ React.createElement("button", { key: index, type: "button", onClick: () => setCertificatePreview(item.src), className: "min-w-[72%] snap-center overflow-hidden rounded-[22px] border border-zinc-100 bg-white sm:min-w-[42%] lg:min-w-[24%]" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: t(item.alt) || "Post", loading: "lazy", className: "block aspect-square h-full w-full object-cover" }))))) : null;
  const renderMiracleMilesDetail = () => {
    const modules = [{
      title: { en: "Product Detail A+ Pages", cn: "商品详情 A+ 页面" },
      description: {
        en: "Amazon mobile A+ content systems for product propositions, selling points, and conversion-oriented page narratives.",
        cn: "面向 Amazon 移动端 A+ 内容，组织商品主张、卖点层级与转化导向的页面叙事。"
      },
      preview: "assets/portfolio/miracle-miles/miracle-product-card-cover.jpg",
      alt: { en: "Product Detail A+ page preview", cn: "Product Detail A+ 页面预览" }
    }, {
      title: { en: "Extended Brand Assets", cn: "延展品牌素材" },
      description: {
        en: "Campaign, platform, brand-story, post, and advertising assets across marketplace contexts.",
        cn: "覆盖活动、平台适配、品牌故事、Post 与广告图等延展素材。"
      },
      preview: "assets/portfolio/miracle-miles/miracle-extended-card-cover.jpg",
      alt: { en: "Extended brand assets preview", cn: "延展品牌素材预览" }
    }, {
      title: { en: "Creative Operation", cn: "创意执行现场" },
      description: {
        en: "On-site planning, model follow-up, shoot-deck alignment, and production coordination during visual content shoots.",
        cn: "围绕现场策划、模特跟拍、拍摄方案对齐与视觉生产协同展开。"
      },
      preview: "assets/portfolio/miracle-miles/workflow-onsite-wide.jpg",
      alt: { en: "Creative operation shoot preview", cn: "Creative Operation 外拍现场预览" }
    }];
    const workflowImages = [{
      src: "assets/portfolio/miracle-miles/workflow-onsite-wide.jpg",
      alt: { en: "Outdoor campaign shoot coordination", cn: "外拍现场策划" },
      caption: { en: "On-site coordination during the outdoor campaign shoot.", cn: "外拍现场策划与模特跟拍记录。" }
    }, {
      src: "assets/portfolio/miracle-miles/workflow-model-followup.jpg",
      alt: { en: "Model follow-up during outdoor shoot", cn: "外拍模特跟拍" },
      caption: { en: "Model follow-up, styling attention, and lighting coordination on set.", cn: "跟随模特拍摄，协同造型、场景与灯光执行。" }
    }, {
      src: "assets/portfolio/miracle-miles/workflow-shoot-deck.jpg",
      alt: { en: "Shoot deck on set", cn: "外拍现场拍摄方案" },
      caption: { en: "Shoot deck used to align styling, pose, location, props, and output format.", cn: "现场对照拍摄方案，协调造型、姿势、场景、道具与图片规格。" }
    }, {
      src: "assets/portfolio/miracle-miles/workflow-team-group.jpg",
      alt: { en: "Production team record", cn: "外拍团队现场记录" },
      caption: { en: "Production-team record from the campaign shoot.", cn: "外拍团队现场记录，作为执行协同的辅助证据。" }
    }];
    const miracleProductGroups = [{
      title: { en: "Dream Paris", cn: "Dream Paris" },
	      projects: [{
	        title: { en: "Dream Paris A+ Direction 2", cn: "Dream Paris A+ 方案 2" },
	        content: { en: "A second mobile A+ direction from the organized Dream Paris set.", cn: "Dream Paris 系列中的第二组 M 端 A+ 方向。" },
	        proposal: { src: "assets/portfolio/miracle-miles/sheet-dp-02-proposal.jpg", alt: { en: "Dream Paris Direction 2 proposal", cn: "Dream Paris 方案 2" } },
	        final: { src: "assets/portfolio/miracle-miles/miracle-dp-sdhs2480w-long.jpg", alt: { en: "Dream Paris Direction 2 mobile A+ composition", cn: "Dream Paris 方案 2 移动端 A+ 版式" } },
	        carousel: [
	          { src: "assets/portfolio/miracle-miles/miracle-dp-sdhs2480w-carousel-01.jpg", alt: { en: "Dream Paris Direction 2 scenario image 1", cn: "Dream Paris 方案 2 场景图 1" } },
	          { src: "assets/portfolio/miracle-miles/miracle-dp-sdhs2480w-carousel-02.jpg", alt: { en: "Dream Paris Direction 2 scenario image 2", cn: "Dream Paris 方案 2 场景图 2" } }
	        ]
	      }, {
	        title: { en: "DWUMOB2409 A+ Page", cn: "DWUMOB2409 A+ 页面" },
	        content: {
	          en: "A mobile A+ product page for over-the-knee boots, organized around styling definition, leg-lengthening proportion, comfort lining, and everyday outfit scenes.",
	          cn: "面向过膝靴的 M 端 A+ 商品页，围绕穿搭风格、显腿长比例、舒适内里与日常出街场景组织页面节奏。"
	        },
	        proposal: { src: "assets/portfolio/miracle-miles/miracle-dp-dwumob2409-proposal.jpg", alt: { en: "DWUMOB2409 visual proposal", cn: "DWUMOB2409 视觉方案" } },
	        final: { src: "assets/portfolio/miracle-miles/miracle-dp-dwumob2409-long.jpg", alt: { en: "DWUMOB2409 mobile A+ composition", cn: "DWUMOB2409 移动端 A+ 版式" } },
	        carousel: [
	          { src: "assets/portfolio/miracle-miles/miracle-dp-dwumob2409-carousel-01.jpg", alt: { en: "DWUMOB2409 scenario image 1", cn: "DWUMOB2409 场景图 1" } },
	          { src: "assets/portfolio/miracle-miles/miracle-dp-dwumob2409-carousel-02.jpg", alt: { en: "DWUMOB2409 scenario image 2", cn: "DWUMOB2409 场景图 2" } }
	        ],
	        annotations: {
	          en: [
	            "Define the silhouette and styling direction through a clear mobile hero.",
	            "Use comfort details and material modules to support the purchase decision.",
	            "Separate the final scenario images into a carousel rather than forcing them into one long strip."
	          ],
	          cn: [
	            "通过清晰的移动端首屏定义鞋靴廓形与穿搭方向。",
	            "以舒适细节和材质模块支撑购买决策。",
	            "最后的场景图独立为轮播，而不是强行拼进同一张长图。"
	          ]
	        }
	      }, {
        title: { en: "Dream Paris A+ Direction 3", cn: "Dream Paris A+ 方案 3" },
        content: { en: "A third mobile A+ direction from the organized Dream Paris set.", cn: "Dream Paris 系列中的第三组 M 端 A+ 方向。" },
        proposal: { src: "assets/portfolio/miracle-miles/sheet-dp-03-proposal.jpg", alt: { en: "Dream Paris Direction 3 proposal", cn: "Dream Paris 方案 3" } },
        final: { src: "assets/portfolio/miracle-miles/miracle-dp-sdkb2406w-long.jpg", alt: { en: "Dream Paris Direction 3 mobile A+ composition", cn: "Dream Paris 方案 3 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-dp-sdkb2406w-carousel-01.jpg", alt: { en: "Dream Paris Direction 3 scenario image 1", cn: "Dream Paris 方案 3 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-dp-sdkb2406w-carousel-02.jpg", alt: { en: "Dream Paris Direction 3 scenario image 2", cn: "Dream Paris 方案 3 场景图 2" } }
        ]
      }, {
        title: { en: "Dream Paris A+ Direction 4", cn: "Dream Paris A+ 方案 4" },
        content: { en: "A fourth mobile A+ direction from the organized Dream Paris set.", cn: "Dream Paris 系列中的第四组 M 端 A+ 方向。" },
        proposal: { src: "assets/portfolio/miracle-miles/sheet-dp-04-proposal.jpg", alt: { en: "Dream Paris Direction 4 proposal", cn: "Dream Paris 方案 4" } },
        final: { src: "assets/portfolio/miracle-miles/miracle-dp-sdml2406w-long.jpg", alt: { en: "Dream Paris Direction 4 mobile A+ composition", cn: "Dream Paris 方案 4 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-dp-sdml2406w-carousel-01.jpg", alt: { en: "Dream Paris Direction 4 scenario image 1", cn: "Dream Paris 方案 4 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-dp-sdml2406w-carousel-02.jpg", alt: { en: "Dream Paris Direction 4 scenario image 2", cn: "Dream Paris 方案 4 场景图 2" } },
          { src: "assets/portfolio/miracle-miles/miracle-dp-sdml2406w-carousel-03.jpg", alt: { en: "Dream Paris Direction 4 scenario image 3", cn: "Dream Paris 方案 4 场景图 3" } }
        ]
      }]
    }, {
      title: { en: "Dream Paris Kids", cn: "Dream Paris Kids" },
      projects: [{
        title: { en: "Dream Paris Kids A+ Direction 1", cn: "Dream Paris Kids A+ 方案 1" },
        content: { en: "A kids-footwear A+ direction built around a mobile product story.", cn: "面向童鞋产品的 M 端 A+ 内容方向。" },
        proposal: { src: "assets/portfolio/miracle-miles/sheet-kids-01-proposal.jpg", alt: { en: "Dream Paris Kids Direction 1 proposal", cn: "Dream Paris Kids 方案 1" } },
        final: { src: "assets/portfolio/miracle-miles/miracle-kids-sdbo225k-long.jpg", alt: { en: "Dream Paris Kids Direction 1 mobile A+ composition", cn: "Dream Paris Kids 方案 1 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdbo225k-carousel-01.jpg", alt: { en: "Dream Paris Kids Direction 1 scenario image 1", cn: "Dream Paris Kids 方案 1 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdbo225k-carousel-02.jpg", alt: { en: "Dream Paris Kids Direction 1 scenario image 2", cn: "Dream Paris Kids 方案 1 场景图 2" } }
        ]
      }, {
        title: { en: "Dream Paris Kids A+ Direction 2", cn: "Dream Paris Kids A+ 方案 2" },
        content: { en: "A second kids-footwear A+ direction built around a mobile product story.", cn: "第二组童鞋 M 端 A+ 内容方向。" },
        proposal: { src: "assets/portfolio/miracle-miles/sheet-kids-02-proposal.jpg", alt: { en: "Dream Paris Kids Direction 2 proposal", cn: "Dream Paris Kids 方案 2" } },
        final: { src: "assets/portfolio/miracle-miles/miracle-kids-sdfl2403k-long.jpg", alt: { en: "Dream Paris Kids Direction 2 mobile A+ composition", cn: "Dream Paris Kids 方案 2 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfl2403k-carousel-01.jpg", alt: { en: "Dream Paris Kids Direction 2 scenario image 1", cn: "Dream Paris Kids 方案 2 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfl2403k-carousel-02.jpg", alt: { en: "Dream Paris Kids Direction 2 scenario image 2", cn: "Dream Paris Kids 方案 2 场景图 2" } }
        ]
      }, {
        title: { en: "Dream Paris Kids A+ Direction 3", cn: "Dream Paris Kids A+ 方案 3" },
        content: { en: "A third kids-footwear A+ direction built around a mobile product story.", cn: "第三组童鞋 M 端 A+ 内容方向。" },
        proposal: { src: "assets/portfolio/miracle-miles/sheet-kids-03-proposal.jpg", alt: { en: "Dream Paris Kids Direction 3 proposal", cn: "Dream Paris Kids 方案 3" } },
        final: { src: "assets/portfolio/miracle-miles/miracle-kids-sdfs2308k-long.jpg", alt: { en: "Dream Paris Kids Direction 3 mobile A+ composition", cn: "Dream Paris Kids 方案 3 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfs2308k-carousel-01.jpg", alt: { en: "Dream Paris Kids Direction 3 scenario image 1", cn: "Dream Paris Kids 方案 3 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfs2308k-carousel-02.jpg", alt: { en: "Dream Paris Kids Direction 3 scenario image 2", cn: "Dream Paris Kids 方案 3 场景图 2" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfs2308k-carousel-03.jpg", alt: { en: "Dream Paris Kids Direction 3 scenario image 3", cn: "Dream Paris Kids 方案 3 场景图 3" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-sdfs2308k-carousel-04.jpg", alt: { en: "Dream Paris Kids Direction 3 scenario image 4", cn: "Dream Paris Kids 方案 3 场景图 4" } }
        ]
      }, {
        title: { en: "Dream Paris Kids A+ Direction 4", cn: "Dream Paris Kids A+ 方案 4" },
        content: { en: "A fourth kids-footwear A+ direction for girls’ flats, balancing comfort details with soft, celebratory styling.", cn: "第四组童鞋 M 端 A+ 内容，以女孩浅口鞋为主题，在舒适细节与柔和礼服场景之间建立视觉层级。" },
        final: { src: "assets/portfolio/miracle-miles/miracle-kids-kfl219-long.jpg", alt: { en: "Dream Paris Kids Direction 4 mobile A+ composition", cn: "Dream Paris Kids 方案 4 移动端 A+ 版式" } },
        carousel: [
          { src: "assets/portfolio/miracle-miles/miracle-kids-kfl219-carousel-01.jpg", alt: { en: "Dream Paris Kids Direction 4 scenario image 1", cn: "Dream Paris Kids 方案 4 场景图 1" } },
          { src: "assets/portfolio/miracle-miles/miracle-kids-kfl219-carousel-02.jpg", alt: { en: "Dream Paris Kids Direction 4 scenario image 2", cn: "Dream Paris Kids 方案 4 场景图 2" } }
        ]
      }]
    }];
    const renderMiracleProductContent = () => {
      const h = React.createElement;
      const activeGroup = miracleProductGroups[Math.min(selectedMiracleBrandIndex, miracleProductGroups.length - 1)];
      const activeProject = activeGroup.projects[Math.min(selectedMiracleProductIndex, activeGroup.projects.length - 1)] || activeGroup.projects[0];
      const carouselItems = activeProject.carousel || [];
      const activeCarousel = carouselItems.length ? carouselItems[miracleProductCarouselIndex % carouselItems.length] : null;
      const brandButtons = miracleProductGroups.map((group, index) => h("button", {
        key: group.title.en,
        type: "button",
        onClick: () => {
          setSelectedMiracleBrandIndex(index);
          setSelectedMiracleProductIndex(0);
          setMiracleProductCarouselIndex(0);
          setMiracleProductCarouselActive(false);
        },
        className: `rounded-full px-4 py-3 text-xs font-bold transition ${index === selectedMiracleBrandIndex ? "bg-zinc-900 text-white shadow-sm ring-2 ring-blue-500" : "text-zinc-500 hover:bg-white hover:text-zinc-900"}`
      }, t(group.title)));
      const productButtons = h("div", { className: "grid grid-cols-4 gap-2 rounded-[24px] border border-zinc-200/70 bg-zinc-50/70 p-2" }, activeGroup.projects.map((item, index) => h("button", {
        key: `${activeGroup.title.en}-${index}`,
        type: "button",
        onClick: () => {
          setSelectedMiracleProductIndex(index);
          setMiracleProductCarouselIndex(0);
          setMiracleProductCarouselActive(false);
        },
        className: `rounded-full px-3 py-3 text-sm font-bold transition ${index === selectedMiracleProductIndex ? "bg-zinc-900 text-white shadow-sm ring-2 ring-blue-500" : "text-zinc-500 hover:bg-white hover:text-zinc-900"}`
      }, String(index + 1).padStart(2, "0"))));
      const titleCard = h("div", { className: "space-y-4 rounded-[30px] border border-zinc-200/70 bg-white p-5 shadow-[0_20px_56px_-44px_rgba(15,23,42,0.24)] md:p-6" },
        h("div", { className: "grid grid-cols-2 gap-2 rounded-[24px] border border-zinc-200/70 bg-zinc-50/70 p-2" }, brandButtons),
        productButtons
      );
      const proposalCard = activeProject.proposal ? h("figure", { className: "overflow-hidden rounded-[30px] border border-zinc-200/70 bg-white shadow-[0_18px_50px_-42px_rgba(15,23,42,0.18)]" },
        h("button", { type: "button", onClick: () => setCertificatePreview(activeProject.proposal.src), className: "group relative block h-[320px] w-full cursor-zoom-in overflow-hidden bg-white text-left md:h-[360px]", "aria-label": lang2 === "en" ? "Open visual proposal" : "放大查看方案图" },
          h("img", { src: activeProject.proposal.src, alt: t(activeProject.proposal.alt) || t(activeProject.title), loading: "lazy", className: "block h-full w-full object-cover object-center transition duration-300 group-hover:saturate-[1.04]" }),
          h("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent" }),
          h("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" })
        ),
        h("figcaption", { className: "border-t border-zinc-100 bg-white px-5 py-4 text-sm font-semibold leading-relaxed text-zinc-600" }, lang2 === "en" ? "Visual proposal preview. Click to enlarge the full board." : "方案图预览，点击可查看完整大图。")
      ) : null;
      const carouselPanel = activeCarousel ? h("figure", { ref: miracleCarouselRef, className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-white shadow-[0_22px_72px_-56px_rgba(15,23,42,0.22)]" },
        h("button", { type: "button", onClick: () => {
          setMiracleProductCarouselActive(true);
          setCertificatePreview(activeCarousel.src);
        }, className: "block w-full cursor-zoom-in bg-white text-left outline-none focus:outline-none focus-visible:outline-none", "aria-label": lang2 === "en" ? "Open carousel image" : "放大查看轮播图" },
          h("img", { src: activeCarousel.src, alt: t(activeCarousel.alt) || t(activeProject.title), loading: "lazy", className: "block aspect-[4/3] w-full object-cover" })
        ),
        h("div", { className: "flex justify-center gap-1.5 bg-white py-3" }, carouselItems.map((_, index) => h("button", {
          key: index,
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            setMiracleProductCarouselActive(true);
            setMiracleProductCarouselIndex(index);
          },
          className: `h-1.5 rounded-full transition-all ${index === miracleProductCarouselIndex % carouselItems.length ? "w-5 bg-zinc-900" : "w-1.5 bg-zinc-300"}`,
          "aria-label": `${lang2 === "en" ? "Show carousel image" : "切换轮播图"} ${index + 1}`
        })))
      ) : null;
      const finalCanvas = h("div", { className: "space-y-5 md:space-y-6" },
        activeProject.final ? h("figure", { className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_22px_72px_-56px_rgba(15,23,42,0.22)]" },
          h("button", { type: "button", onClick: () => setCertificatePreview(activeProject.final.src), className: "block w-full cursor-zoom-in bg-white text-left outline-none focus:outline-none focus-visible:outline-none", "aria-label": lang2 === "en" ? "Open final product page image" : "放大查看最终长图" },
            h("img", { src: activeProject.final.src, alt: t(activeProject.final.alt) || t(activeProject.title), loading: "eager", className: "block h-auto w-full contrast-[1.04] saturate-[1.03]" })
          )
        ) : null,
        carouselPanel
      );
      return h("section", { className: "touch-reveal border-t border-zinc-200/80 pt-14 md:pt-20" },
        h("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:items-start" },
          h("div", { className: "space-y-5 lg:sticky lg:top-28" }, titleCard, proposalCard),
          finalCanvas
        )
      );
    };
    const renderMiracleExtendedContent = () => {
      const h = React.createElement;
      const carouselIndex = (key, length) => {
        const raw = miracleExtendedCarouselIndex[key] || 0;
        return length ? (raw % length + length) % length : 0;
      };
      const stepCarousel = (key, delta, length) => {
        if (!length) return;
        setMiracleExtendedCarouselIndex((prev) => ({ ...prev, [key]: ((prev[key] || 0) + delta + length) % length }));
      };
      const sheinPosts = [
        { src: "assets/portfolio/miracle-miles/shein-post-01.jpg", alt: { en: "SHEIN post visual 1", cn: "SHEIN Post 视觉 1" } },
        { src: "assets/portfolio/miracle-miles/shein-post-02.jpg", alt: { en: "SHEIN post visual 2", cn: "SHEIN Post 视觉 2" } },
        { src: "assets/portfolio/miracle-miles/shein-post-03.jpg", alt: { en: "SHEIN post visual 3", cn: "SHEIN Post 视觉 3" } },
        { src: "assets/portfolio/miracle-miles/shein-post-04.jpg", alt: { en: "SHEIN post visual 4", cn: "SHEIN Post 视觉 4" } }
      ];
      const temuOutputs = [
        { src: "assets/portfolio/miracle-miles/temu-post-01.jpg", alt: { en: "TEMU post visual 1", cn: "TEMU Post 视觉 1" } },
        { src: "assets/portfolio/miracle-miles/temu-post-02.jpg", alt: { en: "TEMU post visual 2", cn: "TEMU Post 视觉 2" } },
        { src: "assets/portfolio/miracle-miles/temu-post-03.jpg", alt: { en: "TEMU post visual 3", cn: "TEMU Post 视觉 3" } },
        { src: "assets/portfolio/miracle-miles/temu-post-04.jpg", alt: { en: "TEMU post visual 4", cn: "TEMU Post 视觉 4" } },
        { src: "assets/portfolio/miracle-miles/temu-post-05.jpg", alt: { en: "TEMU post visual 5", cn: "TEMU Post 视觉 5" } },
        { src: "assets/portfolio/miracle-miles/temu-post-06.jpg", alt: { en: "TEMU post visual 6", cn: "TEMU Post 视觉 6" } }
      ];
      const brandStoryPanels = [
        { src: "assets/portfolio/miracle-miles/amazon-brand-story-a.jpg", alt: { en: "Amazon Brand Story lifestyle panel A", cn: "Amazon 品牌故事生活方式图 A" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-story-b.jpg", alt: { en: "Amazon Brand Story lifestyle panel B", cn: "Amazon 品牌故事生活方式图 B" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-story-c.jpg", alt: { en: "Amazon Brand Story lifestyle panel C", cn: "Amazon 品牌故事生活方式图 C" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-story-d.jpg", alt: { en: "Amazon Brand Story lifestyle panel D", cn: "Amazon 品牌故事生活方式图 D" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-story-e.jpg", alt: { en: "Amazon Brand Story lifestyle panel E", cn: "Amazon 品牌故事生活方式图 E" } }
      ];
      const brandStoryProducts = [
        { src: "assets/portfolio/miracle-miles/amazon-brand-product-5.jpg", alt: { en: "Amazon Brand Story product card 1", cn: "Amazon 品牌故事商品卡 1" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-product-8.jpg", alt: { en: "Amazon Brand Story product card 2", cn: "Amazon 品牌故事商品卡 2" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-product-6.jpg", alt: { en: "Amazon Brand Story product card 3", cn: "Amazon 品牌故事商品卡 3" } },
        { src: "assets/portfolio/miracle-miles/amazon-brand-product-7.jpg", alt: { en: "Amazon Brand Story product card 4", cn: "Amazon 品牌故事商品卡 4" } }
      ];
      const renderDots = (key, items) => h("div", { className: "flex items-center justify-center gap-1.5 px-4 pb-4" }, items.map((_, index) => h("button", {
        key: `${key}-dot-${index}`,
        type: "button",
        onClick: () => setMiracleExtendedCarouselIndex((prev) => ({ ...prev, [key]: index })),
        className: `h-1.5 rounded-full transition-all ${index === carouselIndex(key, items.length) ? "w-5 bg-zinc-900" : "w-1.5 bg-zinc-300"}`,
        "aria-label": `${lang2 === "en" ? "Show visual" : "切换图片"} ${index + 1}`
      })));
      const renderCarousel = (key, items, options = {}) => {
        if (!items.length) return null;
        const active = items[carouselIndex(key, items.length)];
        return h("figure", { className: `overflow-hidden rounded-[28px] border border-zinc-200/60 bg-white shadow-[0_22px_68px_-54px_rgba(15,23,42,0.22)] ${options.className || ""}` },
          h("div", { className: "relative" },
            h("button", { type: "button", onClick: () => setCertificatePreview(active.src), className: "group block w-full cursor-zoom-in bg-white text-left", "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片" },
              h("img", { src: active.src, alt: t(active.alt), loading: "lazy", className: `block w-full object-cover transition duration-300 group-hover:saturate-[1.04] ${options.imageClassName || "aspect-square"}` })
            ),
            items.length > 1 && h("div", { className: "pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3" },
              h("button", { type: "button", onClick: (event) => { event.stopPropagation(); stepCarousel(key, -1, items.length); }, className: "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-lg font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white", "aria-label": lang2 === "en" ? "Previous image" : "上一张" }, "‹"),
              h("button", { type: "button", onClick: (event) => { event.stopPropagation(); stepCarousel(key, 1, items.length); }, className: "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-lg font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white", "aria-label": lang2 === "en" ? "Next image" : "下一张" }, "›")
            )
          ),
          items.length > 1 ? renderDots(key, items) : null
        );
      };
      const renderModeCard = (key, proposal, outputs, options = {}) => {
        const activeMode = miraclePreviewModes[key] || "final";
        const setMode = (mode) => setMiraclePreviewModes((prev) => ({ ...prev, [key]: mode }));
        const modeButton = (mode, label) => h("button", {
          type: "button",
          onMouseEnter: () => setMode(mode),
          onFocus: () => setMode(mode),
          onClick: () => setMode(mode),
          className: `rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-150 ${activeMode === mode ? "bg-zinc-900 text-white shadow-sm" : "bg-zinc-100/80 text-zinc-500 hover:bg-zinc-200/80 hover:text-zinc-800"}`
        }, label);
        return h("div", { className: "space-y-4" },
          h("div", { className: "flex flex-wrap gap-2" },
            proposal ? modeButton("proposal", lang2 === "en" ? "Concept" : "方案") : null,
            outputs?.length ? modeButton("final", lang2 === "en" ? "Final Visual" : "最终视觉") : null
          ),
          activeMode === "proposal" && proposal ? renderEditorialImage(proposal, `${key}-proposal`, { className: "min-h-0", mediaClassName: options.proposalMediaClassName || "max-h-[68vh]", imageClassName: options.proposalImageClassName || "block h-auto max-h-[68vh] w-full object-contain" }) : renderCarousel(key, outputs || [], options.carouselOptions || { imageClassName: "aspect-[4/3]" })
        );
      };
      const sectionHeader = (number, title, description) => h("div", { className: "max-w-[34rem]" },
        h("p", { className: "text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, number),
        h("h4", { className: "mt-5 text-[clamp(1.45rem,2.2vw,2.15rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-zinc-950" }, title),
        h("p", { className: "mt-4 text-sm font-medium leading-[1.75] text-zinc-600 md:text-base" }, description)
      );
      const extendedArticleClass = "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,0.64fr)] lg:items-start lg:gap-12 xl:gap-14";
      const extendedSquareMediaClass = "w-full max-w-[420px] justify-self-start";
      const extendedWideMediaClass = "w-full max-w-[760px] justify-self-start";
      const renderBrandStoryProductTile = (products, key) => h("div", {
        key,
        className: "flex h-[72%] aspect-[362/454] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[3px] bg-white text-left shadow-[0_18px_46px_-36px_rgba(15,23,42,0.34)]"
      },
        h("div", { className: "grid grid-cols-2 gap-3 px-5 pt-6 md:gap-4 md:px-6 md:pt-7" },
          products.map((product, index) => h("img", {
            key: `${key}-product-${index}`,
            src: product.src,
            alt: t(product.alt),
            loading: "lazy",
            className: "aspect-square w-full object-contain"
          }))
        ),
        h("div", { className: "border-t border-zinc-100 px-5 pb-5 pt-4 md:px-6 md:pb-6" },
          h("p", { className: "text-sm font-semibold leading-tight text-zinc-900" }, lang2 === "en" ? "Girls ankle boots" : "Girls ankle boots"),
          h("p", { className: "mt-1 text-[11px] font-semibold text-emerald-700" }, lang2 === "en" ? "Visit the Store" : "Visit the Store")
        )
      );
      const brandStoryRailItems = [
        { type: "panel", key: "story-a", panel: brandStoryPanels[0] },
        { type: "panel", key: "story-b", panel: brandStoryPanels[1] },
        { type: "panel", key: "story-c", panel: brandStoryPanels[2] },
        { type: "products", key: "products-01", products: [brandStoryProducts[0], brandStoryProducts[3], brandStoryProducts[2], brandStoryProducts[1]] },
        { type: "panel", key: "story-d", panel: brandStoryPanels[3] },
        { type: "panel", key: "story-e", panel: brandStoryPanels[4] },
        { type: "products", key: "products-02", products: [brandStoryProducts[1], brandStoryProducts[2], brandStoryProducts[3], brandStoryProducts[0]] }
      ];
      const renderAmazonBrandStoryCanvas = () => h("div", { className: "relative min-h-[360px] overflow-hidden rounded-[30px] border border-zinc-200/60 bg-[#ded3ca] shadow-[0_24px_70px_-54px_rgba(15,23,42,0.24)] md:aspect-[1464/625] md:min-h-0" },
        h("div", { className: "absolute inset-0 hidden md:block" },
          h("img", { src: "assets/portfolio/miracle-miles/amazon-brand-bg.jpg", alt: lang2 === "en" ? "Amazon Brand Story fixed background" : "Amazon 品牌故事固定背景", loading: "lazy", className: "h-full w-full object-cover object-left" }),
          h("div", { className: "absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#ded3ca]/92 via-[#ded3ca]/54 to-transparent" })
        ),
        h("img", { src: "assets/portfolio/miracle-miles/amazon-brand-mobile.jpg", alt: lang2 === "en" ? "Amazon Brand Story mobile background" : "Amazon 品牌故事移动端背景", loading: "lazy", className: "absolute inset-y-0 left-0 h-full w-[42%] object-cover md:hidden" }),
        h("div", { className: "absolute inset-y-0 left-0 hidden w-[30%] bg-gradient-to-r from-black/5 via-transparent to-transparent md:block" }),
        h("div", { className: "absolute inset-0 cursor-grab overflow-x-auto overscroll-x-contain [scrollbar-width:none]" },
          h("div", { className: "flex h-full w-max items-center gap-4 pl-[34%] pr-8 md:gap-5 md:pl-[34%] lg:gap-6 lg:pl-[34%]" },
            brandStoryRailItems.map((item) => item.type === "panel" ? h("button", {
              key: item.key,
              type: "button",
              onClick: () => setCertificatePreview(item.panel.src),
              className: "group h-[72%] aspect-[362/454] shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-[3px] bg-white shadow-[0_18px_46px_-36px_rgba(15,23,42,0.34)] transition-[box-shadow,transform,opacity] duration-180 hover:shadow-[0_22px_54px_-36px_rgba(15,23,42,0.42)]",
              "aria-label": lang2 === "en" ? "Open Amazon Brand Story card" : "放大查看 Amazon 品牌故事卡片"
            },
              h("img", { src: item.panel.src, alt: t(item.panel.alt), loading: "lazy", className: "block h-full w-full object-cover" })
            ) : renderBrandStoryProductTile(item.products, item.key))
          )
        ),
        h("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-100/72 to-transparent" })
      );
      return h("section", { className: "touch-reveal border-t border-zinc-200/80 pt-14 md:pt-20" },
        h("div", { className: "mb-10 max-w-3xl" },
          h("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "02"),
          h("h3", { className: "text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-zinc-950" }, lang2 === "en" ? "Extended Brand Assets" : "延展品牌素材"),
          h("p", { className: "mt-5 max-w-[62ch] text-base font-medium leading-[1.75] text-zinc-600 md:text-lg" }, lang2 === "en" ? "E-commerce visual assets across marketplace posts, brand-story modules, advertising visuals, and platform-specific content systems." : "覆盖平台 Post、品牌故事、广告图与不同电商平台内容体系的视觉延展资产。")
        ),
        h("div", { className: "space-y-14 md:space-y-[4.5rem]" },
          h("article", { className: extendedArticleClass },
            sectionHeader("01", lang2 === "en" ? "TEMU Post" : "TEMU Post", lang2 === "en" ? "Winter boot visuals focus on warmth, grip, material texture, and seasonal styling across platform-ready square assets." : "冬季靴款视觉聚焦保暖、抓地、材质纹理与季节场景，形成一组面向平台浏览的方形素材。"),
            h("div", { className: extendedSquareMediaClass },
              renderCarousel("temu-post", temuOutputs, { imageClassName: "aspect-square" })
            )
          ),
          h("article", { className: extendedArticleClass },
            sectionHeader("02", lang2 === "en" ? "SHEIN Post" : "SHEIN Post", lang2 === "en" ? "SHEIN visuals use bright color, product close-ups, and playful scenes to keep the product readable in fast social-commerce browsing." : "SHEIN 视觉以明亮色彩、产品细节和轻快场景组织画面，让商品在快速浏览中保持清晰识别。"),
            h("div", { className: extendedSquareMediaClass },
              renderCarousel("shein-post", sheinPosts, { imageClassName: "aspect-square" })
            )
          ),
          h("article", { className: extendedArticleClass },
            sectionHeader("03", lang2 === "en" ? "Amazon Brand Story" : "Amazon 品牌故事图", lang2 === "en" ? "A seasonal background and horizontal product cards build a storefront-style brand story for Dream Pairs Kids, connecting lifestyle scenes with shoppable product moments." : "以季节背景与横向商品卡片构成 Dream Pairs Kids 的品牌故事模块，将生活方式场景与可购买商品节点连接起来。"),
            h("div", { className: extendedWideMediaClass },
              renderAmazonBrandStoryCanvas()
            )
          ),
          h("article", { className: extendedArticleClass },
            sectionHeader("04", lang2 === "en" ? "Advertisement" : "广告图", lang2 === "en" ? "A kids-footwear campaign visual that balances product clarity with a soft seasonal atmosphere." : "童鞋广告视觉，在清晰呈现商品的同时保留柔和的季节氛围。"),
            h("div", { className: extendedWideMediaClass },
              renderEditorialImage({ src: "assets/portfolio/miracle-miles/sheet-ad-final.jpg", alt: { en: "Advertisement final visual", cn: "广告图最终视觉" } }, "media-ad-final", { className: "min-h-0", mediaClassName: "max-h-[58vh]", imageClassName: "block h-auto max-h-[58vh] w-full object-contain" })
            )
          )
        )
      );
    };
    const selectedIndex = Math.min(selectedMiracleModuleIndex, modules.length - 1);
    const renderModuleCard = (item, index) => {
      const isHovered = index === hoveredMiracleModuleIndex;
      const isSelected = hoveredMiracleModuleIndex === null && index === selectedIndex;
      const isActive = isHovered || isSelected;
      const buttonClass = `group relative flex min-h-[320px] w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] border bg-transparent text-left shadow-[0_18px_60px_-48px_rgba(15,23,42,0.35)] outline-none transition-[width,height,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:outline-none md:min-h-0 md:max-w-none ${isHovered ? "md:h-[500px] md:w-[410px] md:z-20 border-transparent shadow-[0_26px_78px_-56px_rgba(15,23,42,0.28)]" : isSelected ? "md:h-[500px] md:w-[410px] md:z-10 border-zinc-300 ring-1 ring-zinc-300/55 shadow-[0_28px_86px_-58px_rgba(15,23,42,0.36)]" : "md:h-[360px] md:w-[300px] border-zinc-200/70 hover:shadow-[0_22px_64px_-50px_rgba(15,23,42,0.18)]"}`;
      const imageShellClass = `relative shrink-0 overflow-hidden transition-[height,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "h-[60%] opacity-100" : "hidden opacity-0"}`;
      const numberClass = `text-[clamp(2.35rem,4.7vw,4rem)] font-light leading-none tracking-[-0.05em] transition duration-300 ${isActive ? "hidden" : "text-zinc-200/70"}`;
      const iconClass = `flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition ${isActive ? "text-zinc-950" : "text-zinc-500"}`;
      const titleClass = `min-w-0 font-semibold leading-[0.98] tracking-[-0.045em] text-zinc-950 transition duration-300 break-words [overflow-wrap:anywhere] ${isActive ? "max-w-full text-[clamp(1.3rem,1.9vw,1.8rem)] opacity-100" : "max-w-full text-[1.08rem] opacity-95"}`;
      const contentClass = `min-w-0 max-w-[21rem] break-words text-[1rem] font-normal leading-[1.52] text-zinc-600 transition duration-300 [overflow-wrap:anywhere] ${isActive ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`;
      const contentPanelClass = `relative z-10 flex min-h-0 flex-1 min-w-0 flex-col overflow-visible bg-transparent ${isActive ? "justify-end p-6 pt-0 md:p-6 md:pt-0 md:pb-8" : "justify-between p-6"}`;
      return /* @__PURE__ */ React.createElement("button", {
        key: `miracle-module-${index}`,
        type: "button",
        onMouseEnter: () => setHoveredMiracleModuleIndex(index),
        onPointerEnter: () => setHoveredMiracleModuleIndex(index),
        onFocus: () => setHoveredMiracleModuleIndex(index),
        onClick: () => {
          setSelectedMiracleModuleIndex(index);
          setMiracleProductCarouselActive(false);
        },
        className: buttonClass
      }, /* @__PURE__ */ React.createElement("div", { className: imageShellClass }, isActive && item.preview && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", {
        src: item.preview,
        alt: t(item.alt) || t(item.title),
        loading: index === 0 ? "eager" : "lazy",
        className: "block h-full w-full object-cover",
        style: {
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.58) 80%, rgba(0,0,0,0.22) 92%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.58) 80%, rgba(0,0,0,0.22) 92%, rgba(0,0,0,0) 100%)"
        }
      }))), /* @__PURE__ */ React.createElement("div", { className: contentPanelClass }, /* @__PURE__ */ React.createElement("p", { className: numberClass }, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex min-w-0 items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: iconClass }, /* @__PURE__ */ React.createElement(ArrowRight, { size: 17 }))), /* @__PURE__ */ React.createElement("h3", { className: titleClass }, t(item.title)), /* @__PURE__ */ React.createElement("p", { className: contentClass }, t(item.description)))));
    };
    const productContent = selectedIndex === 0 ? renderMiracleProductContent() : null;
    const extendedContent = selectedIndex === 1 ? renderMiracleExtendedContent() : null;
    const creativeContent = selectedIndex === 2 ? /* @__PURE__ */ React.createElement("section", { className: "touch-reveal border-t border-zinc-200/80 pt-14 md:pt-20" }, /* @__PURE__ */ React.createElement("div", { className: "mb-8 max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, "03"), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-zinc-950" }, lang2 === "en" ? "Creative Operation" : "创意执行现场"), /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[62ch] text-base font-medium leading-[1.75] text-zinc-600 md:text-lg" }, lang2 === "en" ? "Shoot-day records show how creative planning moved into styling, location coordination, model follow-up, and on-site asset production." : "外拍花絮记录了创意方案如何落地到造型、场地协调、模特跟拍与现场素材生产。")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, workflowImages.map((image, index) => /* @__PURE__ */ React.createElement("figure", { key: `miracle-workflow-${index}`, className: "overflow-hidden rounded-[28px] border border-zinc-200/50 bg-white shadow-[0_20px_58px_-46px_rgba(15,23,42,0.22)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(image.src), className: "group block w-full cursor-zoom-in bg-white text-left", "aria-label": lang2 === "en" ? "Open Creative Operation image" : "放大查看 Creative Operation 图片" }, /* @__PURE__ */ React.createElement("img", { src: image.src, alt: t(image.alt), loading: index === 0 ? "eager" : "lazy", className: "block aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:saturate-[1.04]" })), /* @__PURE__ */ React.createElement("figcaption", { className: "px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600" }, t(image.caption)))))) : null;
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-14 md:space-y-20" }, /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-6 md:mt-8" }, /* @__PURE__ */ React.createElement("div", {
      className: "decathlon-showcase flex flex-col items-center justify-center gap-4 md:min-h-[500px] md:flex-row md:items-center md:gap-6 lg:gap-8",
      onMouseLeave: () => setHoveredMiracleModuleIndex(null)
    }, modules.map(renderModuleCard))), productContent, extendedContent, creativeContent);
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
      return /* @__PURE__ */ React.createElement("section", { key: `artificial-${i}`, className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, sectionNumber), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.7rem,3vw,2.6rem)] font-bold tracking-[-0.02em] leading-[1.08] text-zinc-900" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base md:text-lg leading-[1.8] font-medium text-zinc-600 whitespace-pre-wrap" }, t(sec.content))), hasWideImage && renderFigure(sec.image, sec.imageAlt, sec.caption, `artificial-image-${i}`), images.length === 4 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, index) => /* @__PURE__ */ React.createElement("figure", { key: `artificial-grid-${i}-${index}`, className: "overflow-hidden rounded-[26px] border border-zinc-200/45 bg-transparent shadow-[0_18px_40px_-28px_rgba(15,23,42,0.14)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(image.src), className: "block w-full cursor-zoom-in bg-transparent text-left", "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片" }, /* @__PURE__ */ React.createElement("img", { src: image.src, alt: t(image.alt) || t(sec.title), loading: "lazy", className: "block h-full w-full object-contain aspect-[4/3]" })))), sec.caption && /* @__PURE__ */ React.createElement("p", { className: "max-w-[58ch] text-sm leading-[1.7] text-zinc-500" }, t(sec.caption))), images.length === 2 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" }, images.map((image, index) => renderFigure(image.src, image.alt, image.caption, `artificial-pair-${i}-${index}`))));
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
          en: "The research progresses through three connected stages: experiment design, experiment execution, and data analysis. Each stage defines its own research inputs, procedures, and outputs.",
          cn: "\u7814\u7A76\u5206\u4E3A\u5B9E\u9A8C\u8BBE\u8BA1\u3001\u5B9E\u9A8C\u5C55\u5F00\u4E0E\u6570\u636E\u5206\u6790\u4E09\u4E2A\u8FDE\u7EED\u9636\u6BB5\uFF0C\u5206\u522B\u5BF9\u5E94\u6848\u5934\u5206\u6790\u4E0E\u65B9\u6848\u642D\u5EFA\u3001\u6B63\u5F0F\u6D4B\u8BD5\u4E0E\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u95EE\u5377\u3001\u89C2\u5BDF\u548C\u8BBF\u8C08\u7ED3\u679C\u7684\u7EFC\u5408\u5206\u6790\u3002"
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
        cn: "\u5728\u8FDB\u5165\u6570\u636E\u5206\u6790\u524D\uFF0C\u7814\u7A76\u4F9D\u6B21\u8BB0\u5F55\u88AB\u8BD5\u6784\u6210\u3001\u89C2\u770B\u8DDD\u79BB\u3001\u6B63\u5F0F\u6D4B\u8BD5\u6B65\u9AA4\u4E0E\u73B0\u573A\u6267\u884C\u60C5\u51B5\u3002"
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
          en: "The dataset includes 20 participants, 280 subjective-rating records, 140 attention-count records, 140 interview records, and approximately 600 minutes of experiment footage.",
          cn: "\u6570\u636E\u96C6\u5305\u542B 20 \u4F4D\u88AB\u8BD5\u3001280 \u6761\u4E3B\u89C2\u8BC4\u5206\u3001140 \u6761\u6CE8\u610F\u529B\u6B21\u6570\u8BB0\u5F55\u3001140 \u6761\u8BBF\u8C08\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u7EA6 600 \u5206\u949F\u5B9E\u9A8C\u5F71\u50CF\u3002"
        }
      }, {
        page: 14,
        title: { en: "Subjective Attention Ratings", cn: "\u6CE8\u610F\u529B\u5F71\u54CD\u4E3B\u89C2\u8BC4\u5206" },
        content: {
          en: "Scores for A through D1 are organized by participant and averaged by condition, establishing the first comparison of how strongly each screen arrangement affected attention.",
          cn: "A \u81F3 D1 \u4E03\u7EC4\u6761\u4EF6\u7684\u8BC4\u5206\u4EE5\u88AB\u8BD5\u4E3A\u5355\u4F4D\u5206\u6790\uFF0C\u5E76\u8BA1\u7B97\u5404\u7EC4\u5E73\u5747\u503C\uFF0C\u5F62\u6210\u4E0D\u540C\u5C4F\u5E55\u5E03\u5C40\u5BF9\u6CE8\u610F\u529B\u5F71\u54CD\u7A0B\u5EA6\u7684\u7B2C\u4E00\u8F6E\u6BD4\u8F83\u3002"
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
          cn: "\u8BBF\u8C08\u5185\u5BB9\u6309\u7167\u4E0A\u4E0B\u4F4D\u7F6E\u3001\u5DE6\u53F3\u4F4D\u7F6E\u3001\u5F71\u50CF\u5C3A\u5BF8\u3001\u5F71\u50CF\u5185\u5BB9\u3001\u58F0\u97F3\u3001\u8FD0\u52A8\u8F68\u8FF9\u3001\u540E\u89C6\u955C\u51B2\u7A81\u4E0E\u9053\u8DEF\u72B6\u51B5\u7B49\u56E0\u7D20\u8FDB\u884C\u7F16\u7801\u5206\u6790\u3002"
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
        en: "The final stage consolidates the attention-impact pattern and translates the findings into passenger-screen layout recommendations.",
        cn: "\u6700\u540E\u5C06\u6CE8\u610F\u529B\u5F71\u54CD\u89C4\u5F8B\u6C47\u603B\u4E3A\u7ED3\u8BBA\uFF0C\u5E76\u8FDB\u4E00\u6B65\u8F6C\u5316\u4E3A\u526F\u9A7E\u5C4F\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u5E03\u5C40\u5EFA\u8BAE\u3002"
      },
      pages: [{
        page: 21,
        title: { en: "Experiment Conclusions", cn: "\u5B9E\u9A8C\u7ED3\u8BBA" },
        content: {
          en: "The conclusion maps the relative attention impact of the tested conditions, identifies critical placement and size relationships, and summarizes the main findings from the experiment.",
          cn: "\u7ED3\u8BBA\u6C47\u603B\u4E03\u7EC4\u6761\u4EF6\u7684\u76F8\u5BF9\u6CE8\u610F\u529B\u5F71\u54CD\uFF0C\u8BC6\u522B\u5F71\u50CF\u4F4D\u7F6E\u4E0E\u753B\u5E45\u5927\u5C0F\u7684\u5173\u952E\u5173\u7CFB\uFF0C\u5E76\u96C6\u4E2D\u5448\u73B0\u5B9E\u9A8C\u7684\u4E3B\u8981\u53D1\u73B0\u3002"
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
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-24 md:space-y-32" }, chapters.map((chapter, chapterIndex) => /* @__PURE__ */ React.createElement("section", { key: `passenger-report-chapter-${chapterIndex}`, className: "space-y-12 md:space-y-16" }, /* @__PURE__ */ React.createElement("header", { className: "max-w-4xl border-t border-zinc-200/80 pt-10 md:pt-12" }, /* @__PURE__ */ React.createElement("p", { className: "mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600" }, String(chapterIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-zinc-950" }, t(chapter.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-[68ch] text-base font-medium leading-[1.8] text-zinc-600 md:text-lg" }, t(chapter.description))), /* @__PURE__ */ React.createElement("div", { className: "space-y-14 md:space-y-20" }, chapter.pages.map((page, pageIndex) => {
      const pageSrc = `assets/portfolio/passenger-screen-visual-impact/report-page-${String(page.page).padStart(2, "0")}.png`;
      return /* @__PURE__ */ React.createElement(
        "article",
        {
          key: `passenger-report-page-${page.page}`,
          className: "grid grid-cols-1 gap-7 border-t border-zinc-200/70 pt-10 lg:grid-cols-[minmax(0,0.31fr)_minmax(0,0.69fr)] lg:items-center lg:gap-12 xl:gap-16"
        },
        /* @__PURE__ */ React.createElement("div", { className: "max-w-md" }, /* @__PURE__ */ React.createElement("p", { className: "mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400" }, String(chapterIndex + 1).padStart(2, "0"), ".", String(pageIndex + 1).padStart(2, "0"), " / PDF ", page.page), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.12] tracking-[-0.018em] text-zinc-900" }, t(page.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-5 text-base font-medium leading-[1.78] text-zinc-600" }, t(page.content))),
        /* @__PURE__ */ React.createElement("figure", { className: "touch-media min-w-0 overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_20px_54px_-40px_rgba(15,23,42,0.22)]" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setCertificatePreview(pageSrc),
            className: "block w-full cursor-zoom-in bg-transparent",
            "aria-label": lang2 === "en" ? "Open report page preview" : "\u653E\u5927\u67E5\u770B\u62A5\u544A\u9875"
          },
          /* @__PURE__ */ React.createElement(
            "img",
            {
              src: pageSrc,
              alt: t(page.title),
              loading: chapterIndex === 0 ? "eager" : "lazy",
              className: "block h-auto w-full object-contain"
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
      className: "overflow-hidden rounded-[28px] border border-zinc-200/45 bg-transparent shadow-[0_20px_50px_-34px_rgba(15,23,42,0.16)]"
    }, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => setCertificatePreview(sec.image),
      className: "block w-full cursor-zoom-in bg-transparent text-left",
      "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片"
    }, /* @__PURE__ */ React.createElement("img", {
      src: sec.image,
      alt: t(sec.imageAlt) || t(sec.title),
      loading: index < 2 ? "eager" : "lazy",
      className: "block h-auto w-full object-contain"
    })), sec.caption && /* @__PURE__ */ React.createElement("figcaption", {
      className: "border-t border-zinc-100 px-5 py-4 text-sm leading-relaxed text-zinc-500"
    }, t(sec.caption)));
  };
  const renderMemoryParkingDetail = () => /* @__PURE__ */ React.createElement("div", {
    className: "space-y-14 md:space-y-20"
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
      cn: "“空中硬币”把职场反馈关系转译成实体游戏体验。它将打字速度转化为下落的硬币、偏转的指针与可见的竞争，把投入、奖励与不均衡回报从抽象承诺转化为可以被直接观看的社会机制。"
      },
      images: [
        { src: "assets/portfolio/coins-in-the-sky/photo-01.png", alt: { en: "Coins in the Sky overview photo 1", cn: "“空中硬币”概览图 1" } },
        { src: "assets/portfolio/coins-in-the-sky/photo-04.png", alt: { en: "Coins in the Sky overview photo 2", cn: "“空中硬币”概览图 2" } }
      ]
    }, {
      key: "setup",
      title: { en: "Interaction Setup", cn: "\u4EA4\u4E92\u88C5\u7F6E\u4E0E\u4F7F\u7528\u65B9\u5F0F" },
      content: {
        en: "Players type on keyboards to drive the installation. The input speed changes how quickly coins are released and how the exit pointer swings, so the relationship between labor, pressure, and reward becomes a concrete multiplayer situation rather than a hidden workplace metric.",
        cn: "玩家通过键盘输入驱动装置。输入速度会改变硬币释放的节奏，也会影响出口指针的偏转方向，于是劳动、压力与回报之间的关系被转化为具体的多人竞争场景，而不再是隐藏在工作环境中的抽象指标。"
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
        cn: "装置把简单却不平等的规则可视化：投入越多，期待得到的也越多。当更多玩家加入后，分配会变得不稳定且明显偏向，因为指针会向更快的输入者一侧倾斜。反馈不再是中性的，它具有方向性、竞争性，也并不平均。"
      },
      motion: [
        { src: "assets/portfolio/coins-in-the-sky/motion-single-fast.gif", alt: { en: "Single-player fast input motion", cn: "\u5355\u4EBA\u5FEB\u901F\u8F93\u5165\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-single-slow.gif", alt: { en: "Single-player slow input motion", cn: "\u5355\u4EBA\u6162\u901F\u8F93\u5165\u52A8\u56FE" } },
        { src: "assets/portfolio/coins-in-the-sky/motion-coin-payout.gif", alt: { en: "Multi-player competition motion", cn: "\u591A\u4EBA\u7ADE\u4E89\u52A8\u56FE" } },
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
    const renderCoinsFigure = (src, alt, key, eager = false) => /* @__PURE__ */ React.createElement("figure", { key, className: "overflow-hidden rounded-[28px] border border-zinc-200/45 bg-transparent shadow-[0_20px_48px_-32px_rgba(15,23,42,0.14)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(src), className: "block w-full cursor-zoom-in bg-transparent text-left", "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片" }, /* @__PURE__ */ React.createElement("img", { src, alt: t(alt), loading: eager ? "eager" : "lazy", className: "block h-full w-full object-contain aspect-[4/3]" })));
    const renderValueFigure = (item, index) => /* @__PURE__ */ React.createElement("figure", { key: `coins-value-${index}`, className: "rounded-[24px] border border-zinc-200/45 bg-transparent p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.16)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(item.src), className: "block w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-zinc-200/45 bg-transparent text-left", "aria-label": lang2 === "en" ? "Open image preview" : "放大查看图片" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: t(item.label), loading: "lazy", className: "block aspect-square w-full object-contain" })), /* @__PURE__ */ React.createElement("figcaption", { className: "pt-4 text-sm font-semibold leading-relaxed text-zinc-700" }, t(item.label)));
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
          className: "w-full bg-transparent",
          mediaClassName: "aspect-[4000/2225]",
          imageClassName: "block h-full w-full object-contain"
        }
      ), isFieldResearch && /* @__PURE__ */ React.createElement("figure", { className: "mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/90 bg-zinc-950 shadow-[0_20px_48px_-34px_rgba(15,23,42,0.18)]" }, /* @__PURE__ */ React.createElement("div", { className: "aspect-video w-full overflow-hidden bg-black" }, /* @__PURE__ */ React.createElement(
        "video",
        {
          src: sec.video,
          controls: true,
          playsInline: true,
          preload: "none",
          poster: getVideoPoster(sec.video, imageSrc || project.coverImage),
          className: "block h-full w-full bg-black object-contain"
        }
      )), /* @__PURE__ */ React.createElement("figcaption", { className: "bg-transparent px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600" }, lang2 === "cn" ? "\u8865\u5145\u8BB0\u5F55\uFF1ASWEEEP Kuusakoski \u7535\u5B50\u5E9F\u5F03\u7269\u5904\u7406\u73B0\u573A\u3002" : "Supplementary field record from the SWEEEP Kuusakoski e-waste treatment facility.")));
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
          className: "w-full bg-transparent",
          mediaClassName: "aspect-[4000/2225]",
          imageClassName: "block h-full w-full object-contain"
        }
      ), sectionVideo && /* @__PURE__ */ React.createElement("figure", { className: "mx-auto w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/90 bg-zinc-950 shadow-[0_20px_48px_-34px_rgba(15,23,42,0.18)]" }, /* @__PURE__ */ React.createElement("div", { className: "aspect-video w-full overflow-hidden bg-black" }, /* @__PURE__ */ React.createElement("video", { src: sectionVideo, controls: true, playsInline: true, preload: "none", poster: getVideoPoster(sectionVideo, imageSrc || project.coverImage), className: "block h-full w-full bg-black object-contain" })), sec.caption && /* @__PURE__ */ React.createElement("figcaption", { className: "bg-transparent px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600" }, t(sec.caption))));
    }));
  };
  const renderDecathlonDetail = () => {
    const sections = project.sections || [];
    const safeIndex = Math.min(selectedDecathlonIndex, Math.max(sections.length - 1, 0));
    const sec = sections[safeIndex] || sections[0];
    if (!sec) return null;
    const annotationItems = t(sec.annotations) || [];
    const pageItems = sec.image ? [{
      src: sec.image,
      alt: sec.imageAlt,
      caption: sec.caption
    }] : sec.pages?.length > 0 ? sec.pages : [];
    return /* @__PURE__ */ React.createElement("section", { className: "decathlon-detail-grid mt-10 md:mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-5 lg:sticky lg:top-28" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[30px] border border-zinc-200/70 bg-white p-7 shadow-[0_20px_56px_-44px_rgba(15,23,42,0.24)] md:p-8" }, /* @__PURE__ */ React.createElement("p", { className: "mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500" }, String(safeIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", { className: "text-[clamp(2.1rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.042em] text-zinc-950" }, t(sec.title)), t(sec.content) && /* @__PURE__ */ React.createElement("p", { className: "mt-6 whitespace-pre-wrap text-base font-medium leading-[1.78] text-zinc-700" }, t(sec.content))), annotationItems.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "rounded-[30px] border border-zinc-200/70 bg-white p-7 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.18)] md:p-8" }, /* @__PURE__ */ React.createElement("ul", { className: "space-y-4" }, annotationItems.map((item, itemIndex) => /* @__PURE__ */ React.createElement("li", { key: itemIndex, className: "grid grid-cols-[2.4rem_1fr] gap-3 text-sm font-semibold leading-[1.7] text-zinc-700" }, /* @__PURE__ */ React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-[11px] font-bold text-zinc-500 shadow-sm" }, String(itemIndex + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", null, item)))))), /* @__PURE__ */ React.createElement("div", { className: "space-y-5 md:space-y-6" }, pageItems.map((page, pageIndex) => /* @__PURE__ */ React.createElement("figure", { key: `${safeIndex}-${pageIndex}`, className: "overflow-hidden rounded-[24px] border border-zinc-200/45 bg-transparent shadow-[0_22px_72px_-56px_rgba(15,23,42,0.22)]" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setCertificatePreview(page.src), className: "group block w-full bg-transparent text-left outline-none focus:outline-none focus-visible:outline-none", "aria-label": lang2 === "en" ? "Open product page image" : "\u653E\u5927\u67E5\u770B\u5546\u54C1\u9875\u56FE" }, /* @__PURE__ */ React.createElement("img", { src: page.src, alt: t(page.alt) || t(sec.title), loading: pageIndex === 0 ? "eager" : "lazy", className: "block h-auto w-full contrast-[1.08] saturate-[1.06]" }))))));
  };
  const renderDecathlonProductShowcase = () => {
    const sections = project.sections || [];
    if (!sections.length) return null;
    const selectedIndex = Math.min(selectedDecathlonIndex, sections.length - 1);
    return /* @__PURE__ */ React.createElement(
      "section",
      { className: "touch-reveal mt-6 md:mt-8" },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "decathlon-showcase flex flex-col items-center justify-center gap-4 md:min-h-[540px] md:flex-row md:items-center md:gap-5 lg:gap-6",
          onMouseLeave: () => setHoveredDecathlonIndex(null)
        },
        sections.map((sec, index) => {
          const isHovered = index === hoveredDecathlonIndex;
          const isSelected = hoveredDecathlonIndex === null && index === selectedIndex;
          const isActive = isHovered || isSelected;
          const pagePreview = sec.previewImage || sec.pages?.[0]?.src || sec.image;
          const pageAlt = sec.pages?.[0]?.alt || sec.imageAlt;
          const buttonClass = `group relative flex min-h-[340px] w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] border bg-transparent text-left shadow-[0_18px_60px_-48px_rgba(15,23,42,0.35)] outline-none transition-[width,height,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:outline-none md:min-h-0 md:max-w-none ${isHovered ? "md:h-[540px] md:w-[378px] md:z-20 border-transparent shadow-[0_26px_78px_-56px_rgba(15,23,42,0.28)]" : isSelected ? "md:h-[540px] md:w-[378px] md:z-10 border-zinc-300 ring-1 ring-zinc-300/55 shadow-[0_28px_86px_-58px_rgba(15,23,42,0.36)]" : "md:h-[360px] md:w-[252px] border-zinc-200/70 hover:shadow-[0_22px_64px_-50px_rgba(15,23,42,0.18)]"}`;
          const imageShellClass = `relative shrink-0 overflow-hidden transition-[height,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "h-[60%] opacity-100" : "hidden opacity-0"}`;
          const imageClass = "block h-full w-full object-cover";
          const numberClass = `text-[clamp(2.35rem,4.7vw,4rem)] font-light leading-none tracking-[-0.05em] transition duration-300 ${isActive ? "hidden" : "text-zinc-200/70"}`;
          const iconClass = `flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition ${isActive ? "text-zinc-950" : "text-zinc-500"}`;
          const titleClass = `min-w-0 font-semibold leading-[0.98] tracking-[-0.045em] text-zinc-950 transition duration-300 ${lang2 === "cn" ? "whitespace-nowrap" : "break-words [overflow-wrap:anywhere]"} ${isActive ? "max-w-full text-[clamp(1.3rem,1.9vw,1.8rem)] opacity-100" : "max-w-full text-[1.08rem] opacity-95"}`;
          const contentClass = `min-w-0 max-w-[20rem] break-words text-[1rem] font-normal leading-[1.52] text-zinc-600 transition duration-300 [overflow-wrap:anywhere] ${isActive ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`;
          const contentPanelClass = `relative z-10 flex min-h-0 flex-1 min-w-0 flex-col overflow-visible bg-transparent ${isActive ? "justify-end p-6 pt-0 md:p-6 md:pt-0 md:pb-8" : "justify-between p-6"}`;
          const contentFadeClass = "";
          const imageFadeClass = "";
          const imageFadeStyle = void 0;
          const imageEdgeClass = "";
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: `decathlon-product-${index}`,
              type: "button",
              onMouseEnter: () => setHoveredDecathlonIndex(index),
              onPointerEnter: () => setHoveredDecathlonIndex(index),
              onFocus: () => setHoveredDecathlonIndex(index),
              onClick: () => {
                setSelectedDecathlonIndex(index);
                window.setTimeout(() => document.querySelector(".decathlon-detail-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
              },
              className: buttonClass
            },
            /* @__PURE__ */ React.createElement(
              "div",
              { className: imageShellClass },
              isActive && pagePreview && /* @__PURE__ */ React.createElement(
                React.Fragment,
                null,
                /* @__PURE__ */ React.createElement("img", {
                  src: pagePreview,
                  alt: t(pageAlt) || t(sec.title),
                  loading: index === 0 ? "eager" : "lazy",
                  className: imageClass,
                  style: {
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.58) 80%, rgba(0,0,0,0.22) 92%, rgba(0,0,0,0) 100%)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.58) 80%, rgba(0,0,0,0.22) 92%, rgba(0,0,0,0) 100%)"
                  }
                }),
                imageEdgeClass && /* @__PURE__ */ React.createElement("div", { className: imageEdgeClass }),
                imageFadeClass && /* @__PURE__ */ React.createElement("div", { className: imageFadeClass, style: imageFadeStyle })
              )
            ),
            /* @__PURE__ */ React.createElement(
              "div",
              { className: contentPanelClass },
              isActive && /* @__PURE__ */ React.createElement("div", { className: contentFadeClass }),
              /* @__PURE__ */ React.createElement("p", { className: numberClass }, String(index + 1).padStart(2, "0")),
              /* @__PURE__ */ React.createElement(
                "div",
                { className: "min-w-0 space-y-4" },
                /* @__PURE__ */ React.createElement("div", { className: "flex min-w-0 items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: iconClass }, /* @__PURE__ */ React.createElement(ArrowRight, { size: 17 }))),
                /* @__PURE__ */ React.createElement("h3", { className: titleClass }, t(sec.title)),
                /* @__PURE__ */ React.createElement("p", { className: contentClass }, t(sec.content))
              )
            )
          );
        })
      )
    );
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
  )))), project.slug === "decathlon-website" ? renderDecathlonProductShowcase() : project.slug === "miracle-miles" ? null : project.slug === "smart-solution-4-motion-comfort" ? renderSS4MotionComfortHero() : /* @__PURE__ */ React.createElement("section", { className: "touch-reveal mt-10 md:mt-14" }, primaryEmbed ? renderEditorialEmbed(primaryEmbed, project.heroCaption, "hero-embed") : primaryVideo ? renderEditorialVideo(primaryVideo, primaryVideoSection?.caption, "hero-video") : /* @__PURE__ */ React.createElement("figure", { className: "touch-media overflow-hidden rounded-[26px] border border-zinc-200/45 bg-transparent shadow-[0_28px_80px_-52px_rgba(15,23,42,0.24)]" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: primaryImage,
      alt: t(project.title),
      loading: "eager",
      onError: (event) => {
        const target = event.currentTarget;
        if (target.dataset.fallbackApplied === "true") return;
        target.dataset.fallbackApplied = "true";
        target.src = project.coverImage;
      },
      className: `block w-full aspect-video ${heroImageFitsContain ? "object-contain bg-zinc-950" : "object-cover"}`
    }
  ))));
  return /* @__PURE__ */ React.createElement("div", { className: "pt-32 md:pt-36 pb-28 px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1320px]" }, renderEditorialHeader(), project.slug === "memory-parking-hmi" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderMemoryParkingDetail()) : project.slug === "ea01u" ? /* @__PURE__ */ React.createElement("div", { className: "mt-20 md:mt-28" }, renderEA01UDetail()) : project.slug === "passenger-screen-visual-impact" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal mt-20 md:mt-28" }, renderPassengerScreenReportDetail()) : project.slug === "riverside-changsha" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderRiversideDetail()) : project.slug === "artificial-sky" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderArtificialSkyDetail()) : project.slug === "tri-eco-service" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderTriEcoDetail()) : project.slug === "sonic-patrol" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderSonicPatrolDetail()) : project.slug === "decathlon-website" ? /* @__PURE__ */ React.createElement("div", { className: "border-t border-zinc-200/80 pt-20 mt-20 opacity-100 md:pt-28 md:mt-28" }, renderDecathlonDetail()) : project.slug === "coins-in-the-sky" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28" }, renderCoinsInTheSkyDetail()) : project.slug === "miracle-miles" ? /* @__PURE__ */ React.createElement("div", { className: "touch-reveal mt-10 md:mt-14" }, renderMiracleMilesDetail()) : project.comingSoon ? null : project.sections.length > 0 ? /* @__PURE__ */ React.createElement("div", null, project.sections.map(renderEditorialSection)) : /* @__PURE__ */ React.createElement("div", { className: "touch-reveal border-t border-zinc-200/80 pt-20 mt-20 md:pt-28 md:mt-28 text-zinc-500 text-lg font-medium" }, lang2 === "en" ? "Documentation in progress." : "\u5185\u5BB9\u66F4\u65B0\u4E2D\u3002"), certificatePreview && !activeCertificate && /* @__PURE__ */ React.createElement(
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
        className: "relative flex max-h-[92vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-[18px] bg-transparent shadow-[0_32px_100px_-24px_rgba(0,0,0,0.5)]",
        style: getPreviewFrameStyle(activePreviewCrop),
        onClick: (event) => event.stopPropagation()
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: certificatePreview,
          alt: t(project.title),
          className: "block max-h-[88vh] max-w-[90vw] object-contain",
          style: getPreviewImageStyle(activePreviewCrop)
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

const ProjectRoute = () => {
  const { route } = useContext(RouteContext);
  const slug = route.params?.slug;
  const [project, setProject] = useState(null);

  useEffect(() => {
    let active = true;
    setProject(null);
    loadProjectData(slug).then((nextProject) => {
      if (active) setProject(nextProject);
    });
    return () => { active = false; };
  }, [slug]);

  if (!project) return React.createElement('div', { className: 'min-h-screen' });
  return React.createElement(ProjectDetail, { key: slug, project });
};

export default ProjectRoute;
