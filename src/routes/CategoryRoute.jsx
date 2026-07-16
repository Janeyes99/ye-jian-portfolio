import React, { useContext } from 'react';
import { LanguageContext, RouteContext } from '../app/contexts.jsx';
import { gachaProjectCatalog, siteContent } from '../data/catalog.js';
import ProjectIndexCard from '../components/ProjectIndexCard.jsx';

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
};
const COS_ASSET_BASE = "assets/portfolio/";
const previewCropRules = [
  ["artificial-sky/process-journal/page-02.jpg", 0.0667, 0.0444, 0.1148, 0.0739, 1.5497],
  ["artificial-sky/process-journal/page-03.jpg", 0.0622, 0.0533, 0.0975, 0.0959, 1.551],
  ["artificial-sky/process-journal/page-04.jpg", 0.0333, 0.0333, 0.0519, 0.0456, 1.4628],
  ["artificial-sky/process-journal/page-05.jpg", 0.0333, 0.0333, 0.0519, 0.0472, 1.4653],
  ["artificial-sky/process-journal/page-06.jpg", 0.0333, 0.0333, 0.0472, 0.0456, 1.4552],
  ["artificial-sky/process-journal/page-07.jpg", 0.0433, 0.0389, 0.077, 0.1085, 1.5939],
  ["artificial-sky/process-journal/page-08.jpg", 0.1189, 0.1578, 0.0472, 0.0896, 1.1853],
  ["artificial-sky/process-journal/page-09.jpg", 0.0333, 0.0333, 0.0519, 0.0456, 1.4628],
  ["artificial-sky/process-journal/page-10.jpg", 0.0333, 0.0333, 0.0519, 0.0472, 1.4653],
  ["artificial-sky/process-journal/page-11.jpg", 0.0333, 0.0333, 0.0519, 0.0472, 1.4653],
  ["artificial-sky/process-journal/page-12.jpg", 0.0656, 0.0633, 0.0409, 0.0487, 1.3535],
  ["artificial-sky/process-journal/page-13.jpg", 0.0333, 0.0333, 0.0519, 0.0456, 1.4628],
  ["artificial-sky/process-journal/page-14.jpg", 0.0333, 0.0567, 0.0519, 0.077, 1.4777],
  ["artificial-sky/process-journal/page-15.jpg", 0.0333, 0.0333, 0.0519, 0.0456, 1.4628],
  ["artificial-sky/process-journal/page-16.jpg", 0.0333, 0.0611, 0.0519, 0.0016, 1.3532],
  ["artificial-sky/process-journal/page-17.jpg", 0.0333, 0.0333, 0.0519, 0.0456, 1.4628],
  ["artificial-sky/process-journal/page-18.jpg", 0.0333, 0.0333, 0.0456, 0.0472, 1.4552],
  ["artificial-sky/process-journal/page-19.jpg", 0.0333, 0.0333, 0.0472, 0.0472, 1.4577],
  ["backer/board.png", 0.3078, 0.4222, 0.5272, 0.4022, 18.6394],
  ["backer/image-3.png", 0.3078, 0.5956, 0.5326, 0.3967, 6.6734],
  ["backer/image-4.png", 0.0118, 0.0118, 0.03, 0.0222, 0.2914],
  ["coins-in-the-sky/board.png", 0.3047, 0.2349, 0.0511, 0.0567, 0.2467],
  ["passenger-screen-visual-impact/report-page-01.png", 0, 0, 0.0257, 0.0415, 1.9058],
  ["passenger-screen-visual-impact/report-page-03.png", 0, 0, 0.0257, 0.0613, 1.9471],
  ["passenger-screen-visual-impact/report-page-04.png", 0.0344, 0.0111, 0.0257, 0.1798, 2.1358],
  ["passenger-screen-visual-impact/report-page-06.png", 0, 0, 0.0257, 0.0375, 1.8978],
  ["passenger-screen-visual-impact/report-page-08.png", 0, 0, 0.0257, 0.0494, 1.9221],
  ["passenger-screen-visual-impact/report-page-09.png", 0.0333, 0.0111, 0.0257, 0.0435, 1.825],
  ["passenger-screen-visual-impact/report-page-10.png", 0, 0, 0.0257, 0.0356, 1.8938],
  ["passenger-screen-visual-impact/report-page-11.png", 0, 0, 0.0257, 0.0514, 1.9262],
  ["passenger-screen-visual-impact/report-page-13.png", 0.0344, 0.0111, 0.0257, 0.085, 1.9079],
  ["passenger-screen-visual-impact/report-page-14.png", 0.0344, 0.0111, 0.0257, 0.0336, 1.8037],
  ["passenger-screen-visual-impact/report-page-16.png", 0, 0, 0.0257, 0.0711, 1.9684],
  ["passenger-screen-visual-impact/report-page-17.png", 0.0311, 0, 0.0257, 0.0336, 1.831],
  ["passenger-screen-visual-impact/report-page-18.png", 0.0333, 0.0111, 0.0257, 0.0474, 1.8328],
  ["passenger-screen-visual-impact/report-page-19.png", 0.0244, 0.0111, 0.0257, 0.0791, 1.9152],
  ["passenger-screen-visual-impact/report-page-21.png", 0, 0, 0.0257, 0.0534, 1.9304],
  ["path/behavior-map.jpg", 0.0133, 0.0144, 0.0692, 0.0566, 1.5731],
  ["path/user-task.png", 0.0667, 0.07, 0.1478, 0.1336, 1.6991],
  ["path/validation.png", 0.0311, 0.0289, 0.066, 0.022, 1.4577],
  ["riverside-changsha/board.png", 0.3074, 0.2835, 0.0544, 0.0822, 0.2433],
  ["riverside-changsha/wechat/wechat-01.jpg", 0, 0, 0, 0.1436, 2.7415],
  ["riverside-changsha/wechat/wechat-02.gif", 0, 0, 0, 0.1533, 0.5529],
  ["riverside-changsha/wechat/wechat-04.gif", 0.3356, 0.3356, 0.2133, 0.2148, 0.7668],
  ["riverside-changsha/wechat/wechat-07.gif", 0.0972, 0, 0, 0, 0.8262],
  ["riverside-changsha/wechat/wechat-08.gif", 0.4039, 0, 0, 0, 0.4757],
  ["riverside-changsha/wechat/wechat-10.gif", 0.3956, 0, 0, 0, 0.3382],
  ["riverside-changsha/wechat/wechat-36.jpg", 0.3111, 0.3189, 0, 0.2431, 2.0151],
  ["riverside-changsha/wechat/wechat-37.jpg", 0.34, 0.34, 0.2249, 0.1664, 0.8641],
  ["riverside-changsha/wechat/wechat-38.png", 0.924, 0.0227, 0.2, 0.2429, 1.0256],
  ["riverside-changsha/wechat/wechat-39.jpg", 0.1653, 0.1653, 0.0089, 0.0378, 0.194],
  ["riverside-changsha/wechat/wechat-40.png", 0.0772, 0.1103, 0.1618, 0.1985, 1.2701],
  ["sonic-patrol/pdf-pages/page-1.png", 0.04, 0.0467, 0.05, 0.068, 1.8616],
  ["sonic-patrol/pdf-pages/page-2.png", 0.04, 0.0456, 0.05, 0.084, 1.8983],
  ["sonic-patrol/pdf-pages/page-3.png", 0.04, 0.1022, 0.05, 0.058, 1.7288],
  ["sonic-patrol/pdf-pages/page-4.png", 0.04, 0.0467, 0.05, 0.06, 1.8449],
  ["sonic-patrol/pdf-pages/page-5.png", 0.04, 0.17, 0.05, 0.036, 1.5539],
  ["tri-eco-service/pdf-pages/page-3.png", 0.0311, 0, 0, 0, 1.7225],
  ["tri-eco-service/pdf-pages/page-4.png", 0, 0, 0.0316, 0, 1.8358],
  ["tri-eco-service/pdf-pages/page-5.png", 0.05, 0.0411, 0.0316, 0.0573, 1.7735]
];
const previewCropMap = new Map(previewCropRules.map(([path, left, right, top, bottom, ratio]) => [path, { left, right, top, bottom, ratio }]));
const normalizePreviewSrc = (src = "") => String(src || "").split("?")[0].replace(COS_ASSET_BASE, "").replace(/^.*assets\/portfolio\//, "");
const getPreviewCrop = (src) => previewCropMap.get(normalizePreviewSrc(src));
const getPreviewFrameStyle = (crop) => crop ? {
  aspectRatio: String(crop.ratio),
  width: `min(90vw, calc(88vh * ${crop.ratio}))`,
  height: `min(88vh, calc(90vw / ${crop.ratio}))`
} : void 0;
const getPreviewImageStyle = (crop) => {
  if (!crop) return void 0;
  const contentWidth = Math.max(0.01, 1 - crop.left - crop.right);
  const contentHeight = Math.max(0.01, 1 - crop.top - crop.bottom);
  return {
    position: "absolute",
    left: `${-crop.left / contentWidth * 100}%`,
    top: `${-crop.top / contentHeight * 100}%`,
    width: `${100 / contentWidth}%`,
    height: `${100 / contentHeight}%`,
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "fill"
  };
};

export default CategoryPage;
export { getPreviewCrop, getPreviewFrameStyle, getPreviewImageStyle };
