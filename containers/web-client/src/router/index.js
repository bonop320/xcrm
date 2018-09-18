import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/views/products'
import ProductsOne from '@/views/products-one'

import Agents from '@/views/agents'

import Invoices from '@/views/invoices'
import Payments from '@/views/payments'

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
  }, {
    path: '/products/:_id',
    name: 'view-products-one',
    component: ProductsOne,
    props: true
  },

  {
    path: '/agents',
    name: 'view-agents',
    component: Agents
  },

  {
    path: '/invoices',
    name: 'view-invoices',
    component: Invoices
  },

  {
    path: '/payments',
    name: 'view-payments',
    component: Payments
  }
]

export default new Router({
  routes
})
