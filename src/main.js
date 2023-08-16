import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.esm.js"
import "bootstrap"
import './assets/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';


import 'vue-loading-overlay/dist/vue-loading.css';
import 'sweetalert2/dist/sweetalert2.min.css';
// import Pagination from 'vue-pagination-2';
// import Vuex from 'vuex'



// <== define COMPONENTS ==>
  // <== admin ==>
import adminMain from './components/admin/main.vue'
import adminTodo from './components/admin/todo.vue'
import adminUser from './components/admin/user.vue'

  // <== user ==>
import landing from './components/user/landing.vue'
import home from './components/user/home.vue'
import userMain from './components/user/main.vue'

  // <== Auth ==>
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
  { 
    // user
    path: '/', 
    component: userMain, 
    redirect: { name: 'landing' },
    children: [
      {
        path: "/",
        name: "landing",
        component: landing,
      },
      { 
        path: '/home', 
        component: home, 
        beforeEnter(to, from, next){
          if (!localStorage.getItem("token")){
            next('/login')
            return
          } 
            next()
        }
      },
    ]
  },
  // admin
  { 
    path: '/admin', 
    beforeEnter(to, from, next){
       if(localStorage.getItem("isAdmin") !== 'true'){
          router.back()
          return
        }
        next()
    },
    redirect: { name: 'todo' },
    component: adminMain, 
    children: [
      {
        path: "/todo",
        name: "todo",
        component: adminTodo,
      },
      {
        path: "/user",
        name: "user",
        component: adminUser,
      },
    ]
  },

  // auth
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
]

const router = new VueRouter({routes})

new Vue({
  router, 
  // store,
  render: h => h(App),
}).$mount('#app')
