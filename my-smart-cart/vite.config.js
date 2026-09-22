// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 必須確保有引入這一行

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 必須確保 plugins 陣列裡有加入這一行
  ],
    server: {
    proxy: {
      // 當前端請求 /api-hf 時，Vite 會自動幫你轉發到 Hugging Face
      '/api-hf': {
        // target: 'https://huggingface.co', //404 不要用這個
        // target: 'https://api-inference.huggingface.co', // 不支援了...
        target: 'https://router.huggingface.co/v1',  // 💡 換成 Hugging Face 官方全新的 OpenAI 相容網域
        changeOrigin: true, // 💡 必須為 true，這會讓 Hugging Face 以為請求是直接來自它自己，而不是 localhost
        secure: false,      // 💡 允許代理忽略 SSL 憑證檢查，避免因為本地 HTTPS 憑證問題被阻擋
              // 把路徑字串開頭的 '/api-hf' 抹掉，後續路徑直接接在 target 後面
        rewrite: (path) => path.replace(/^\/api-hf/, '')
      }
    }
  }
})