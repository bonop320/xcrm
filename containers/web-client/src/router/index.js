import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: { name: 'ViewProducts' }
  },

  {
    path: '/products',
    name: 'ViewProducts',
    component: Products
  }
]

export default new Router({
  routes
})
