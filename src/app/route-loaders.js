export const homeRouteLoader = () => import('../routes/HomeRoute.jsx');
export const categoryRouteLoader = () => import('../routes/CategoryRoute.jsx');
export const contactRouteLoader = () => import('../routes/ContactRoute.jsx');
export const projectRouteLoader = () => import('../routes/ProjectRoute.jsx');

export const prefetchRoute = (path) => {
  if (path === '/') return void homeRouteLoader();
  if (path === '/contact') return void contactRouteLoader();
  if (path === '/project') return void projectRouteLoader();
  if (['/hmi', '/interaction-mechanisms', '/installations', '/service-brand'].includes(path)) {
    void categoryRouteLoader();
  }
};
