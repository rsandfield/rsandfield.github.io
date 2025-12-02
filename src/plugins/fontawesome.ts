import type { App } from 'vue'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(faGithub, faDiscord, faGoogle)

export default {
  install (app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
