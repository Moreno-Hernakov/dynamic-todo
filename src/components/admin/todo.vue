<template>
  <div id="todo-page" class="container min-height-500">
    <div class="card mb-4 rounded-4 shadow ">
      <div class="p-4">
        <h3>Todo Table</h3>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table table-hover container text-center">
            <thead class="bg-dark" >
              <tr >
                <!-- <th class="text-white" width="10%" scope="col">#</th> -->
                <th class="text-white" width="40%" scope="col">User_id</th>
                <th class="text-white" width="" scope="col">Todo</th>
                <th class="text-white" width="" scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="todo in todos.data" :key="todo._id">
              <tr>
                <!-- <th>{{ ++index }}</th> -->
                <td>{{ todo.user_id }}</td>
                <td>{{ todo.todo }}</td>
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
      <div class="card-footer d-flex py-2">
        <div class="rounded-3" v-for="(page, index) in todos.links" :key="index">
          <button v-if="page.label == '&laquo; Previous'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-info rounded-0 border-white`"> Previous </button>
          <button v-else-if="page.label == 'Next &raquo;'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-info rounded-0 border-white`"> Next </button>
          <button v-else @click="paginationBtn(page.url)" :class="`${page.active? 'text-info bg-light border-info fw-bold mx-1' : 'border-white'} btn btn-info rounded-0 `">{{ page.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'todo-page',
  data(){
    return {
      todos: [],
      url: 'http://127.0.0.1:8000/api/auth/showall'
    }
  },
  created(){
    this.getAllTodo()
  },
  methods: {
    paginationBtn : function(url){
      this.url = url
      this.getAllTodo()
    },

    getAllTodo: function(){
      this.axios.get(this.url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => {
          this.todos = res.data
          // this.isLoading = false
          
          console.log(this.todos)

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
          }
          console.log(err.response.data.message)
        })
    },

    deleteTodo : function(){
      this.$swal({
        title: 'Do you want to delete the todo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
                this.$swal('Deleted!', '', 'success')
        } 
      })
    }
  }
}
</script>


