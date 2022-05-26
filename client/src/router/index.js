import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeListPost from '../views/HomeListPost.vue'
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
      component: HomeView,
      props: {path:"register",buttonText:"Register"}
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
    if(to.name=="login"||to.name=="register"){
      next({
        path: 'home',
        replace: true
      })
    }else{
      next();
    }
  }else{
    if(to.name!="login"&&to.name!="register"){
      next({
        path: 'login',
        replace: true
      })
    }
  }
})

export default router
