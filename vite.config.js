import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src') // 设置 `src` 为 `src` 目录的别名
    }
  }
})
