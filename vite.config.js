import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
  provider: 'v8',
  include: ['src/**/*.{js,jsx}'],
  exclude: [
    'src/**/*.test.{js,jsx}',
    'src/setupTests.js',
    'src/main.jsx',
  ],
  reporter: ['text', 'html', 'json-summary'],
},
  }
})