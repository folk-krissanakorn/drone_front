import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/configs': 'https://drone-back-0wk5.onrender.com',
      '/logs': 'https://drone-back-0wk5.onrender.com'
    }
  }
})
