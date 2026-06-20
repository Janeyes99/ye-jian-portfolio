// Home Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var Home = () => {
  const {
    t,
    lang: lang2
  } = useContext(LanguageContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "px-6 max-w-7xl mx-auto"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "min-h-[calc(100vh-64px)] pt-24 md:pt-28 pb-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)] gap-10 lg:gap-10 xl:gap-12 items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "animate-fade-up max-w-[720px] lg:pb-8"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-zinc-900 leading-[1.58] max-w-[62ch] font-medium whitespace-pre-wrap",
    style: {
      fontSize: "var(--home-lede)"
    }
  }, t(siteContent.hero.subtitle)), /* @__PURE__ */ React.createElement("div", {
    className: "mt-8 max-w-[31rem] border-t border-zinc-200/70 pt-4"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-[0.9375rem] font-medium leading-[1.6] text-zinc-500"
  }, lang2 === "en" ? "Spin the capsule and see what matches." : "\u8F6C\u4E00\u8F6C\u626D\u86CB\u770B\u770B\u4F1A\u5339\u914D\u5230\u4EC0\u4E48\u3002"))), /* @__PURE__ */ React.createElement("div", {
    className: "relative flex justify-center lg:justify-end lg:-mr-3 xl:-mr-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full max-w-[520px] lg:max-w-[520px] lg:origin-right lg:scale-[0.88] xl:scale-[0.94]"
  }, /* @__PURE__ */ React.createElement(InteractiveGacha, null)))));
}

export default Home;
