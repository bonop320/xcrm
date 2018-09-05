import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'
import Agents from '@/views/agents'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: { name: 'view-products' }
  },

  {
    path: '/products',
    name: 'view-products',
    component: Products
  },

  {
    path: '/agents',
    name: 'view-agents',
    component: Agents
  }
]

export default new Router({
  routes
})
