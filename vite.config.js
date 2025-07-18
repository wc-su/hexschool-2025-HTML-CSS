import { defineConfig } from 'vite'
import { resolve } from 'path'

const week="week1"

export default defineConfig({
  root: `./${week}/src`,
  base: './',
  build: {
    modulePreload: {
      polyfill: false, // 不加載 polyfill
    },
    rollupOptions: {
      input: {
        'story': resolve(__dirname, `${week}/src/story.html`),
        'pixel-perfect-kata': resolve(__dirname, `${week}/src/pixel-perfect-kata.html`),
      },
      // week2
      // input: {
      //   'product-list': resolve(__dirname, `${week}/src/product-list.html`),
      //   product: resolve(__dirname, `${week}/src/product.html`),
      // },
      // 不使用預設 hash
      output: {
        // JS chunk 檔案輸出到 js 資料夾
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
        // CSS 輸出到 css 資料夾（由 Vite 處理）
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name][extname]'; // 其他資源（如圖片等）
        },
      },
    },
    minify: false, // 關閉壓縮
    outDir: '../dist',      // 可改輸出目錄
    emptyOutDir: true,
  },
})