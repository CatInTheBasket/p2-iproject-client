<script>
import { mapWritableState } from 'pinia'
import { useProcessStore } from '../stores/counter'
import axios from "axios";
export default {
  el: "#login",
  buttonText: "Login",
  path: "",
  props: {
    buttonText: String,
    path: String
  },
  data() {
    return {
      user: {
        email: "test",
        password: "test"
      },
      error: [],
      buy: []
    };
  },
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(useProcessStore, ['counter']),
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useProcessStore, {
      myOwnName: 'counter',
    }),
  },
  created(){
    axios
            .get("https://iproject-server-instavue.herokuapp.com/users/buy" ,{} ,{ headers: { access_token }})
          .then(res => {
            console.log(res);
              
          })
  },
  methods: {
    buy(id) {
      let access_token = localStorage.getItem("access_token");
        axios
            .post("https://iproject-server-instavue.herokuapp.com/users/buy" , {id:id},{ headers: { access_token }})
          .then(res => {
            console.log(res);
              this.$router.push({name:"home"})
            

            //success = true
          })
          .catch(e => {
            console.log(e);
            this.error = e;
          });
      }
    
  }
};

</script>

<template>
  
  <div>
    
  </div>
</template>
