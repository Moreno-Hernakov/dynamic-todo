<template>
  <div id="admin-main" >
    <div class="min-height-300 bg-gradient-info position-absolute w-100"></div>
    <aside style="z-index: 0" class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
      <div class="sidenav-header">
        <a class="navbar-brand m-0" target="_blank">
          <span class="ms-1 font-weight-bold">Todo Web App Admin</span>
        </a>
      </div>
      <hr class="horizontal dark mt-0"> 
      <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="javascript:;">
              <router-link :class="`${this.$route.name == 'todo' ? 'active' : ''} nav-link `" to="/todo">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Todo</span>
              </router-link>
            </a>
            <!-- <a class="nav-link active">
            </a> -->
          </li>
          <li class="nav-item">
            <a href="javascript:;">
              <router-link :class="`${this.$route.name == 'user' ? 'active' : ''} nav-link`" to="/user">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">User</span>
              </router-link>
            </a>
          </li>
          
        </ul>
      </div>
    </aside>
    <main class="main-content position-relative border-radius-lg ">
      <!-- Navbar -->
      <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">Admin</a></li>
              <li class="breadcrumb-item text-sm text-white active fw-bold" aria-current="page">{{ $route.name }}</li>
            </ol>
            <!-- <h6 class="font-weight-bolder text-white mb-0">Dashboard</h6> -->
          </nav>
          <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">
              <div class="input-group">
                <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                <input type="text" class="form-control" placeholder="Type here...">
              </div>
            </div>
            <ul class="navbar-nav  justify-content-end">
              <!-- <li class="nav-item d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-white font-weight-bold px-0">
                  <i class="fa fa-user me-sm-1"></i>
                  <span class="d-sm-inline d-none">Sign In</span>
                </a>
              </li> -->
              <li class="nav-item px-3 d-flex align-items-center">
                <div class="dropdown">
                  <!-- <a href="javascript:;" data-bs-toggle="dropdown" id="navbarDropdownMenuLink2" class="nav-link text-white font-weight-bold px-0">
                    <i class="fa fa-user me-sm-1"></i>
                    <span class="d-sm-inline d-none">Sign In</span>
                  </a> -->
                  <a href="javascript:;" @click="logout()" class="fw-bold nav-link text-white p-0" >
                    <i class="fa fa-user me-sm-1"></i>
                    <span class="d-sm-inline d-none">Logout</span>
                  </a>
                </div>
              </li>
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                  <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line bg-white"></i>
                    <i class="sidenav-toggler-line bg-white"></i>
                    <i class="sidenav-toggler-line bg-white"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="container-fluid py-4">
        <!-- <div class="card min-height-500"> -->

          <router-view></router-view>
        <!-- </div> -->
      </div>
      <footer class="footer pt-3  ">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div class="copyright text-center text-sm text-muted text-lg-start">
                ©2023
                made with <i class="fa fa-heart"></i> by
                <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>
                for a better web.
              </div>
            </div>
          </div>
        </div>
      </footer>
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
export default {
  name: 'admin-main',
  data(){
    return{
      isLogin : ''
    }
  },
  created(){

    // console.log(localStorage.getItem("isAdmin") )
    
    // if(localStorage.getItem("isAdmin")){
    //   if(localStorage.getItem("isAdmin") !== "true"){
    //     console.log('login')
    //     return
    //   }
    // }
    // console.log('admin')

    // console.log(localStorage.getItem("isAdmin") == "admin")
    // console.log(this.$route.name)
    this.isLogin = localStorage.getItem("token")
  }, 
  methods : {
    logout : function(){
      this.$swal({
        title: 'Do you want to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
              icon: 'success',
              text: 'Sampai jumpa!',
              showConfirmButton: false,
              timer: 900,
          })
          .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            window.location.href = "/";
          })
        } 
      })
    }
  }
}
</script>


