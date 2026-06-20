// App Component - Router and Layout

import React, { useState, useEffect } from 'react';
import { LanguageContext } from '@/js/i18n';
import { RouteContext, routeToHash, routeFromHash } from '@/js/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import ProjectDetail from '@/components/ProjectDetail';
import CategoryPage from '@/components/CategoryPage';

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
  }, /* @__PURE__ */ React.createElement("div", {
    className: "min-h-screen flex flex-col relative selection:bg-blue-200 selection:text-blue-900"
  }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", {
    className: "flex-grow z-10 relative"
  }, renderPage()), /* @__PURE__ */ React.createElement(Footer, null))));
}

export default App;
