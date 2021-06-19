import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import Notifications from 'vue-notification'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faUser,
  faSignOutAlt,
  faHome,
  faArrowUp,
  faArrowDown,
  faComment
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false


library.add(faBars, faUser, faSignOutAlt, faHome, faArrowUp, faArrowDown, faComment)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
