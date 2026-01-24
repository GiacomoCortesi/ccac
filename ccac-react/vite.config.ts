import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig(async () => {
  const { imagetools } = await import('vite-imagetools')
  
  return {
    base: '/',
    plugins: [eslint(), react(), svgr(), viteTsconfigPaths(), imagetools()],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
    },
  }
})
