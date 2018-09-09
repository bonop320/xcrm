import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'
import Agents from '@/views/agents'
import Repository from '@/views/repository'

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
  },

  {
    path: '/repository',
    name: 'view-repository',
    component: Repository
  }
]

export default new Router({
  routes
})
