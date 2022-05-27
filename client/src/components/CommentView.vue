
<template>
  <div id="login">
    <h1>Comment List</h1>
    <div v-for="item in comments" :key=item.id>
        <div class="float-left">
    <p>User: {{item.user.username}}</p>
    <p>Commented: {{item.comment}}</p>
        </div>
    </div>
  </div>
</template>

<script>
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
      checker: [],
      comments: [{id:1,user:{username:"uwu"},comment:"sacred text"},{id:2,user:{username:"uwu"},comment:"sacred text3"},{id:3,user:{username:"OwO"},comment:"sacrext"}]
    };
  },
  methods: {
    onSignIn(googleUser) {
  console.log(googleUser.getAuthResponse().id_token);
  let googleToken = googleUser.getAuthResponse().id_token;
  // let profile = googleUser.getBasicProfile();
  // let name = profile.getName();
  // let email = profile.getEmail(); 
   axios
            .post("iproject-server-instavue.herokuapp.com/users/"+"/loginGoogle", {
            token:googleToken
          },'').done((res) => {
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("user", res.user);
    localStorage.setItem("role", res.role);
    this.$emit("doneLogin");
  })
    .fail((err) => {
      console.log(err);
    });
},
    login() {
      console.log(this.checker)
      if (this.checker.length < 1) {
        console.log("Masih belum lengkap");
      } else {
        console.log(this.user.email+" "+this.user.password)
        axios
            .post("https://iproject-server-instavue.herokuapp.com/users/" + this.path, {
            email: this.user.email,
            password: this.user.password
          },'')
          .then(res => {
            if (this.buttonText != "Login") {
              this.$emit("doneRegister");
            } else {
              console.log(res);
              localStorage.setItem("access_token", res.data.access_token);
              localStorage.setItem("email", res.data.email);
              this.$emit("doneLogin");
            }

            //success = true
          })
          .catch(e => {
            console.log(e.response.data);
            this.error = e.response.data;
          });
      }
    }
  },
  mounted() {
    this.$watch("user.email", newEmail => {
      if (newEmail.length < 4) {
        console.log("Length pendek");
        let idx = this.checker.indexOf("email");
        if (idx > -1) {
          this.checker.splice(idx, 1); // 2nd parameter means remove one item only
        }
      } else {
        this.checker.push("email");
      }
    });
        this.$watch("user.password", newPassword => {
      if (newPassword.length < 3) {
        console.log("Length pendek");
        let idx = this.checker.indexOf("password");
        if (idx > -1) {
          this.checker.splice(idx, 1); // 2nd parameter means remove one item only
        }
      } else {
        this.checker.push("password");
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
