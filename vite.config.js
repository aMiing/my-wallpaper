import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
	server: {
		proxy: {
			'^/api': {
				target: 'https://44c63a76-69a2-41f9-b8c6-12b9af85bde9.bspapp.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		},

	}
  
})
