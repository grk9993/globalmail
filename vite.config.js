import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true // Allows access from network
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
}); 