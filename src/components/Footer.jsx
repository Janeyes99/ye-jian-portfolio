import React, { useContext } from 'react';
import { LanguageContext } from '../app/contexts.jsx';

var Footer = () => {
  const {
    lang: lang2
  } = useContext(LanguageContext);
  return /* @__PURE__ */ React.createElement("footer", {
    className: "border-t border-zinc-200/50 mt-32 py-12 text-center text-xs text-zinc-400 font-bold tracking-widest uppercase bg-white/50 backdrop-blur-lg"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
  }, /* @__PURE__ */ React.createElement("span", null, lang2 === "en" ? ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Ye Jian. All Rights Reserved."] : ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " 简烨 版权所有"]), /* @__PURE__ */ React.createElement("span", null, lang2 === "en" ? "Ye Jian Design" : "简烨设计")));
};

export default Footer;
