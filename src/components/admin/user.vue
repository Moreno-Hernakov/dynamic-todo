<template>
  <div id="user-page" class="container py-5">
    <loading style="z-index: 2;"
    loader="dots"
      :active="isLoading"
      :opacity="0.5"
      color="#0dcaf0"
      background-color="#000000"
    >
    </loading>
    <div class="card mb-4 rounded-4 shadow ">
      <div class="p-4">
        <h3>User Table</h3>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table table-hover container text-center">
            <thead class="bg-dark" >
              <tr >
                <!-- <th class="text-white" width="10%" scope="col">#</th> -->
                <!-- <th class="text-white" width="" scope="col">id</th> -->
                <th class="text-white" width="" scope="col">Name</th>
                <th class="text-white" width="" scope="col">Email</th>
                <th class="text-white" width="" scope="col">Role</th>
                <th class="text-white" width="" scope="col">Action</th>
              </tr>
            </thead>
            <!-- <tbody> -->
            <tbody v-for="user in users.data" :key="user._id">
              <tr>
                <!-- <th>{{ ++index }}</th> -->
                <!-- <td>3786474632874</td> -->
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <button @click="deleteTodo" class="btn btn-sm bg-danger text-white rounded-4 shadow">
                    <i class="fa fa-trash"></i>&nbsp; Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer d-flex py-2" v-if="users.last_page !== 1">
        <div  class="rounded-3" v-for="(page, index) in users.links" :key="index">
          <button v-if="page.label == '&laquo; Previous'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-info rounded-0 border-white`"> Previous </button>
          <button v-else-if="page.label == 'Next &raquo;'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-info rounded-0 border-white`"> Next </button>
          <button v-else @click="paginationBtn(page.url)" :class="`${page.active? 'text-info bg-light border-info fw-bold mx-1' : 'border-white'} btn btn-info rounded-0 `">{{ page.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import loading from 'vue-loading-overlay';
export default {
  name: 'user-page',
  components: {
      loading
  },
  data(){
    return{
      isLoading : false,
      url: 'http://127.0.0.1:8000/api/auth/showuser',
      users : []
    }
  },
  created(){
    this.isLoading = true
    this.getAllUsers()
  },
  methods: {
    paginationBtn : function(url){
      this.url = url
      this.getAllUsers()
    },

    getAllUsers: function(){
      this.axios.get(this.url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })  
        .then((res) => {
          this.isLoading = false
          this.users = res.data
          // this.isLoading = false
          
          console.log(this.users)

        })
        .catch(err => {
          if(err.response.data.message == 'Unauthenticated.'){
            this.$swal({
              icon: 'error',
              text: 'Session Habis, Silahkan Login',
              showConfirmButton: false,
              timer: 1500,
          })
            .then(() => {
              localStorage.removeItem('token');
              this.$router.push('/')
            })
            return
          }
          console.log(err.response.data.message)
        })
    },

    deleteTodo : function(){
      alert(1)
    }
  }
}
</script>


