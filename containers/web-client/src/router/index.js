import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'
import Users from '@/views/users'

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
  },

  {
    path: '/users',
    name: 'ViewUsers',
    component: Users
  }
]

export default new Router({
  routes
})
