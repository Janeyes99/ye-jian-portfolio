// Footer Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var Footer = () => /* @__PURE__ */ React.createElement("footer", {
  className: "border-t border-zinc-200/50 mt-32 py-12 text-center text-xs text-zinc-400 font-bold tracking-widest uppercase bg-white/50 backdrop-blur-lg"
}, /* @__PURE__ */ React.createElement("div", {
  className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
}, /* @__PURE__ */ React.createElement("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Ye Jian. All Rights Reserved."), /* @__PURE__ */ React.createElement("span", null, "Dimensional Interface Architecture")))

export default Footer;
