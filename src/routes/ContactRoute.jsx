import React, { useContext } from 'react';
import { BookOpen, Instagram, Linkedin } from 'lucide-react';
import { LanguageContext } from '../app/contexts.jsx';

var Contact = () => {
  const {
    lang: lang2
  } = useContext(LanguageContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "pt-40 pb-20 px-6 max-w-4xl mx-auto animate-fade-up"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-5xl md:text-[80px] font-bold tracking-tight mb-8 text-zinc-900"
  }, lang2 === "en" ? "Let's Connect" : "\u53D6\u5F97\u8054\u7CFB"), /* @__PURE__ */ React.createElement("p", {
    className: "text-2xl text-zinc-500 mb-20 leading-relaxed max-w-3xl font-medium"
  }, lang2 === "en" ? "Open to exchanging ideas about human-computer interaction, physical computing prototypes, and business experience innovation." : "\u6B22\u8FCE\u5EFA\u7ACB\u8054\u7CFB\uFF0C\u5171\u540C\u63A2\u8BA8\u4EBA\u673A\u4EA4\u4E92\u3001\u7269\u7406\u8BA1\u7B97\u539F\u578B\u4EE5\u53CA\u5546\u4E1A\u4F53\u9A8C\u521B\u65B0\u673A\u4F1A\u3002"), /* @__PURE__ */ React.createElement("div", {
    className: "bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] p-12 md:p-20 flex flex-col space-y-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)]"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-4"
  }, lang2 === "en" ? "Direct Channel" : "\u8054\u7CFB\u90AE\u7BB1"), /* @__PURE__ */ React.createElement("a", {
    href: "mailto:jian.ye.design@gmail.com",
    className: "text-3xl md:text-5xl font-bold text-zinc-900 hover:text-blue-600 motion-color break-words"
  }, "jian.ye.design@gmail.com")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-6"
  }, lang2 === "en" ? "Networks" : "\u793E\u4EA4\u5E73\u53F0"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-wrap gap-4"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://www.linkedin.com/in/ye-jian-3ab38622b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    target: "_blank",
    rel: "noreferrer",
    className: "flex items-center px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-base font-bold text-zinc-700 hover:bg-zinc-900 hover:text-white motion-surface motion-press shadow-sm"
  }, /* @__PURE__ */ React.createElement(Linkedin, {
    size: 20,
    className: "mr-3"
  }), " LinkedIn"), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.instagram.com/bravejye/",
    target: "_blank",
    rel: "noreferrer",
    className: "flex items-center px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-base font-bold text-zinc-700 hover:bg-zinc-900 hover:text-white motion-surface motion-press shadow-sm"
  }, /* @__PURE__ */ React.createElement(Instagram, {
    size: 20,
    className: "mr-3"
  }), " Instagram"), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.xiaohongshu.com/search_result?keyword=jy582311857",
    target: "_blank",
    rel: "noreferrer",
    className: "flex items-center px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-base font-bold text-zinc-700 hover:bg-zinc-900 hover:text-white motion-surface motion-press shadow-sm"
  }, /* @__PURE__ */ React.createElement(BookOpen, {
    size: 20,
    className: "mr-3"
  }), lang2 === "en" ? "REDnote" : "小红书")))));
};

export default Contact;
