import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 443,
    },
    cors: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '*.manusvm.computer',
      '5173-irmtsg5q7juejrs9ow372-cd092cde.manusvm.computer'
    ]
  }
})

