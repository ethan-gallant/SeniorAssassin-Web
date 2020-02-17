import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InvalidEmail from "../views/error/InvalidEmail";
import CustomError from "../views/error/CustomError";
import Dashboard from "../views/Dashboard";
import AdminDashboard from "../views/admin/Dashboard";
import Rules from "../views/Rules";
import notFound from "../views/error/404"
import SetToken from "../views/SetToken";
import Shop from "../views/Shop";
import OpenTargets from "../views/OpenTargets";
import SubmitKill from "../views/SubmitKill";
import PendingKills from "../views/admin/PendingKills";
import Stats from "../views/Stats";
import AllStudents from "../views/admin/AllStudents";

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
    path: '/settoken',
    name: 'settoken',
    component: SetToken,
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
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: {requiresAuth: true}
  },
  {
    path: '/submitkill',
    name: 'submitkill',
    component: SubmitKill,
    meta: {requiresAuth: false}
  },
  {
    path: '/openTargets',
    name: 'opentargets',
    component: OpenTargets,
    meta: {requiresAuth: true}
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules,
    meta: {requiresAuth: false}
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
    meta: {requiresAuth: true}
  },
  {
    path: '/admin',
    name: 'admindashboard',
    component: AdminDashboard,
    meta: {requiresAuth: true, requiresAdmin: true}
  },
  {
    path: '/admin/PendingKills',
    name: 'pendingkills',
    component: PendingKills,
    meta: {requiresAuth: true, requiresAdmin: true}
  },
  {
    path: '/admin/AllStudents',
    name: 'allstudents',
    component: AllStudents,
    meta: {requiresAuth: true, requiresAdmin: true}
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



router.beforeEach((to, from, next) => {
  function isAuth() {
    let userInfo = null;
    let tempSession = Vue.$cookies.get("session");
    if(!tempSession){
      return false;
    }
    userInfo = JSON.parse(atob(tempSession.split('.')[1]));

    // if((Date.now()/1000) - 86400 > userInfo.iat){
    //   return false;
    //
    // }//TODO: refresh current cookie
    return true;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.matched.some(record => record.meta.requiresAdmin)){
      if(JSON.parse(atob(Vue.$cookies.get("session").split('.')[1])).is_admin){
        next()
      }else{
        next({
          path: '/',
        })
      }
    }
    if (!isAuth()) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router
