import VueRouter from 'vue-router'
// import Vue from 'vue'
// <== define COMPONENTS ==>
// <== admin ==>
import adminMain from '../components/admin/main.vue'
import adminTodo from '../components/admin/todo.vue'
import adminUser from '../components/admin/user.vue'

// <== user ==>
import landing from '../components/user/landing.vue'
import home from '../components/user/home.vue'
import userMain from '../components/user/main.vue'

// <== Auth ==>
import login from '../components/auth/login.vue'
import register from '../components/auth/register.vue'

// Vue.use(VueRouter)

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
          next('/login')
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
export default router

