// App Component - Router and Layout

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '@/js/i18n';
import { Router } from '@/js/router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProjectGrid from '@/components/ProjectGrid';
import InteractiveGacha from '@modules/gacha/GachaCore';

// App component (extracted from sonic-patrol-preview.html)
// NOTE: May need adjustments for modular imports

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

export default App;
