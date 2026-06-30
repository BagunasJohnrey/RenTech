import { defineConfig } from 'vite';

export default defineConfig({
  // This tells Vite/Vitest that you are working in a Node environment, not a browser
  test: {
    globals: true,
    environment: 'node', 
  },
});