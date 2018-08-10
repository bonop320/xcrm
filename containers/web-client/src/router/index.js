import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: { name: 'products' }
  },

  {
    path: '/products',
    name: 'products',
    component: Products
  }
]

export default new Router({
  routes
})
