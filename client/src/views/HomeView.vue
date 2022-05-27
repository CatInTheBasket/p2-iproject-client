<script>
import { mapWritableState } from 'pinia'
import { useUserStore } from '../stores/user'
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
      checker: []
    };
  },
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(useUserStore, ['access_token']),
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useUserStore, {
      myOwnName: 'access_token',
    }),
  },
  methods: {
    onSignIn(googleUser) {
  console.log(googleUser.getAuthResponse().id_token);
  let googleToken = googleUser.getAuthResponse().id_token;
  // let profile = googleUser.getBasicProfile();
  // let name = profile.getName();
  // let email = profile.getEmail(); 
   axios
            // .post("https://iproject-server-instavue.herokuapp.com/users/"+"/loginGoogle", {
              .post("http://localhost:3000.com/users/"+"/loginGoogle", {
            token:googleToken
          },{}).done((res) => {
            console.log("Google sign in success");
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("user", res.user);
    localStorage.setItem("role", res.role);
    this.access_token=true;
  })
    .fail((err) => {
      console.log(err);
    });
},
    login() {
      console.log(this.checker)
      
        console.log(this.user.email+" "+this.user.password)
        axios
             .post("https://iproject-server-instavue.herokuapp.com/users/" + this.path, {
              //.post("http://localhost:3000/users/" + this.path, {
            email: this.user.email,
            password: this.user.password
          },{})
          .then(res => {
            if (this.buttonText != "Login") {
              this.$router.push({name:"login"})
            } else {
              console.log(res);
              localStorage.setItem("access_token", res.data.access_token);
              localStorage.setItem("email", res.data.email);
              this.access_token=true;
              this.$router.push({name:"home"})
            }

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
  
  <div id="login">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3">{{buttonText}} Form {{myOwnName}}</h3>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="user.password" />
            </div>
            <div class="mb-3">
              <button @click="login()" class="btn btn-dark">{{buttonText}}</button>
            </div>
            <div v-if="buttonText=='Login'" class="google-signin">
              <h1>Sign In with Google</h1>              
  <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
