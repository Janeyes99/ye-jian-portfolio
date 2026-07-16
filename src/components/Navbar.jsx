import React, { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageContext, RouteContext } from '../app/contexts.jsx';
import { prefetchRoute } from '../app/route-loaders.js';

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
      cn: "人机界面系统"
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
    onMouseEnter: () => prefetchRoute("/"),
    onFocus: () => prefetchRoute("/"),
    onTouchStart: () => prefetchRoute("/"),
    className: "text-sm font-bold tracking-widest uppercase text-zinc-900 motion-press"
  }, "Ye Jian"), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:flex items-center space-x-1 bg-white/80 p-1.5 rounded-full border border-gray-200 shadow-sm"
  }, navItems.map((item) => /* @__PURE__ */ React.createElement("button", {
    key: item.path,
    onClick: () => navigate(item.path),
    onMouseEnter: () => prefetchRoute(item.path),
    onFocus: () => prefetchRoute(item.path),
    onTouchStart: () => prefetchRoute(item.path),
    className: `text-xs font-semibold px-4 py-2 rounded-full motion-surface ${route.path === item.path ? "bg-zinc-900 text-white shadow-md" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"}`
  }, t(item.label))), /* @__PURE__ */ React.createElement("div", {
    className: "w-[1px] h-4 bg-gray-300 mx-2"
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: toggleLang,
    className: "text-xs font-bold px-4 py-2 rounded-full text-blue-600 hover:bg-blue-50 motion-color motion-press uppercase"
  }, lang2 === "en" ? "Chinese" : "\u82F1\u6587")), /* @__PURE__ */ React.createElement("button", {
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
    onMouseEnter: () => prefetchRoute(item.path),
    onFocus: () => prefetchRoute(item.path),
    onTouchStart: () => prefetchRoute(item.path),
    className: "text-left font-medium text-zinc-700"
  }, t(item.label))), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      toggleLang();
      setMobileOpen(false);
    },
    className: "border-t border-zinc-100 pt-4 text-left text-sm font-bold uppercase tracking-[0.12em] text-blue-600"
  }, lang2 === "en" ? "Chinese" : "\u82F1\u6587")));
};

export default Navbar;
