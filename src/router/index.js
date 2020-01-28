import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InvalidEmail from "../views/error/InvalidEmail";
import CustomError from "../views/error/CustomError";
import Dashboard from "../views/Dashboard";
import Rules from "../views/Rules";
import notFound from "../views/error/404"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/invalidemail',
    name: 'invalidemail',
    component: InvalidEmail
  },
  {
    path: '/error',
    name: 'customerror',
    component: CustomError
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
