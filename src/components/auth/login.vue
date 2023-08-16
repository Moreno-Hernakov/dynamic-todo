<template>
  <div class="login-template">
    <!-- <div class="bg-primary" style="padding-top: 72px;"></div> -->
      <!-- <section class="vh-100 " style="background-color: #9A616D;"> -->
      <section class="vh-100 bg-secondary bg-opacity-25" style="background-color: #9A616D;">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style="border-radius: 1rem;">
                <div class="row g-0">
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                  </div>
                  <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div class="d-flex align-items-center mb-3 pb-1">
                          <span class="h1 fw-bold mb-0">Login</span>
                        </div>

                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="email">Email address</label>
                          <input type="email" v-model="email" id="email" :class="`form-control form-control-lg ${errEmail ? 'is-invalid' : ''} `" />
                          <div  class="invalid-feedback">
                            {{ errEmail }}
                          </div>
                        </div>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="password">Password</label>
                          <input type="password" v-model="password" id="password" :class="`form-control form-control-lg ${errPassword ? 'is-invalid' : ''} `" />
                          <div  class="invalid-feedback">
                            {{ errPassword }}
                          </div>
                        </div>

                        <div class="pt-1 mb-4">
                          <button @click="login()" class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                        </div>

                        <p class="mb-5 pb-lg-2" style="color: #393f81;">
                          <router-link  to="/register">
                            Don't have an account?Register here
                          </router-link>
                        </p>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'login-template',
  data: function(){
    return {
      email: '',
      password: '',

      errEmail: '',
      errPassword: '',
    }
  },
  methods: {
    login: function(){
      this.axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
      })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          
          switch(res.data.user.role) {
            case 'admin':
              localStorage.setItem("isAdmin", true);
              break;
            case 'user':
              localStorage.setItem("isAdmin", false);
              break;
            default: 
              localStorage.setItem("isAdmin", '');

          }

          // if(localStorage.getItem("isAdmin") == 'true'){
          //   alert(true)
          //   return
          // }else{
          //   alert(false)
          //   return
          // }

              // console.log(res.data.user.role)

          // console.log(localStorage.getItem('token'))
          // console.log(localStorage.getItem('isAdmin'))
          this.$swal({
              icon: 'success',
              text: 'Login Successfully',
              showConfirmButton: false,
              timer: 900,
          })
            .then(() => {
              
              if(localStorage.getItem("isAdmin") == 'true'){
                this.$router.push('/todo')
                return 
              }

              this.$router.push('/home')

            })
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          // console.log(err.response.data)
          if(err.response.data.errors == undefined){
            this.$swal({
                icon: 'error',
                text: err.response.data.error,
                showConfirmButton: false,
                timer: 1500,
            })
          }

            err.response.data.errors.email !== undefined 
            ? this.errEmail = err.response.data.errors.email[0] 
            : this.errEmail = ''

            err.response.data.errors.password !== undefined 
            ? this.errPassword = err.response.data.errors.password[0] 
            : this.errPassword = ''

        })
    }
  }
}
</script>