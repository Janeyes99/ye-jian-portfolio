import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          // Auto-discover all project detail pages
          require('fs').readdirSync('./projects')
            .filter(d => d !== 'template')
            .map(d => [d, resolve(__dirname, `projects/${d}/index.html`)])
        )
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
