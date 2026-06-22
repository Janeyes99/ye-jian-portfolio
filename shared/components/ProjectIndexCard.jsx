// ProjectIndexCard Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

var ProjectIndexCard = ({
  project
}) => {
  const {
    t,
    lang: lang2
  } = useContext(LanguageContext);
  const {
    navigate
  } = useContext(RouteContext);
  const detailProject = project.slug ? projectsData.find((item) => item.slug === project.slug) : null;
  const hasDetail = Boolean(detailProject);
  const categoryTitle = siteContent.categories[project.category]?.title;
  const cardTitle = detailProject?.title || project.title;
  const cardSubtitle = detailProject?.subtitle;
  const cardTags = detailProject?.tags?.[lang2] || [];
  const openProject = () => {
    if (hasDetail) navigate("/project", {
      slug: detailProject.slug
    });
  };
  if (hasDetail) {
    return /* @__PURE__ */ React.createElement("article", {
      className: "group cursor-pointer overflow-hidden bg-white/64 backdrop-blur-2xl border border-white/80 rounded-[26px] shadow-[0_18px_42px_-26px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_54px_-32px_rgba(59,130,246,0.13),0_0_0_1px_rgba(148,163,184,0.16)] hover:bg-slate-50/70 hover:border-slate-200/80 motion-surface",
      onClick: openProject,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProject();
        }
      },
      role: "button",
      tabIndex: 0
    }, /* @__PURE__ */ React.createElement("div", {
      className: "aspect-[16/11] w-full overflow-hidden bg-zinc-100"
    }, /* @__PURE__ */ React.createElement("img", {
      src: detailProject.coverImage,
      alt: t(cardTitle),
      loading: "lazy",
      className: "h-full w-full object-contain bg-white motion-surface group-hover:opacity-[0.96]"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "p-5 md:p-6"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 flex items-start justify-between gap-4"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "text-[0.75rem] text-zinc-400 font-mono font-semibold leading-none"
    }, project.year), /* @__PURE__ */ React.createElement("span", {
      className: "text-[0.6875rem] leading-none font-bold tracking-[0.08em] uppercase text-zinc-500 bg-zinc-100/80 rounded-full px-3 py-1.5 text-right"
    }, t(categoryTitle))), /* @__PURE__ */ React.createElement("h3", {
      className: "text-[clamp(1.125rem,1.25vw,1.375rem)] font-bold text-zinc-900 leading-[1.18] tracking-[-0.004em]"
    }, t(cardTitle)), cardSubtitle && /* @__PURE__ */ React.createElement("p", {
      className: "mt-3 text-[0.9375rem] leading-[1.55] text-zinc-500 line-clamp-3 font-medium"
    }, t(cardSubtitle)), cardTags.length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "mt-5 flex flex-wrap gap-2"
    }, cardTags.slice(0, 2).map((tag, idx) => /* @__PURE__ */ React.createElement("span", {
      key: idx,
      className: "rounded-full bg-zinc-100/80 px-3 py-1.5 text-[0.6875rem] font-semibold leading-none text-zinc-600"
    }, tag))), /* @__PURE__ */ React.createElement("div", {
      className: "mt-6 border-t border-zinc-100 pt-4 flex items-center justify-between text-[0.72rem] font-bold uppercase tracking-[0.14em] text-zinc-400 group-hover:text-blue-600 motion-color"
    }, /* @__PURE__ */ React.createElement("span", null, lang2 === "en" ? "View Project" : "\u67E5\u770B\u9879\u76EE"), /* @__PURE__ */ React.createElement(ArrowRight, {
      size: 17,
      className: "transform group-hover:translate-x-1 motion-transform"
    }))));
  }
  return /* @__PURE__ */ React.createElement("article", {
    className: "min-h-[188px] p-5 md:p-6 flex flex-col justify-between bg-white/48 backdrop-blur-xl border border-white/70 rounded-[24px] shadow-[0_12px_30px_-24px_rgba(15,23,42,0.07)] cursor-default"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-start justify-between gap-4 mb-8"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-[0.75rem] text-zinc-400 font-mono font-semibold leading-none"
  }, project.year), /* @__PURE__ */ React.createElement("span", {
    className: "text-[0.6875rem] leading-none font-bold tracking-[0.08em] uppercase text-zinc-400 bg-zinc-100/60 rounded-full px-3 py-1.5 text-right"
  }, t(categoryTitle))), /* @__PURE__ */ React.createElement("h3", {
    className: "text-[clamp(1.0625rem,1.15vw,1.25rem)] font-bold text-zinc-800 leading-[1.2] tracking-[-0.002em]"
  }, t(project.title))), /* @__PURE__ */ React.createElement("div", {
    className: "pt-4 mt-7 border-t border-zinc-100 flex items-center justify-between text-[0.72rem] font-bold uppercase tracking-[0.14em] text-zinc-300"
  }, /* @__PURE__ */ React.createElement("span", null, lang2 === "en" ? "Open Project" : "\u6253\u5F00\u9879\u76EE"), /* @__PURE__ */ React.createElement("span", {
    className: "h-1.5 w-1.5 rounded-full bg-zinc-300"
  })));
}

export default ProjectIndexCard;
