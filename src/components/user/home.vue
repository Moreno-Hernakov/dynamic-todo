<template>
  <div class="home-template mb-5" >
    <loading 
    loader="dots"
      :active="isLoading"
      :opacity="0.5"
      color="#ffb04f"
      background-color="#000000"
    >
    </loading>
    <div class="bg-primary" style="padding-top: 72px;"></div>
    <div class="container px-4 py-5">
      <div class="row">
        <div class="col-md-5 text-center mb-3 d-none d-md-block">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form" class="w-75" style="border-radius: 1rem 0 0 1rem;" />
        </div>
        <div class="col-md-7 ">
          <div class="card h-100">
            <div class="card-header">
              <div class="input-group d-flex">
                <input v-if="show" v-model="todo" type="text" class="animate__animated animate__fadeInRight form-control" placeholder="add todo..." aria-label="Recipient's username" aria-describedby="button-addon2">
                <button v-if="!show" @click="show = !show" class="btn btn-primary ms-auto animate__animated animate__fadeInLeft" type="button" id="button-addon2">Tambah</button>
                <button v-else @click="addTodo()" class="btn btn-outline-success ms-auto animate__animated animate__fadeInRight" type="button" id="button-addon2">save</button>
              </div>
            </div>
            <!-- <table  class="table table-striped text-center"> -->
            <div class="card-body">
              <table v-if="todos.data" class="table table-hover text-center mb-4">
                <thead>
                  <tr>
                    <th width="5%">#</th>
                    <th width="40%">Todo</th>
                    <th width="5%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todoo, index) in todos.data" :key="index" :class="` ${todoo.isChecklist? 'bg-success bg-opacity-25' : ''} animate__animated animate__lightSpeedInRight`" :style="`animation-duration: 0.${index + 4}s`">
                    <th>
                      <!-- <div class=" shadow rounded-3 p-1"> -->
                        <input @click="checklist(index)" v-model="todoo.isChecklist" class="mt-2" type="checkbox" style="transform: scale(1.6); accent-color: #007714">
                      <!-- </div> -->
                    </th>
                    <td v-if="todoo.isChecklist && !todoo.onEdited" :id="index"><del>{{ todoo.todo }}</del></td>
                    <td v-else-if="todoo.onEdited">
                      <div class="input-group w-50 m-auto shadow">
                        <input v-model="todoo.todo" type="text" :key="todoo.isNullUpdate" :class="`form-control form-control-sm animate__animated ${!todoo.isNullUpdate? 'animate__fadeInRight' : 'animate__tada border-danger'}`" aria-label="Recipients username" aria-describedby="button-addon2">
                        <div class="input-group-append">
                          <button @click="editSaved(index)" class="btn btn-sm btn-success animate__animated animate__fadeInRight" type="button" id="button-addon2">Save</button>
                        </div>
                      </div>
                    </td>
                    <td v-else :id="index">{{ todoo.todo }}</td>
                    <td class="d-flex justify-content-around">
                      <button @click="onUpdateTodo(index)" :class="`${todoo.isChecklist ? 'disabled' : ''} btn btn-outline-secondary btn-sm shadow mr-2`"><i class="fa fa-pen"></i> </button>
                      <button @click="deleteTodo(todoo._id)" class="btn btn-danger btn-sm shadow "><i class="fa fa-trash"></i></button>
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
        transisition : 1,
        show: false,
        isLoading: false,
        todo: '',
        todos: [],
        url: 'http://127.0.0.1:8000/api/auth/show?page=1'
      }
    },
  methods : {
    addTodo : function(){
      if(this.todo.trim() === ''){
        this.show = !this.show
        return
      }

      this.axios.post('http://127.0.0.1:8000/api/auth/add', {todo : this.todo} ,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => {
          if(res.data.success){
            this.$alert.noConfirmBtn(this,'success', res.data.message)
            this.todo = ''
            this.getAllTodo()
            this.show = !this.show
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },

    editSaved : function(index ){
      if(this.todos.data[index].todo.trim() === ''){
        this.todos.data[index].isNullUpdate++
        return
      }

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
          this.isNullUpdate = 0
          this.$alert.noConfirmBtn(this, 'success', 'Todo berhasil diperbarui')
          this.getAllTodo()
          this.$set(this.todos.data[index], 'onEdited', false)
          this.$set(this.todos.data[index], 'isNullUpdate', 0)
        })
        .catch(err => console.error(err.response)) 

    },

    onUpdateTodo : function(index){
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
            this.$set(e, 'isNullUpdate', 0) 
          })

          this.isLoading = false
          
          // App.forceUpdate()
          console.log(this.todos)

        })
        .catch(err => {
          if(err.response.data.message == 'Unauthenticated.'){
          this.$alert.noConfirmBtn(this,'error', 'Session Habis, Silahkan Login!', 1500)
            .then(() => {
              localStorage.removeItem('token');
              localStorage.removeItem('isAdmin');
              this.$router.push('/')
            })
          }
          console.log(err.response.data.message)
        })
    },

    deleteTodo : function(id){
      this.$alert.confirmBtn(this, 'Do you want to delete the todo?', 'Delete')
      .then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`http://127.0.0.1:8000/api/auth/delete/${id}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
            .then((res) => {
              // console.log(res.data)
              if(res.data.success){
                this.$alert.noConfirmBtn(this,'success', 'Deleted!')
                // this.$swal('Deleted!', '', 'success')
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