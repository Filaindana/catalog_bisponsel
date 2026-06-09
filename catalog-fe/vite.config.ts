import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  base: './',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.bizponsel.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
      '/images': {
        target: 'https://api.bizponsel.com',
        changeOrigin: true,
        secure: false,
      },
      '/storage': {
        target: 'https://api.bizponsel.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
