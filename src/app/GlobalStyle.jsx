import React from 'react';

var GlobalStyle = () => /* @__PURE__ */ React.createElement("style", null, `
    :root {
      --bg: #FAFAFA;
      --fg: #18181B;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --home-name: clamp(2rem, 3.25vw, 2.875rem);
      --home-role: clamp(1.375rem, 2.15vw, 1.875rem);
      --home-lede: clamp(1.0625rem, 1.35vw, 1.25rem);
      --home-section-gap: clamp(4.5rem, 8vw, 8rem);
      --motion-press: 120ms;
      --motion-hover: 180ms;
      --motion-panel: 240ms;
      --motion-ornament: 820ms;
      --ease-standard: cubic-bezier(0.2, 0, 0, 1);
      --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-emphasized: cubic-bezier(0.22, 1, 0.36, 1);
    }
    body {
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      background-image: 
        radial-gradient(circle at 10% 50%, rgba(59, 130, 246, 0.08), transparent 40%),
        radial-gradient(circle at 90% 30%, rgba(192, 132, 252, 0.08), transparent 40%);
    }
    
    html {
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
    }
    html:hover,
    html.is-scrolling {
      scrollbar-color: rgba(113, 113, 122, 0.38) transparent;
    }
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border: 3px solid transparent;
      border-radius: 999px;
      background-color: transparent;
      background-clip: content-box;
    }
    html:hover::-webkit-scrollbar-thumb,
    html.is-scrolling::-webkit-scrollbar-thumb {
      background-color: rgba(113, 113, 122, 0.38);
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(82, 82, 91, 0.54);
    }

    @keyframes ss4-screen-drift {
      0% { transform: scale(1.04) translate3d(-0.8%, 0, 0); }
      50% { transform: scale(1.08) translate3d(0.8%, -0.35%, 0); }
      100% { transform: scale(1.04) translate3d(-0.2%, 0.3%, 0); }
    }
    .ss4-motion-active {
      animation: ss4-screen-drift 7s linear infinite;
    }
    @keyframes ss4-radar-sweep {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* Advanced Physical Sliders */
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      margin: 10px 0;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #d4d4d8;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 -2px 4px rgba(0,0,0,0.1);
      cursor: grab;
      margin-top: -8px;
    }
    input[type=range]::-webkit-slider-thumb:active {
      cursor: grabbing;
      background: #f4f4f5;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      background: #e4e4e7;
      border-radius: 999px;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
    }
    input[type=range]:focus { outline: none; }

    /* Motion System */
    .motion-surface {
      transition-property: background-color, border-color, box-shadow, opacity, transform, filter;
      transition-duration: var(--motion-hover);
      transition-timing-function: var(--ease-out-soft);
    }
    .motion-color {
      transition-property: color, background-color, border-color, opacity;
      transition-duration: var(--motion-hover);
      transition-timing-function: var(--ease-out-soft);
    }
    .motion-transform {
      transition: transform var(--motion-hover) var(--ease-out-soft);
    }
    .motion-press {
      transition-property: background-color, border-color, box-shadow, color, opacity, transform;
      transition-duration: var(--motion-press);
      transition-timing-function: var(--ease-out-soft);
    }
    .motion-press:active,
    .motion-dial-button:active,
    .motion-outlet-capsule:active {
      transform: scale(0.97);
    }
    .motion-capsule,
    .motion-dial-button,
    .motion-outlet-capsule {
      transition: transform var(--motion-hover) var(--ease-out-soft), opacity var(--motion-hover) var(--ease-out-soft), filter var(--motion-hover) var(--ease-out-soft);
    }
    @media (hover: hover) and (pointer: fine) {
      .group:hover .motion-capsule { transform: translateY(-2px) scale(1.06); }
      .motion-dial-button:hover { transform: scale(1.035); }
      .motion-outlet-capsule:hover { transform: translateY(-2px) scale(1.06); }
    }
    @media (hover: none), (pointer: coarse) {
      .group:hover .motion-capsule,
      .motion-dial-button:hover,
      .motion-outlet-capsule:hover { transform: none; }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up {
      animation: fadeUp 0.48s var(--ease-out-soft) forwards;
    }
    @keyframes fadeInSimple {
      from { opacity: 0; transform: scale(0.985); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in-simple {
      animation: fadeInSimple var(--motion-panel) var(--ease-out-soft) both;
    }
    @keyframes rumble {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      35% { transform: translate3d(-1px, 1px, 0) rotate(-0.35deg); }
      70% { transform: translate3d(1px, -0.5px, 0) rotate(0.3deg); }
    }
    .animate-rumble {
      animation: rumble 0.16s var(--ease-standard) infinite;
    }
    @keyframes spin-dial {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(720deg); }
    }
    .animate-spin-dial {
      animation: spin-dial 0.92s var(--ease-emphasized) forwards;
    }
    @keyframes capsule-jostle {
      0%, 100% { transform: translateY(0); }
      46% { transform: translateY(-4px); }
      72% { transform: translateY(1px); }
    }
    .animate-capsule-jostle {
      animation: capsule-jostle 0.62s var(--ease-out-soft) infinite;
    }
    @keyframes capsule-exit {
      0% { opacity: 0; transform: translateY(-12px) scale(0.86); }
      58% { opacity: 1; transform: translateY(2px) scale(1.03); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-capsule-exit {
      animation: capsule-exit 0.58s var(--ease-out-soft) both;
    }
    @keyframes capsule-settle {
      0% { transform: translate3d(0, 0, 0) rotate(0deg); }
      36% { transform: translate3d(-1px, -3px, 0) rotate(-0.9deg); }
      66% { transform: translate3d(1px, 1px, 0) rotate(0.7deg); }
      100% { transform: translate3d(0, 0, 0) rotate(0deg); }
    }
    .animate-capsule-settle {
      animation: capsule-settle 0.78s var(--ease-out-soft) both;
    }
    @keyframes soft-ping {
      0% { opacity: 0.38; transform: scale(0.92); }
      70% { opacity: 0; transform: scale(1.55); }
      100% { opacity: 0; transform: scale(1.55); }
    }
    .animate-soft-ping {
      animation: soft-ping 1.28s var(--ease-out-soft) infinite;
    }

    /* Loading blob/progress motion is driven by GSAP timelines. */

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
      .animate-rumble,
      .animate-capsule-jostle,
      .animate-capsule-settle,
      .animate-spin-dial,
      .animate-capsule-exit,
      .animate-soft-ping {
        animation: none !important;
      }
    }

    /* Flash bang */
    @keyframes flash-bang {
      0% { opacity: 0; transform: scale(0.5); filter: blur(0); }
      20% { opacity: 1; transform: scale(1.5); filter: blur(10px); background: white; }
      100% { opacity: 0; transform: scale(3); filter: blur(40px); background: white; }
    }

    /* Capsule Pop */
    @keyframes top-crack {
      0% { transform: rotate(0deg) translate(0,0); }
      100% { transform: rotate(-45deg) translate(-20px, -30px); opacity: 0;}
    }
    @keyframes bottom-crack {
      0% { transform: rotate(0deg) translate(0,0); }
      100% { transform: rotate(45deg) translate(20px, 30px); opacity: 0;}
    }
  `);

export default GlobalStyle;
