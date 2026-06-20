// Router System

import React, { createContext, useState } from 'react';

export const RouteContext = createContext(null);

export const routeToHash = (path, params = {}) => {
  const search = new URLSearchParams(params).toString();
  return search ? `${path}?${search}` : path;
};

export const routeFromHash = () => {
  const rawHash = window.location.hash.replace(/^#/, "");
  if (!rawHash) return { path: "/", params: {} };
  const normalized = rawHash.startsWith("/") ? rawHash : `/${rawHash}`;
  const [pathPart, query = ""] = normalized.split("?");
  return {
    path: pathPart || "/",
    params: Object.fromEntries(new URLSearchParams(query).entries())
  };
};

export const Router = ({ children }) => {
  const [route, setRoute] = useState(() => routeFromHash());
  const navigate = (path, params = {}) => {
    window.location.hash = routeToHash(path, params);
    setRoute({ path, params });
  };
  return (
    <RouteContext.Provider value={{ route, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};
