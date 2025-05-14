import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      three: path.resolve(__dirname, 'node_modules/three'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/drei'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
