<template>
  <div id="admin-main" >
    <div class="min-height-300 bg-gradient-info position-absolute w-100"></div>
    
    <!-- sidebar -->
    <sidebar-template></sidebar-template>
    <!-- End sidebar -->
    
    <main class="main-content position-relative border-radius-lg ">
      
      <!-- Navbar -->
      <navbar-template></navbar-template>
      <!-- End Navbar -->

      <div class="container-fluid">

          <!-- Main Content -->
          <router-view></router-view>
          <!-- End Main Content -->

      </div>

      <!-- footer -->
      <footer class="footer py-3">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div class="copyright text-center text-sm text-muted text-lg-start">
                ©2023
                made with <i class="fa fa-heart"></i> by
                <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>
                and modifief by <a href="https://www.instagram.com/renoo_" class="font-weight-bold" target="_blank">renoo</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- End footer -->

    </main>
  </div>
</template>


<style>
  @import '../../assets/css/nucleo-icons.css';
  @import '../../assets/css/nucleo-svg.css';
  /* @import '../../assets/css/argon-dashboard.css'; */
</style>

<style scoped src="../../assets/css/argon-dashboard.css"></style>

<script>
import sidebar from '../layouts/admin/sidebar.vue'
import navbar from '../layouts/admin/navbar.vue'

export default {
  name: 'admin-main',
  components : {
      'sidebar-template': sidebar,
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


