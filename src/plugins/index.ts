/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import router from '../router'
import pinia from '../stores'
// Plugins
import fontawesome from './fontawesome'

import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app
    .use(fontawesome)
    .use(vuetify)
    .use(router)
    .use(pinia)
}
