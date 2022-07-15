import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewCourseView from '../views/NewCourseView.vue'
import SignUp from '../views/SiginUpView.vue'
import SignIn from '../views/SiginInView.vue'
import Profil from '../views/ProfilView.vue'

import {supabase} from '../supabase'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SignIn,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/new-course',
    name: 'newCourse',
    component: NewCourseView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/new-course/:id',
    name: 'updateCourse',
    component: NewCourseView,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/sigin-up/',
    name: 'siginUp',
    component: SignUp,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/sigin-in/',
    name: 'siginIn',
    component: SignIn,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/profil/',
    name: 'profil',
    component: Profil,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      requireAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  let user = await supabase.auth.user();
  store.dispatch("setUser", user)
  if(user){
    next();
  }else if(to.meta.requireAuth && !user){
    next({name: "about"});
  }
  else{
    next();
  }
})

export default router
