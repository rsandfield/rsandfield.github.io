import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons'
import type { App } from 'vue'

config.autoAddCss = false

library.add(faGithub, faDiscord, faGoogle)

export default {
    install(app: App) {
        app.component('font-awesome-icon', FontAwesomeIcon);
    }
}