import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

