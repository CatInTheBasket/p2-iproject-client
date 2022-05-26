<template>
  <div>
      <h3>Posts</h3>
      <div class="col-sm-12">
        <button @click="doReply">Comments:{{reply}}</button>
        <button @click="doFavourite">Favourite:{{like}} and {{ilike}}</button>
      </div>
      <div class="mb-3">
        <button @click="doShowComment" class="btn btn-dark">{{buttonText}} comment</button>
        <CommentView v-if="buttonText=='Hide'" />
      </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentView from './CommentView.vue'

export default {
   components: {
    CommentView,
    // PostItem,
  },
  data() {
    return {
      like: 0,
      reply: 0,
      ilike:false,
      post: {},
      comments: [],
      buttonText:"Show"
    };
  },
  beforeMount() {
//     let access_token = localStorage.getItem("access_token");
//     let tempThis = this;
//     if (!access_token) {
//       console.log("Please login first");
//     } else {
//       axios
//         .get("http://localhost:3000/post/"+post.id+"/comments", { headers: { access_token } })
//         .then(res => {
//           console.log(res.data);
//           res.data.data.forEach(element => {
//             tempThis.comments.push(element);
//           });
//           tempThis.like = res.data.like;
//           tempThis.reply = res.data.count;
//           console.log(tempThis.posts);
//         })
//         .catch(e => {
//           console.log(e.response.data);
//           this.error = e.response.data;
//         });
//     }
  },
  methods: {
    doFavourite() {
        this.like++;
        this.ilike=!this.ilike;
    },
    doReply() {
        this.reply++;
    },
    doShowComment() {
        if(this.buttonText=="Show"){
            this.buttonText="Hide"
        }else{
            this.buttonText="Show"
        }
    },
    doEdit(id) {
      let access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.log("Please login first");
      } else {
        axios
          .get("http://localhost:3000/post/" + id, {
            headers: { access_token }
          })
          .then(res => {
            console.log(res.data);
            this.post = res.data;
            console.log(this.post);
            this.$emit("doneEdit", this.post);
          })
          .catch(e => {
            console.log(e.response.data);
            this.error = e.response.data;
          });
      }
    }
  }
};
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
