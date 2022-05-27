<script>
import { mapWritableState } from 'pinia'
import { usePostStore } from '../stores/post'
import { useUserStore } from '../stores/user'

import axios from "axios";
import PostActionBar from '../components/PostActionBar.vue'

export default {
  data() {
    return {
      email: "test",
      password: "test",
      post: {},
      posts: [],
      postsPaid: [],
      postsFollowing: [],
      totalPages: 0,
      curentPages: 0
    };
  },
  
  components: {
    PostActionBar
    // PostItem,
  },
  beforeMount() {
    let access_token = localStorage.getItem("access_token");
    let tempThis = this;
    if (!access_token) {
      console.log("Please login first");
    } else {
      axios
        .get("https://iproject-server-instavue.herokuapp.com/post/", { headers: { access_token} })
        .then(res => {
          console.log(res.data);
          res.data.data.forEach(element => {
            tempThis.posts.push(element);
          });
          tempThis.totalPages = res.data.totalPages;
          res.data.paid.forEach(element => {
            tempThis.postsPaid.push(element);
          });
          res.data.follower.forEach(element => {
            tempThis.postsFollowing.push(element);
          });

          console.log(tempThis.posts);
        })
        .catch(e => {
          console.log(e.response.data);
          this.error = e.response.data;
        });
    }
  },
  mounted() {
    this.hookOnScrollLoadMore();
  },
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    // same as above but registers it as this.myOwnName
    ...mapWritableState(usePostStore, {
      postStore: 'post',
    }),
    ...mapWritableState(useUserStore, {
      userStore: 'user',
    }),
  },
  methods: {
    
    compareEmail(input) {
      if (localStorage.getItem("email") == input) {
        return true;
      } else {
        return false;
      }
    },
    doEdit(id) {
      let access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.log("Please login first");
      } else {
        axios
          .get("https://iproject-server-instavue.herokuapp.com/post/" + id, {
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
    },
    doLoadMore() {
      console.log(
        "Current pages: " +
          this.curentPages +
          " Total Pages: " +
          (this.totalPages - 1)
      );
      if (this.curentPages < this.totalPages - 1) {
        let tempThis = this;
        this.curentPages++;
        axios
          .get("https://iproject-server-instavue.herokuapp.com/post?page=" + this.curentPages, {})
          .then(res => {
            console.log(res.data);
            res.data.data.forEach(element => {
              tempThis.posts.push(element);
            });
            tempThis.totalPages = res.data.totalPages;
            console.log(tempThis.posts);
          })
          .catch(e => {
            console.log(e.response.data);
            this.error = e.response.data;
          });
      }
    },
    doDelete(event) {
      let access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.log("Please login first");
      } else {
        axios
          .delete("https://iproject-server-instavue.herokuapp.com/post/" + event.target.value, {
            headers: { access_token }
          })
          .then(res => {
            console.log(res.data);
            res.data.data.forEach(element => {
              this.posts.push(element);
            });
            console.log(this.posts);
          })
          .catch(e => {
            console.log(e.response.data);
            this.error = e.response.data;
          });
      }
    },
    hookOnScrollLoadMore() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight-150;
          console.log(document.documentElement.scrollTop + window.innerHeight +"  "+document.documentElement.offsetHeight );
        if (bottomOfWindow) {
          this.doLoadMore();
        }
      };
    },
    createPost() {
      console.log("redirect to post form");
      this.$router.push({name:"add"})
    }
  
  }
};

</script>

<template>
    <div class="container mt-3">
     <div class="card-group">
      <h3>Posts</h3>
      <div class="col-sm-12">
        <div class="mb-3">
          <button @click="createPost" class="btn btn-dark">Create your own post</button>
        </div>
        <div v-if="postsPaid.length>0">
        <h1>What you have paid:</h1>
        <li v-for="item in postsPaid" :key="item">
          <div class="card">
            <img :src="item.imgUrl" class="img-fluid" :alt="item.imgUrl" />
            <div class="card-body">
              <h3 class="card-title">{{item.name}}</h3>
              <p class="card-text">{{item.description}}</p>

              <p>Location: {{item.location}}</p>
              <h5>By: {{item.User.email}}</h5>
              <p class="card-subtitle mb-2 text-muted">{{item.createdAt}}</p>
              <label class="btn btn-primary">{{item.Type.name}}</label>
              <br />
              <PostActionBar />
              <div v-if="compareEmail(item.User.email)">
                <button @click="doEdit(item.id)" :value="item.id">Edit</button>
                <button @click="doDelete" :value="item.id">Archieve</button>
              </div>
            </div>
          </div>
        </li>
        </div>
        <div v-if="postsPaid.length>0">
        <h1>Exclusive from other you follow:</h1>
        <li v-for="item in postsFollowing" :key="item">
          <div class="card">
            <img :src="item.imgUrl" class="img-fluid" :alt="item.imgUrl" />
            <div class="card-body">
              <h3 class="card-title">{{item.name}}</h3>
              <p class="card-text">{{item.description}}</p>

              <p>Location: {{item.location}}</p>
              <h5>By: {{item.User.email}}</h5>
              <p class="card-subtitle mb-2 text-muted">{{item.createdAt}}</p>
              <label class="btn btn-primary">{{item.Type.name}}</label>
              <br />
              <PostActionBar />
              <div v-if="compareEmail(item.User.email)">
                <button @click="doEdit(item.id)" :value="item.id">Edit</button>
                <button @click="doDelete" :value="item.id">Archieve</button>
              </div>
            </div>
          </div>
        </li>
        </div>
        <h1>Recent Post:</h1>
        <li v-for="item in posts" :key="item">
          <div class="card">
            <img :src="item.imgUrl" class="img-fluid" :alt="item.imgUrl" />
            <div class="card-body">
              <h3 class="card-title">{{item.name}}</h3>
              <p class="card-text">{{item.description}}</p>

              <p>Location: {{item.location}}</p>
              <h5>By: {{item.User.email}}</h5>
              <p class="card-subtitle mb-2 text-muted">{{item.createdAt}}</p>
              <label class="btn btn-primary">{{item.Type.name}}</label>
              <br />
              <PostActionBar />
              <div v-if="compareEmail(item.User.email)">
                <button @click="doEdit(item.id)" :value="item.id">Edit</button>
                <button @click="doDelete" :value="item.id">Archieve</button>
              </div>
              <div v-else>
                <button @click="doEdit(item.id)" :value="item.id">Favourite</button>
                <button @click="doDelete" :value="item.id">Reply</button>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

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