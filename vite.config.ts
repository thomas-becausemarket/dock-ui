import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dock-ui/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // Alias for importing modules easily
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // or 'src/index.js'
      name: 'DockUI',
      fileName: (format) => `dock-ui.${format}.js`, // Output file name based on format
    },
    rollupOptions: {
      // Specify external dependencies that should not be bundled
      external: ['react', 'react-dom', '~/globals.css'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
