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
    component: Home,
    meta: {requiresAuth: false}
  },
  {
    path: '/invalidemail',
    name: 'invalidemail',
    component: InvalidEmail,
    meta: {requiresAuth: false}
  },
  {
    path: '/error',
    name: 'customerror',
    component: CustomError,
    meta: {requiresAuth: false}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {requiresAuth: true}
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules,
    meta: {requiresAuth: true}
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound,
    meta: {requiresAuth: false}
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
let _this = this;
function isAuth() {
  let tempSession = null;
  let userInfo = null;
  tempSession = Vue.$cookies.get("session");
  if(tempSession === null){
    return false;
  }
  userInfo = JSON.parse(atob(tempSession.split('.')[1]));
  console.log(Date.now())

  if((Date.now()/1000) - 86400 > userInfo.iat){
    return false;
  }//TODO: refresh current cookie
  return true;

}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAuth()) {
      console.log("not Authenticated")
      next({
        path: '/getOAuthURL',
        // query: { redirect: to.fullPath }
      })
    } else {
      console.log("Authed")
      next()
    }
  } else {
    console.log("no meta")
    next() // make sure to always call next()!
  }
})


export default router
