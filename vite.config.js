import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/portfolio_yarik/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        category: resolve(__dirname, 'category.html'),
        project: resolve(__dirname, 'project.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
