// CategoryPage Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var CategoryPage = () => {
  const {
    route
  } = useContext(RouteContext);
  const {
    t
  } = useContext(LanguageContext);
  const categoryKey = route.path.replace("/", "");
  const info = siteContent.categories[categoryKey];
  const projects = gachaProjectCatalog.map((project, catalogIndex) => ({
    ...project,
    catalogIndex
  })).filter((project) => project.category === categoryKey).sort((a, b) => Number(b.year) - Number(a.year) || a.catalogIndex - b.catalogIndex);
  return /* @__PURE__ */ React.createElement("div", {
    className: "pt-36 md:pt-40 pb-24 px-6 max-w-7xl mx-auto animate-fade-up"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "mb-10 md:mb-14 pb-7 md:pb-9 border-b border-zinc-200/70"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-[clamp(1.875rem,3.1vw,2.625rem)] font-bold tracking-[-0.014em] leading-[1.1] mb-4 text-zinc-900"
  }, t(info.title)), /* @__PURE__ */ React.createElement("p", {
    className: "text-base md:text-lg text-zinc-500 max-w-[60ch] leading-[1.56] font-medium"
  }, t(info.desc))), projects.length > 0 ? /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 items-stretch"
  }, projects.map(({
    catalogIndex,
    ...project
  }) => /* @__PURE__ */ React.createElement(ProjectIndexCard, {
    key: project.id,
    project
  }))) : /* @__PURE__ */ React.createElement("div", {
    className: "py-32 text-center bg-white/50 backdrop-blur-md rounded-[32px] border border-white text-zinc-400 font-bold text-lg shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
  }, lang === "en" ? "No projects mapped to this category yet." : "\u5F53\u524D\u6CA1\u6709\u6620\u5C04\u5230\u8BE5\u5206\u7C7B\u7684\u9879\u76EE\u3002"));
}

export default CategoryPage;
