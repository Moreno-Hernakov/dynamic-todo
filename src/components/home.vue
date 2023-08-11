<template>
  <div class="home-template mb-5" >
    <div class="bg-primary" style="padding-top: 72px;"></div>
    <div class="container px-4 py-5">
      <div class="row">
        <div class="col-md-5 text-center">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form" class="w-75" style="border-radius: 1rem 0 0 1rem;" />
        </div>
        <div class="col-md-7 ">
          <div class="card p-3">
            <div class="input-group mb-3">
              <div class="input-group mb-3">
                <input v-model="todo" type="text" class="form-control" placeholder="add todo..." aria-label="Recipient's username" aria-describedby="button-addon2">
                <button @click="addTodo()" class="btn btn-outline-success" type="button" id="button-addon2">save</button>
              </div>
            </div>
            <!-- <table  class="table table-striped text-center"> -->
            <table v-if="todos.data.length" class="table table-striped text-center mb-4">
              <thead>
                <tr>
                  <th width="5%">#</th>
                  <th width="45%">Todo</th>
                  <th width="8%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(todoo, index) in todos.data" :key="todoo._id" :class="todoo.isChecklist? 'bg-success bg-opacity-25' : '' ">
                  <th>
                    <div class="bg-dark bg-opacity-25 shadow rounded-3 p-1">
                      <input @click="checklist(index)" v-model="todoo.isChecklist" type="checkbox" >
                    </div>
                  </th>
                  
                  <td v-if="!todoo.isChecklist" :id="index">{{ todoo.todo }}</td>
                  <td v-else-if="todoo.isChecklist" :id="index"><del>{{ todoo.todo }}</del></td>
                  <td v-else>
                    <div class="input-group mb-3 w-50 m-auto shadow">
                      <!-- <input :value="todoo.text" type="text" class="form-control" aria-label="Recipients username" aria-describedby="button-addon2"> -->
                      <input v-model="editTodo" type="text" class="form-control" aria-label="Recipients username" aria-describedby="button-addon2">
                      <div class="input-group-append">
                        <button @click="updateTodo(index)" class="btn btn-sm btn-success" type="button" id="button-addon2">Save</button>
                      </div>
                    </div>
                  </td>
                  <td class="d-flex justify-content-around">
                    <button class="btn btn-outline-secondary btn-sm shadow mr-2">Update</button>
                    <button @click="deleteTodo(todoo._id)" class="btn btn-danger btn-sm shadow ">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="text-center text-danger">Todo masih kosong, buat todo pertama mu!!</p>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a @click="paginationBtn('prev')" :class="`page-link ${!todos.prev_page_url ? 'disabled' : '' }`" >Previous</a></li>
                <li class="page-item"><a @click="paginationBtn('next')" :class="`page-link ${!todos.next_page_url ? 'disabled' : '' }`" >Next</a></li>
              </ul>
              <p>Page {{ todos.current_page }} of {{ todos.last_page }}</p>
            </nav>
            <!-- <pagination v-model="todos" :records="500" @paginate="getAllTodo"/> -->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'home-template',
  created() {
    this.getAllTodo()
  },
  data:
    function () {
      return {
        isUpdate: false,
        editTodo: '',
        todo: [],
        todos: [],
        url: 'http://127.0.0.1:8000/api/auth/show?page=1'
      }
    },
  methods : {
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
        .then((res) => {
          console.log(res.data)
          this.getAllTodo()
        })
        .catch(err => {
          console.log(err.response)
        }) 
    },

    paginationBtn : function(e){
      switch(e) {
        case'prev':
          this.url = this.todos.prev_page_url 
          break;
        case 'next':
          this.url = this.todos.next_page_url 
          break;
      }

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
        })
        .catch(err => {
          console.log(err.response)
        })
    },

    addTodo : function(){
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