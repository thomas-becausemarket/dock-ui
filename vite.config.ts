import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/dock-ui/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src') // Adjust the path as needed
    }
  },
  build: {
    rollupOptions: {
      external: ['~/globals.css'] // Add any other external modules if needed
    }
  }
});
