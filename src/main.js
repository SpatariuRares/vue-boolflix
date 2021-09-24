import Vue from 'vue'
import App from './App.vue'
import CountryFlag from 'vue-country-flag'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faChevronLeft)
library.add(faChevronRight)
  
Vue.component('country-flag', CountryFlag)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
