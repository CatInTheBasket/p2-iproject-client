<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  
  data() {
    return {
      access_token: true
    };
  },
  methods: {
logout(){
      localStorage.clear();
      this.haveLocalStorage();
      this.$router.push({name:"login"})
    },
    haveLocalStorage(){
      if(localStorage.getItem('access_token')){
        this.access_token=true;
      }else{
        this.access_token=false;
      }
    }
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="65" height="65" />

    <div class="wrapper">
<nav class="ms-3">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink v-if="access_token" to="/favourite">Favourite</RouterLink>
        <RouterLink v-if="access_token" to="/paid">My Paid Content</RouterLink>
<!-- 
        <RouterLink to="/about">My Post</RouterLink> -->
      </nav>
      <nav class="ms-auto">
        <RouterLink v-if="access_token" to="/home">My Coin</RouterLink>
        <RouterLink v-if="!access_token" to="/login">Login</RouterLink>
        <RouterLink v-if="!access_token" to="/register">Register</RouterLink>
        <button @click="logout">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 100vw;
  margin: 0 auto;

  font-weight: normal;
}

header {
  max-height: 30vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  header {
    display: flex;
    width: 100vw;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background-color:rgb(250, 217, 222) 
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100vw;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
