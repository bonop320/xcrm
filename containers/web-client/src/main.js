import Vue from 'vue'

import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import router from './router'
import store from './store'

import App from './App.vue'

sync(store, router)

Vue.use(ElementUI, { locale })

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
