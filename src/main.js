import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import router from'./router/index.js';
import {alert} from './components/sweetalert2/index.js'
import 'animate.css';
import { VueTypedJs } from 'vue-typed-js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.esm.js"
import "bootstrap"
import './assets/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'vue-loading-overlay/dist/vue-loading.css';
import 'sweetalert2/dist/sweetalert2.min.css';
// import Pagination from 'vue-pagination-2';
// import Vuex from 'vuex'


// <== use PLUGINS ==>
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueTypedJs)
// Vue.use(pagination)
Vue.alert = Vue.prototype.$alert = alert
Vue.config.productionTip = false


new Vue({
  router, 
  // store,
  render: h => h(App),
}).$mount('#app')
