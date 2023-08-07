import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/styles.css';

import home from './components/home.vue'
import login from './components/auth/login.vue'


Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: home, },
  { path: '/login', component: login, },
]

const router = new VueRouter({routes})

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
