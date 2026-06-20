// Contact Component (extracted from sonic-patrol-preview.html)

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext } from '@/js/router';

// NOTE: Imports may need adjustment for modular environment

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
  }, lang2 === "en" ? "Open to exchanging ideas about advanced HMI systems, creative technology research, and potential project collaborations." : "\u6B22\u8FCE\u5EFA\u7ACB\u8054\u7CFB\uFF0C\u5171\u540C\u63A2\u8BA8\u524D\u6CBF\u8F66\u8F7D\u4EBA\u673A\u4EA4\u4E92\u3001\u7269\u7406\u8BA1\u7B97\u539F\u578B\u4EE5\u53CA\u5546\u4E1A\u4F53\u9A8C\u521B\u65B0\u673A\u4F1A\u3002"), /* @__PURE__ */ React.createElement("div", {
    className: "bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] p-12 md:p-20 flex flex-col space-y-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)]"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-4"
  }, lang2 === "en" ? "Direct Channel" : "\u8054\u7CFB\u90AE\u7BB1"), /* @__PURE__ */ React.createElement("a", {
    href: "mailto:yejian.design@example.com",
    className: "text-3xl md:text-5xl font-bold text-zinc-900 hover:text-blue-600 motion-color break-words"
  }, "yejian.design@example.com")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-6"
  }, lang2 === "en" ? "Networks" : "\u793E\u4EA4\u5E73\u53F0"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-wrap gap-4"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "flex items-center px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-base font-bold text-zinc-700 hover:bg-zinc-900 hover:text-white motion-surface motion-press shadow-sm"
  }, /* @__PURE__ */ React.createElement(Linkedin, {
    size: 20,
    className: "mr-3"
  }), " LinkedIn"), /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "flex items-center px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-base font-bold text-zinc-700 hover:bg-zinc-900 hover:text-white motion-surface motion-press shadow-sm"
  }, /* @__PURE__ */ React.createElement(Dribbble, {
    size: 20,
    className: "mr-3"
  }), " Behance"))), /* @__PURE__ */ React.createElement("div", {
    className: "pt-10 border-t border-zinc-200"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex items-center justify-center w-full md:w-auto px-10 py-5 bg-zinc-900 text-white rounded-full hover:bg-blue-600 motion-color font-bold text-base shadow-xl"
  }, /* @__PURE__ */ React.createElement(Download, {
    size: 20,
    className: "mr-3"
  }), lang2 === "en" ? "Download Curriculum Vitae" : "\u4E0B\u8F7D\u7B80\u5386"))));
};
function App() {
  const [lang2, setLang] = useState(() => {
    const hashLang = new URLSearchParams((window.location.hash.split("?")[1] || "").split("#")[0]).get("lang");
    if (hashLang === "cn" || hashLang === "en") return hashLang;
    try {
      return localStorage.getItem("ye-jian-lang") || "en";
    } catch {
      return "en";
    }
  });
  const toggleLang = () => setLang((prev) => {
    const next = prev === "en" ? "cn" : "en";
    try {
      localStorage.setItem("ye-jian-lang", next);
    } catch {
    }
    const currentRoute = routeFromHash();
    const nextParams = {
      ...currentRoute.params,
      lang: next
    };
    window.history.replaceState(null, "", `#${routeToHash(currentRoute.path, nextParams)}`);
    return next;
  });
  const t = (field) => {
    if (!field) return "";
    return typeof field === "object" ? field[lang2] || field["en"] || "" : field;
  };
  const [route, setRoute] = useState(() => routeFromHash());
  const navigate = (path, params = {}) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const nextParams = {
      ...params,
      lang: lang2
    };
    const nextRoute = {
      path,
      params: nextParams
    };
    window.location.hash = routeToHash(path, nextParams);
    setRoute(nextRoute);
  };
  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = routeFromHash();
      const nextLang = nextRoute.params?.lang;
      if (nextLang === "cn" || nextLang === "en") setLang(nextLang);
      setRoute(nextRoute);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  const renderPage = () => {
    if (route.path === "/") return /* @__PURE__ */ React.createElement(Home, null);
    if (route.path === "/contact") return /* @__PURE__ */ React.createElement(Contact, null);
    if (route.path === "/project") return /* @__PURE__ */ React.createElement(ProjectDetail, null);
    if (["/hmi", "/interaction-mechanisms", "/installations", "/service-brand"].includes(route.path)) {
      return /* @__PURE__ */ React.createElement(CategoryPage, null);
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "pt-40 text-center font-bold text-2xl"
    }, "System Module Not Found");
  };
  return /* @__PURE__ */ React.createElement(LanguageContext.Provider, {
    value: {
      lang: lang2,
      toggleLang,
      t
    }
  }, /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: {
      route,
      navigate
    }
  }, /* @__PURE__ */ React.createElement(GlobalStyle, null), /* @__PURE__ */ React.createElement("div", {
    className: "min-h-screen flex flex-col relative selection:bg-blue-200 selection:text-blue-900"
  }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", {
    className: "flex-grow z-10 relative"
  }, renderPage()), /* @__PURE__ */ React.createElement(Footer, null))));
}
export {
  App as default
};
";

try {
  const moduleUrl = URL.createObjectURL(new Blob([appCode], { type: 'text/javascript' }));
  const { default: App } = await import(moduleUrl);
  createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null, React.createElement(App)));
} catch (error) {
  const root = document.getElementById('root');
  root.innerHTML = '<pre style="padding:24px;font-family:monospace;background:#fff;color:#18181b;min-height:100vh;white-space:pre-wrap;">Error: ' +
    String(error && (error.stack || error)).replace(/[&<>]/g, function(m) { return {'&':'&amp;','<':'&lt;','>':'&gt;'}[m]; }) + '</pre>';
}
</script>
</body>
</html>

export default Contact;
