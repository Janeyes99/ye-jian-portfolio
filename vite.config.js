import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const assetBasePlugin = (assetBaseUrl) => ({
  name: 'portfolio-asset-base',
  enforce: 'pre',
  transform(code, id) {
    if (!assetBaseUrl || !id.includes('/src/')) return null;
    return {
      code: code.replace(/(["'`])assets\//g, `$1${assetBaseUrl}/assets/`),
      map: null,
    };
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const assetBaseUrl = (env.VITE_ASSET_BASE_URL || '').replace(/\/+$/, '');

  return {
  base: env.VITE_BASE_PATH || './',
  plugins: [assetBasePlugin(assetBaseUrl), react()],
  publicDir: false,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'shared'),
      '@modules': resolve(__dirname, 'modules'),
      '@projects': resolve(__dirname, 'projects'),
      '@assets': resolve(__dirname, 'assets')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets/build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/gsap/')) return 'motion';
          if (id.includes('/node_modules/lucide-react/')) return 'icons';
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) {
            return 'react';
          }
          return undefined;
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
  };
});
