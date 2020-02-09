
import './../node_modules/bulma/bulma.sass';
import './../node_modules/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import './../node_modules/bulma-accordion/dist/css/bulma-accordion.min.css';
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@sweetalert2/theme-borderless/borderless.min.css'
Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted(){
    // router.push({ path: '/' })
  },
  render: h => h(App)
}).$mount('#app')
