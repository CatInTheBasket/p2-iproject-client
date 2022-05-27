import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeListPost from '../views/HomeListPost.vue'
import EditPost from '../views/EditPost.vue'
import BuyView from '../views/BuyView.vue'

import PostActionBar from "../components/PostActionBar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomeListPost
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default:HomeListPost,
        favreply:PostActionBar
      },
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView,
      props: {path:"login",buttonText:"Login"},
    },
    {
      path: '/register',
      name: 'register',
      component: HomeView,
      props: {path:"register",buttonText:"Register"}
    },
    {
      path: '/buy',
      name: 'buy',
      component: BuyView
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditPost,
      props: {buttonText:"Edit"}
    },{
      path: '/add',
      name: 'add',
      component: EditPost,
      props: {buttonText:"Add"}
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: HomeView,
      props: {path:"register",buttonText:"Register"}
    },
    {
      path: '/paid',
      name: 'paid',
      component: HomeView,
      props: {path:"register",buttonText:"Register"}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if (localStorage.getItem('access_token')){
    console.log(to.name);
    if(to.name=="login"||to.name=="register"){
      
      next({
        path: 'home',
        replace: true
      })
    }else{
      console.log(to.name);
      if(to.name=="edit"){
        next();
      }else{
        next();
      }
      
    }
  }else{
    // console.log(to.name);
    if(to.name!="login"&&to.name!="register"){
      console.log(to.name);
      next({
        path: 'login',
        replace: true
      })
    }else{
      next();
    }
  }
})

export default router
