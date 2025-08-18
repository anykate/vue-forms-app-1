import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import tailwindcss from '@tailwindcss/vite'
import vueform from '@vueform/vueform/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin(), tailwindcss(), vueform()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
