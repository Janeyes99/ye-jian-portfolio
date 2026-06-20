// Navbar Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var Navbar = () => {
  const {
    lang: lang2,
    t,
    toggleLang
  } = useContext(LanguageContext);
  const {
    route,
    navigate
  } = useContext(RouteContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [{
    path: "/",
    label: {
      en: "Home",
      cn: "\u9996\u9875"
    }
  }, {
    path: "/hmi",
    label: {
      en: "HMI Systems",
      cn: "HMI\u7CFB\u7EDF\u8BBE\u8BA1"
    }
  }, {
    path: "/interaction-mechanisms",
    label: {
      en: "Interaction Mechanisms",
      cn: "\u4EA4\u4E92\u673A\u5236"
    }
  }, {
    path: "/installations",
    label: {
      en: "Installations",
      cn: "\u4EA4\u4E92\u88C5\u7F6E"
    }
  }, {
    path: "/service-brand",
    label: {
      en: "Service & Brand",
      cn: "\u670D\u52A1\u4E0E\u54C1\u724C"
    }
  }, {
    path: "/contact",
    label: {
      en: "Contact",
      cn: "\u8054\u7CFB"
    }
  }];
  return /* @__PURE__ */ React.createElement("nav", {
    className: "fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-gray-200/50 motion-surface"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => navigate("/"),
    className: "text-sm font-bold tracking-widest uppercase text-zinc-900 motion-press"
  }, "Ye Jian"), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:flex items-center space-x-1 bg-white/80 p-1.5 rounded-full border border-gray-200 shadow-sm"
  }, navItems.map((item) => /* @__PURE__ */ React.createElement("button", {
    key: item.path,
    onClick: () => navigate(item.path),
    className: `text-xs font-semibold px-4 py-2 rounded-full motion-surface ${route.path === item.path ? "bg-zinc-900 text-white shadow-md" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"}`
  }, t(item.label))), /* @__PURE__ */ React.createElement("div", {
    className: "w-[1px] h-4 bg-gray-300 mx-2"
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: toggleLang,
    className: "text-xs font-bold px-4 py-2 rounded-full text-blue-600 hover:bg-blue-50 motion-color motion-press uppercase"
  }, lang2 === "en" ? "\u4E2D\u6587" : "EN")), /* @__PURE__ */ React.createElement("button", {
    className: "md:hidden text-zinc-900 motion-press",
    onClick: () => setMobileOpen(!mobileOpen)
  }, mobileOpen ? /* @__PURE__ */ React.createElement(X, {
    size: 20
  }) : /* @__PURE__ */ React.createElement(Menu, {
    size: 20
  }))), mobileOpen && /* @__PURE__ */ React.createElement("div", {
    className: "md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-6 flex flex-col space-y-4 shadow-xl z-50"
  }, navItems.map((item) => /* @__PURE__ */ React.createElement("button", {
    key: item.path,
    onClick: () => {
      navigate(item.path);
      setMobileOpen(false);
    },
    className: "text-left font-medium text-zinc-700"
  }, t(item.label)))));
};
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
}]

export default Navbar;
