import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/styles.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import home from './components/home.vue'
import login from './components/auth/login.vue'
import register from './components/auth/register.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: home, },
  { path: '/login', component: login, },
  { path: '/register', component: register, },
]

const router = new VueRouter({routes})

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
