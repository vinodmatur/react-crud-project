import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  homepage: "https://vinodmatur.github.io/react-crud-project",
  scripts: {
    predeploy: "npm run build",
    deploy: "gh-pages -d build"
  }
})
