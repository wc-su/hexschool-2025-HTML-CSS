import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig(({ mode }) =>{
  const week = process.env.WEEK
  const rootDir = `${week}/src`
  if (!week) {
    throw new Error(`❌ 請使用 WEEK=weekX vite build 來指定週目錄`);
  }

  const htmlFiles = fs
    .readdirSync(resolve(__dirname, rootDir))
    .filter(file => file.endsWith('.html'))

  // 自動產生 input 對應 { 'page-name': '/path/to/file.html' }
  const input = Object.fromEntries(
    htmlFiles.map(file => [
      file.replace(/\.html$/, ''), // name: a.html -> a
      resolve(__dirname, rootDir, file) // path
    ])
  )

  return {
    root: rootDir,
    base: './',
    build: {
      modulePreload: {
        polyfill: false, // 不加載 polyfill
      },
      minify: false, // 關閉壓縮
      outDir: '../dist',      // 可改輸出目錄
      emptyOutDir: true,
      rollupOptions: {
        input,
        output: {
          // JS chunk 檔案輸出到 js 資料夾
          chunkFileNames: 'js/[name].js',
          entryFileNames: 'js/[name].js',
          // CSS 輸出到 css 資料夾（由 Vite 處理）
          assetFileNames: chunkInfo => {
            if (chunkInfo.name && chunkInfo.name.endsWith('.css')) {
              return 'css/[name].[ext]';
            }
            return 'assets/[name].[ext]'; // 其他資源（如圖片等）
          },
        },
      },
    },
  }
})