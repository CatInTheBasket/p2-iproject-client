<template>
  <div id="post-item">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-3">Edit Post</h3>
              <PostItem v-model="name"/>
              <PostItem v-model="description"/>
              <PostItem v-model="imgUrl"/>
              <PostItem v-model="location"/>
              <PostItem v-model="tag"/>
              <PostItem v-model="typeId"/>
              <PostItem v-model="statusArchieve"/>
              <PostItem v-model="coin"/>
              <div class="mb-3">
                <button @click="doMethod()" class="btn btn-dark" >Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PostItem from '../components/PostItem.vue'
import axios from 'axios';
export default {
  buttonText:'Add',
  path:'',
  components: {
    PostItem
  },
  props:{
    buttonText:String,
    path:{}  
  },
  created(){
    console.log(this.path);
    console.log("This is path")
    //this.accomodation=this.path;
  },
  data() {
    return {
      post:{
        name:"",
        description:"",
        roomCapacity:"",
        imgUrl:"",
        location:"",
        tag:"",
        typeId:"",
        statusArchieve:"",
        coin:""
      },
      error:[]
    }
  },
  methods:{
    doMethod(){
      let access_token = localStorage.getItem("access_token");
      console.log("function is fired"+ this.buttonText)
      if(this.buttonText==="Edit"){
              axios.put('https://iproject-server-instavue.herokuapp.com/post/', {name:this.name,
        description:this.description,
        imgUrl:this.imgUrl,
        location:this.location,
        tag:this.tag,
        typeId:this.typeId,
        statusArchieve:this.statusArchieve,
        coin:this.coin},{ headers: { access_token,'Content-Type': 'application/x-www-form-urlencoded' }})
        .then((response) => {
          console.log(response);
          
        })
        .catch((e) => {
          console.log(e.response.data);
          this.error = e.response.data
        })
      }else{
        axios.post('https://iproject-server-instavue.herokuapp.com/post/', {name:this.name,
        description:this.description,
        imgUrl:this.imgUrl,
        location:this.location,
        tag:this.tag,
        typeId:this.typeId,
        statusArchieve:this.statusArchieve,
        coin:this.coin},{ headers: { access_token,'Content-Type': 'application/x-www-form-urlencoded' }})
        .then((response) => {
          console.log(response);
          
        })
        .catch((e) => {
          console.log(e.response.data);
          this.error = e.response.data
        })
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
