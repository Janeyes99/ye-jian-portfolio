const projectLoaders = {
  "memory-parking-hmi": () => import('./projects/memory-parking-hmi.js'),
  "jetour-traveler-2026": () => import('./projects/jetour-traveler-2026.js'),
  "ea01u": () => import('./projects/ea01u.js'),
  "smart-solution-4-motion-comfort": () => import('./projects/smart-solution-4-motion-comfort.js'),
  "passenger-screen-visual-impact": () => import('./projects/passenger-screen-visual-impact.js'),
  "touch-n-go": () => import('./projects/touch-n-go.js'),
  "snap-inflatables": () => import('./projects/snap-inflatables.js'),
  "thermosilicone": () => import('./projects/thermosilicone.js'),
  "confirmation-dialog-physical-world": () => import('./projects/confirmation-dialog-physical-world.js'),
  "path-tracking-apparatus": () => import('./projects/path-tracking-apparatus.js'),
  "tri-eco-service": () => import('./projects/tri-eco-service.js'),
  "coins-in-the-sky": () => import('./projects/coins-in-the-sky.js'),
  "artificial-sky": () => import('./projects/artificial-sky.js'),
  "sonic-patrol": () => import('./projects/sonic-patrol.js'),
  "backer": () => import('./projects/backer.js'),
  "riverside-changsha": () => import('./projects/riverside-changsha.js'),
  "decathlon-website": () => import('./projects/decathlon-website.js'),
  "miracle-miles": () => import('./projects/miracle-miles.js')
};

const pendingProjects = new Map();

export const loadProjectData = (slug) => {
  const loader = projectLoaders[slug];
  if (!loader) return Promise.resolve(null);
  if (!pendingProjects.has(slug)) {
    pendingProjects.set(slug, loader().then((module) => module.default));
  }
  return pendingProjects.get(slug);
};

export const prefetchProjectData = (slug) => {
  if (slug) void loadProjectData(slug);
};
