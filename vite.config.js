import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts-next'
import VueRouter from 'unplugin-vue-router/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    vueDevTools(),
    Layouts(),
    VueRouter(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
