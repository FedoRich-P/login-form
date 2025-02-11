import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Перенаправляем все запросы, начинающиеся с `/api`, на http://localhost:5000
  //     '/api': {
  //       target: 'http://http://localhost:4000/', // Укажите ваш бэкенд-хост
  //       changeOrigin: true, // Меняет origin на целевой хост
  //       secure: false, // Отключает проверку SSL (если нужно)
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Убирает `/api` из пути
  //     },
  //   },
  // },
})
