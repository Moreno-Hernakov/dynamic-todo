<template>
  <div class="login-template">
    <!-- <div class="bg-primary" style="padding-top: 72px;"></div> -->
      <!-- <section class="vh-100 " style="background-color: #9A616D;"> -->
      <section class="vh-100 bg-secondary bg-opacity-25">
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
                    <div class="card-body px-4 pt-4 px-lg-5 pt-lg-5 text-black">

                      <form>

                        <div class="d-flex align-items-center mb-3 pb-1">
                          <span class="h1 fw-bold mb-0">Register</span>
                        </div>

                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">create your new account</h5>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="name">Username</label>
                          <input type="text" v-model="name" id="name" :class="`form-control form-control-lg ${errName ? 'is-invalid' : ''} `" />
                          <div  class="invalid-feedback" v-if="errName">
                            {{ errName }}
                          </div>
                        </div>

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
                          <button @click="addUser()" class="btn btn-dark btn-lg btn-block" type="button">Register</button>
                        </div>

                        <p class="mb-5 pb-lg-2" style="color: #393f81;">
                          <router-link  to="/login">
                            Already have a account? login here
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
      name: '',
      email: '',
      password: '',

      errName: '',
      errEmail: '',
      errPassword: '',
    }
  },
  mounted(){
    
  },
  methods: {
    addUser: function(){
      this.axios.post('http://127.0.0.1:8000/api/regis', {
          name: this.name,
          email: this.email,
          password: this.password
      })
        .then((res) => {
          // console.log(res.data.success)
          if(res.data.success){
            this.name = ''
            this.email = ''
            this.password = ''
            this.$swal({
                icon: 'success',
                text: res.data.message,
                showConfirmButton: false,
                timer: 1500,
            })
            .then(() => this.$router.push('/login'))
          }
        })
        .catch(err => {
          if(err.response.data.errors == undefined){
            this.$swal({
                icon: 'error',
                // title: 'success',
                text: err.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            })
          }
          
          err.response.data.errors.name != undefined ? this.errName = err.response.data.errors.name[0] : this.errName = '';
          err.response.data.errors.email != undefined ? this.errEmail = err.response.data.errors.email[0] : this.errEmail = '';
          err.response.data.errors.password != undefined ? this.errPassword = err.response.data.errors.password[0] : this.errPassword = '';
        
        })

      
    }
  }
}
</script>