import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig(({ mode }) =>{

  function findHtmlEntries() {
    const entries = {
      index: path.resolve(__dirname, 'src/index.html')  // 首頁
    }

    const weekDirs = fs.readdirSync(path.resolve(__dirname, 'src')).filter(dir =>
      /^week\d+$/.test(dir)
    )

    for (const dir of weekDirs) {
      const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src', dir))
        .filter(f => f.endsWith('.html'))

      for (const file of htmlFiles) {
        const name = `${dir}/${file.replace('.html', '')}`
        entries[name] = path.resolve(__dirname, 'src', dir, file)
      }
    }

    return entries
  }
  
  // 找到每個資料夾下的圖片
  function getImagesData() {
    const weeks = fs.readdirSync(path.resolve(__dirname, 'src'))
      .filter(dir => /^week\d+$/.test(dir))

    const allWeeks = {}

    weeks.forEach(week => {
      const weekPath = path.resolve(__dirname, 'src', week, 'images')
      if (fs.existsSync(weekPath)) {
        const files = fs.readdirSync(weekPath).filter(f => /\.(png|jpe?g|svg|gif|webp)$/.test(f))
        allWeeks[week] = {}
        files.forEach(f => {
          allWeeks[week][f] = `/${week}/images/${f}`
        })
      }
    })
    
    return allWeeks
  }

  return {
    root: 'src',
    base: '/hexschool-2025-HTML-CSS/',
    plugins: [
      ViteEjsPlugin({
        images: getImagesData()
      }),
    ],
    build: {
      // assetsInlineLimit: 0, // 0 表示完全不轉 Base64
      modulePreload: {
        polyfill: false, // 不加載 polyfill
      },
      minify: false, // 關閉壓縮
      outDir: '../dist',      // 可改輸出目錄
      emptyOutDir: true,
      rollupOptions: {
        input: findHtmlEntries(),
        output: {
          entryFileNames: chunk => {
            const match = chunk.name.match(/^(week\d+)\//)
            const weekDir = match ? match[1] : ''
            const pureName = chunk.name.split('/').pop();
            return weekDir ? `${weekDir}/js/${pureName}.js` : `js/${pureName}.js`
          },
          chunkFileNames: `chunks/[name].js`, // 共用 chunk 統一存放
          assetFileNames: assetInfo => {
            const original = assetInfo.originalFileNames?.[0] || ''
            const name = assetInfo.names?.[0] || ''
            const match = original.match(/^(week\d+)\//)
            const weekDir = match ? match[1] : ''
            
            if (name.endsWith('.css')) {
              return weekDir ? `${weekDir}/css/[name].[ext]` : `css/[name].[ext]`
            }

            if (/\.(png|jpe?g|svg|gif|webp)$/.test(name)) {
              return weekDir ? `${weekDir}/images/[name].[ext]` : `images/[name].[ext]`
            }

            return weekDir ? `${weekDir}/assets/[name].[ext]` : `assets/[name].[ext]`
          }
        },
      },
    },
    server: {
      port: 5173,
      open: true, // 自動開啟瀏覽器
    },css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules']
        }
      }
    }
  }
})