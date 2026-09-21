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
})