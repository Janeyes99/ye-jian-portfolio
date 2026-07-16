import { createContext } from 'react';

var LanguageContext = /* @__PURE__ */ createContext();
var RouteContext = /* @__PURE__ */ createContext();
var routeToHash = (path, params = {}) => {
  const search = new URLSearchParams(params).toString();
  return search ? `${path}?${search}` : path;
};
var normalizeLangParam = (value) => {
  const lang = String(value || "").toLowerCase();
  if (lang.startsWith("cn")) return "cn";
  if (lang.startsWith("en")) return "en";
  return "";
};
var routeFromHash = () => {
  const rawHash = window.location.hash.replace(/^#/, "");
  if (!rawHash) return {
    path: "/",
    params: {}
  };
  const normalized = rawHash.startsWith("/") ? rawHash : `/${rawHash}`;
  const queryStart = normalized.indexOf("?");
  const pathPart = queryStart >= 0 ? normalized.slice(0, queryStart) : normalized;
  const query = queryStart >= 0 ? normalized.slice(queryStart + 1) : "";
  const params = Object.fromEntries(new URLSearchParams(query).entries());
  const normalizedLang = normalizeLangParam(params.lang);
  if (normalizedLang) params.lang = normalizedLang;
  return {
    path: pathPart || "/",
    params
  };
};

export { LanguageContext, RouteContext, normalizeLangParam, routeFromHash, routeToHash };
