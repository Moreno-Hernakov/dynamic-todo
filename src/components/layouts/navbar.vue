<template>
  <div class="nav-template">
    <nav class="navbar navbar-expand-lg fixed-top py-3 bg-primary bg-opacity-50" id="mainNav" >
        <div class="container px-4 px-lg-5">
            <router-link class="navbar-brand" to="/">Todo Web APP</router-link>
            <!-- <a class="navbar-brand" href="#page-top">Todo Web APP</a> -->
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <!-- <div class="collapse navbar-collapse" id="navbarResponsive">
              <button class="btn btn-primary ms-auto fw-bold">Login</button>
            </div> -->
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                    <li v-if="!isLogin" class="nav-item">
                      <a class="nav-link" href="#about">By Renoo</a>
                    </li>
                    <li v-else class="nav-item">
                      <button @click="logout()" class="fw-bold btn btn-sm btn-outline-dark px-3 py-2 rounded-3">
                        Logout
                      </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'nav-template',
  data : function(){
    return {
      isLogin : ''
    }
  },
  mounted() {
    this.isLogin = localStorage.getItem("token")
  },
  methods: {
    logout : function(){
      localStorage.removeItem('token');
      window.location.href = "/";
    }
  }
}
</script>