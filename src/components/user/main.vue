<template>
  
  <div id="page-top" >
    <!-- Navigation-->
    <navbar-template :isLogin="isLogin"></navbar-template>
    <!-- Masthead-->
    <router-view></router-view>
    <!-- Footer-->
    <footer class="bg-light py-5">
      <div class="container px-4 px-lg-5">
        <div class="small text-center text-muted">
          Copyright &copy; 2023 - reno
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import navbar from '../layouts/navbar.vue'

export default {
  name: 'page-top',
  components : {
    'navbar-template': navbar,
  },
  data(){
    return{
      isLogin : ''
    }
  },
  created(){
    this.isLogin = localStorage.getItem("token")
  }
}
</script>


