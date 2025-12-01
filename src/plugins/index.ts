/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import fontawesome from "./fontawesome"
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(fontawesome)
    .use(vuetify)
    .use(router)
    .use(pinia)
}
