<template>
  <div class="home-template mb-5" >
    <loading 
    loader="dots"
      :active="isLoading"
      opacity="0.5"
      color="#ffb04f"
      background-color="#000000"
    >
    </loading>
    <div class="bg-primary" style="padding-top: 72px;"></div>
    <div class="container px-4 py-5">
      <div class="row">
        <div class="col-md-5 text-center">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form" class="w-75" style="border-radius: 1rem 0 0 1rem;" />
        </div>
        <div class="col-md-7 ">
          <div class="card h-100">
            <div class="card-header">
              <div class="input-group ">
                <input v-model="todo" type="text" class="form-control" placeholder="add todo..." aria-label="Recipient's username" aria-describedby="button-addon2">
                <button @click="addTodo()" class="btn btn-outline-success" type="button" id="button-addon2">save</button>
              </div>
            </div>
            <!-- <table  class="table table-striped text-center"> -->
            <div class="card-body">
              <table v-if="todos.data" class="table table-striped text-center mb-4">
                <thead>
                  <tr>
                    <th width="5%">#</th>
                    <th width="45%">Todo</th>
                    <th width="8%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todoo, index) in todos.data" :key="index" :class="` ${todoo.isChecklist? 'bg-success bg-opacity-25' : ''} `">
                    <th>
                      <div class="bg-dark bg-opacity-25 shadow rounded-3 p-1">
                        <input @click="checklist(index)" v-model="todoo.isChecklist" type="checkbox" >
                      </div>
                    </th>
                    <td v-if="todoo.isChecklist && !todoo.onEdited" :id="index"><del>{{ todoo.todo }}</del></td>
                    <td v-else-if="todoo.onEdited">
                      <div class="input-group w-50 m-auto shadow">
                        <input v-model="todoo.todo" type="text" class="form-control form-control-sm" aria-label="Recipients username" aria-describedby="button-addon2">
                        <div class="input-group-append">
                          <button @click="editSaved(index)" class="btn btn-sm btn-success" type="button" id="button-addon2">Save</button>
                        </div>
                      </div>
                    </td>
                    <td v-else :id="index">{{ todoo.todo }}</td>
                    <td class="d-flex justify-content-around">
                      <button @click="onUpdateTodo(index)" class="btn btn-outline-secondary btn-sm shadow mr-2">Update</button>
                      <button @click="deleteTodo(todoo._id)" class="btn btn-danger btn-sm shadow ">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-else class="text-center text-danger">Todo masih kosong, buat todo pertama mu!!</p>
            </div>

            <div class="card-footer d-flex ">
              <div class="rounded-3" v-for="(page, index) in todos.links" :key="index">
                <button v-if="page.label == '&laquo; Previous'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-primary rounded-0 border-white`"> Previous </button>
                <button v-else-if="page.label == 'Next &raquo;'" @click="paginationBtn(page.url)" :class="`${!page.url? 'disabled' : ''} btn btn-primary rounded-0 border-white`"> Next </button>
                <button v-else @click="paginationBtn(page.url)" :class="`${page.active? 'text-primary bg-light border-primary fw-bold mx-1' : 'border-white'} btn btn-primary rounded-0 `">{{ page.label }}</button>
              </div>
            <!-- <p>Page {{ todos.current_page }} of {{ todos.last_page }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import App from '../App.vue'
import Loading from 'vue-loading-overlay';

export default {
  name: 'home-template',
  created() {
    this.isLoading = true
    this.getAllTodo()
    },
  components: {
      Loading
  },
  data() {
      return {
        isLoading: false,
        todo: '',
        todos: [],
        url: 'http://127.0.0.1:8000/api/auth/show?page=1'
      }
    },
  methods : {
    editSaved : function(index, ){

      this.axios.put('http://127.0.0.1:8000/api/auth/update',
        {
          id: this.todos.data[index]._id,
          todo: this.todos.data[index].todo
        }, 
        {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => {
          console.log(res.data)
          this.$swal({
            icon: 'success',
            text: 'Todo berhasil diperbarui',
            showConfirmButton: false,
            timer: 900,
          })
          this.getAllTodo()
          this.$set(this.todos.data[index], 'onEdited', false)
        })
        .catch(err => console.error(err.response)) 

    },

    onUpdateTodo : function(index){

      // check todo isChecklist?
      if(this.todos.data[index].isChecklist){
        this.$swal({
            icon: 'warning',
            text: 'Unchecklist Todo terlebih dahulu',
            showConfirmButton: false,
            timer: 1500,
        })
        return 
      }
      this.$set(this.todos.data[index], 'onEdited', true)
    },

    checklist : function(i){
      this.axios.put('http://127.0.0.1:8000/api/auth/checklist',
        {
          id: this.todos.data[i]._id,
          isChecklist: !this.todos.data[i].isChecklist
        }, 
        {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(() => {
          this.getAllTodo()
        })
        .catch(err => {
          console.log(err.response)
        }) 
    },

    paginationBtn : function(url){
      this.url = url
      this.getAllTodo()
    },

    getAllTodo : function(){
      this.axios.get(this.url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => {
          this.todos = res.data
          
          this.todos.data.forEach((e) => {
            this.$set(e, 'onEdited', false) 
          })

          this.isLoading = false
          
          // App.forceUpdate()
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

    addTodo : function(){
      if(this.todo === ''){
        this.$swal({
          icon: 'warning',
          text: 'todo tidak boleh kosong',
          showConfirmButton: false,
          timer: 900,
        })
        return
      }

      this.axios.post('http://127.0.0.1:8000/api/auth/add', {todo : this.todo} ,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => {
          if(res.data.success){
            this.$swal({
                icon: 'success',
                text: res.data.message,
                showConfirmButton: false,
                timer: 900,
            })
            this.todo = ''
            this.getAllTodo()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },

    deleteTodo : function(id){
      this.$swal({
        title: 'Do you want to delete the todo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`http://127.0.0.1:8000/api/auth/delete/${id}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
            .then((res) => {
              // console.log(res.data)
              if(res.data.success){
                this.$swal('Deleted!', '', 'success')
                this.getAllTodo()
              }
            })
            .catch(err => {
              console.log(err.response)
            })
        } 
      })
      
    }
    
  }
  
}
</script>