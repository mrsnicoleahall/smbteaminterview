import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'

function copyToSubroutes() {
  return {
    name: 'copy-to-subroutes',
    closeBundle() {
      const dist = resolve('dist')
      const src = resolve(dist, 'index.html')
      // /aa route
      mkdirSync(resolve(dist, 'aa'), { recursive: true })
      copyFileSync(src, resolve(dist, 'aa', 'index.html'))
      // 404 fallback
      copyFileSync(src, resolve(dist, '404.html'))
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyToSubroutes()],
})
