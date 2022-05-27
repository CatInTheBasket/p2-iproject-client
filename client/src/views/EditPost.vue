<template>
  <div id="post-item">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-3">{{path}} Post</h3>
              <PostItem modelValue="name" :attributes="post.name"/>
              <PostItem modelValue="description" :attributes="post.description"/>
              <PostItem modelValue="imgUrl" :attributes="post.imgUrl"/>
              <PostItem modelValue="location" :attributes="post.location"/>
              <PostItem modelValue="tag" :attributes="post.tag"/>
              <PostItem modelValue="typeId" :attributes="post.typeId"/>
              <PostItem modelValue="statusArchieve" :attributes="post.statusArchieve"/>
              <PostItem modelValue="coin" :attributes="post.coin"/>
              <div class="mb-3">
                <button @click="doMethod()" class="btn btn-dark" >{{path}}</button>
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
import { mapWritableState } from 'pinia'
import { usePostStore } from '../stores/post'
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
    console.log("This is post on path")
    console.log(this.$route.params)
    if(this.$route.params){
      this.post.name=this.$route.params.name
      this.post.description=this.$route.params.description
      this.post.imgUrl=this.$route.params.imgUrl
      this.post.location=this.$route.params.location
      this.post.tag=this.$route.params.tag
      this.post.typeId=this.$route.params.typeId
      this.post.statusArchieve=this.$route.params.statusArchieve
      this.post.coin=this.$route.params.coin
      this.post.id=this.$route.params.id
    }
    
    //this.accomodation=this.path;
  },
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(usePostStore, ['post']),
    // same as above but registers it as this.myOwnName
    ...mapWritableState(usePostStore, {
      myOwnName: 'post',
    }),
  },
  data() {
    return {
      
      error:[]
    }
  },
  methods:{
    doMethod(){
      let access_token = localStorage.getItem("access_token");
      console.log("function is fired"+ this.post.id)
      if(this.path=="edit"){
              axios.put('https://iproject-server-instavue.herokuapp.com/post/'+this.post.id, 
              //axios.put('http://localhost:3000/post/'+this.post.id, 
          {
            name:this.post.name,
        description:this.post.description,
        imgUrl:this.post.imgUrl,
        location:this.post.location,
        tag:this.post.tag,
        typeId:this.post.typeId,
        statusArchieve:this.post.statusArchieve,
        coin:this.post.coin
        },
        { headers: { access_token }})
        .then((response) => {
          console.log(response);
          
        })
        .catch((e) => {
          console.log(e.response.data);
          this.error = e.response.data
        })
      }else{
        axios.post('https://iproject-server-instavue.herokuapp.com/post/', {
          //axios.post('http://localhost:3000/post/', {
            name:this.post.name,
        description:this.post.description,
        imgUrl:this.post.imgUrl,
        location:this.post.location,
        tag:this.post.tag,
        typeId:this.post.typeId,
        statusArchieve:this.post.statusArchieve,
        coin:this.post.coin
        },{ headers: { access_token }})
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
