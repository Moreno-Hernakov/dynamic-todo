import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/styles.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import Pagination from 'vue-pagination-2';
// import Vuex from 'vuex'



// <== define COMPONENTS ==>
import landing from './components/landing.vue'
import home from './components/home.vue'
import login from './components/auth/login.vue'
import register from './components/auth/register.vue'


// <== use PLUGINS ==>
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
// Vue.use(pagination)
Vue.config.productionTip = false


// Vue.component('pagination', Pagination);

// <== define VUEX ==>
// const store = new Vuex.Store({
//   state: {
//     user: '',
//     isLogin: ''
//   },
//   mutations: {
//     setIsLogin (state, user) {
//       state.isLogin = user
//     }
//   },
// })

// <== define ROUTES ==>
const routes = [
  { path: '/', component: landing, },
  { 
    path: '/login',
    component: login,
    beforeEnter(to, from, next){
      if (localStorage.getItem("token")){
        router.back()
      } else {
        next()
      }
    }
  },
  { 
    path: '/register',
    component: register,
    beforeEnter(to, from, next){
      if (localStorage.getItem("token")){
        router.back()
      } else {
        next()
      }
    }
  },
  { 
    path: '/home', 
    component: home, 
    beforeEnter(to, from, next){
      if (!localStorage.getItem("token")){
        next('/login')
      } else {
        next()
        // window.location.href = "/#/home";
      }
    }
  },
]

const router = new VueRouter({routes})

new Vue({
  router, 
  // store,
  render: h => h(App),
}).$mount('#app')
