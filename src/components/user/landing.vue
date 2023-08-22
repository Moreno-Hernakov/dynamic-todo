<template>
  <div class="landing-template">
    <header class="masthead">
      <!-- <img src="require(../assets/img/bg-masthead.jpg)" alt=""> -->
        <div class="container px-4 px-lg-5 h-100">
            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-8 align-self-end">
                    <h1 class="text-white font-weight-bold">Aplikasi Todo favorit kamu</h1>
                    <hr class="divider" />
                </div>
                <div class="col-lg-8 align-self-baseline">
                    <p class="text-white-75 mb-5">Sebuah aplikasi todo list dinamis dengan fitur user admin didalamnya, mari catat kegiatan atau tugas sehari-hari dengan TODO APP</p>
                    <router-link class="btn btn-primary btn-xl" to="/login">Catat todo pertamamu disini!</router-link>
                    <!-- <a class="btn btn-primary btn-xl" href="#about">Daftar Sekarang Juga!</a> -->
                </div>
            </div>
        </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'landing-template',
}
</script>