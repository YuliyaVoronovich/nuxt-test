import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  devtools: { enabled: true },

  css: ['@/assets/css/tailwind.css', '@/assets/scss/styles.scss'],
  compatibilityDate: '2024-04-03',

  hooks: {
    'build:done': () => {
      const sourceFilePath = path.resolve('data/task_json.json')
      const destinationFilePath = path.resolve('.output/data/task_json.json')

      if (fs.existsSync(sourceFilePath)) {
        fs.mkdirSync(path.dirname(destinationFilePath), { recursive: true })

        fs.copyFileSync(sourceFilePath, destinationFilePath)
        console.log(
          'Файл task_json.json был скопирован в директорию .output/data.',
        )
      }
      else {
        console.error(
          'Исходный файл task_json.json не найден в директории data.',
        )
      }
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
