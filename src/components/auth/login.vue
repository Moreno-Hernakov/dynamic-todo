<template>
  <div class="login-template">
    <loading 
    loader="dots"
      :active="isLoading"
      :opacity="0.5"
      color="#ffb04f"
      background-color="#000000"
    >
    </loading>
    <!-- <div class="bg-primary" style="padding-top: 72px;"></div> -->
      <!-- <section class="vh-100 " style="background-color: #9A616D;"> -->
      <section class="vh-100" style="background-color: #fcd9cf;">
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
import Loading from 'vue-loading-overlay';
export default {
  name: 'login-template',
  components: {
    Loading
  },
  data: function(){
    return {
      isLoading: false,

      email: '',
      password: '',

      errEmail: '',
      errPassword: '',
    }
  },
  methods: {
    login: function(){
      this.isLoading = true
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
          this.isLoading = false
          this.$alert.noConfirmBtn(this,'success', 'Login Successfully!')
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
          this.isLoading = false
          let resErr = err.response.data

          if('errors' in resErr){

              'email' in resErr.errors
              ? this.errEmail = resErr.errors.email[0] 
              : this.errEmail = ''
  
              'password' in resErr.errors
              ? this.errPassword = resErr.errors.password[0] 
              : this.errPassword = ''

            return
          }
          
          this.$alert.noConfirmBtn(this,'error', resErr.error)
          
        })
    }
  }
}
</script>