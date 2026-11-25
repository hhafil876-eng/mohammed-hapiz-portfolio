import { contactApi } from './server/contact-plugin.js'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), contactApi()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ['framer-motion'],
          lucide: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
