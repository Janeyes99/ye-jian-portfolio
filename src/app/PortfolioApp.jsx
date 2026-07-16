import React, { Suspense, lazy, useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import {
  categoryRouteLoader,
  contactRouteLoader,
  homeRouteLoader,
  projectRouteLoader,
} from './route-loaders.js';
import {
  LanguageContext,
  RouteContext,
  normalizeLangParam,
  routeFromHash,
  routeToHash,
} from './contexts.jsx';
import GlobalStyle from './GlobalStyle.jsx';

const HomeRoute = lazy(homeRouteLoader);
const CategoryRoute = lazy(categoryRouteLoader);
const ContactRoute = lazy(contactRouteLoader);
const ProjectRoute = lazy(projectRouteLoader);
const categoryPaths = new Set([
  '/hmi',
  '/interaction-mechanisms',
  '/installations',
  '/service-brand',
]);

function PortfolioApp() {
  const [route, setRoute] = useState(() => routeFromHash());
  const [lang, setLang] = useState(() => {
    const hashLang = normalizeLangParam(routeFromHash().params.lang);
    if (hashLang) return hashLang;
    try {
      return normalizeLangParam(localStorage.getItem('ye-jian-lang')) || 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLang = () => setLang((previousLang) => {
    const nextLang = previousLang === 'en' ? 'cn' : 'en';
    try {
      localStorage.setItem('ye-jian-lang', nextLang);
    } catch {
      // Language preference still works for this session when storage is unavailable.
    }
    const currentRoute = routeFromHash();
    const nextRoute = {
      path: currentRoute.path,
      params: { ...currentRoute.params, lang: nextLang },
    };
    window.history.replaceState(null, '', `#${routeToHash(nextRoute.path, nextRoute.params)}`);
    setRoute(nextRoute);
    return nextLang;
  });

  const t = (field) => {
    if (!field) return '';
    return typeof field === 'object' ? field[lang] || field.en || '' : field;
  };

  const navigate = (path, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nextRoute = {
      path,
      params: { ...params, lang },
    };
    window.location.hash = routeToHash(nextRoute.path, nextRoute.params);
    setRoute(nextRoute);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = routeFromHash();
      const nextLang = nextRoute.params?.lang;
      if (nextLang === 'cn' || nextLang === 'en') setLang(nextLang);
      setRoute(nextRoute);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let scrollTimer;
    const root = document.documentElement;
    const handleScroll = () => {
      root.classList.add('is-scrolling');
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => root.classList.remove('is-scrolling'), 900);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.clearTimeout(scrollTimer);
      root.classList.remove('is-scrolling');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderRoute = () => {
    if (route.path === '/') return <HomeRoute />;
    if (route.path === '/contact') return <ContactRoute />;
    if (route.path === '/project') return <ProjectRoute />;
    if (categoryPaths.has(route.path)) return <CategoryRoute />;
    return <div className="pt-40 text-center font-bold text-2xl">System Module Not Found</div>;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <RouteContext.Provider value={{ route, navigate }}>
        <GlobalStyle />
        <div className="min-h-screen flex flex-col relative selection:bg-blue-200 selection:text-blue-900">
          <Navbar />
          <main className="flex-grow z-10 relative">
            <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
              {renderRoute()}
            </Suspense>
          </main>
          <Footer />
        </div>
      </RouteContext.Provider>
    </LanguageContext.Provider>
  );
}

export default PortfolioApp;
