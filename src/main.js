import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import { store } from './store'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
