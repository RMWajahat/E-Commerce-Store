import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        rewrite: (path) => path.startsWith('/api') ? path : `/api${path}`,
      },
    },
  },
  plugins: [react()],
})
