import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import ApplicantsAll from '../views/applicants/ApplicantsAll.vue'
import ApplicantsEdit from '../views/applicants/ApplicantsEdit.vue'
import ApplicantsCreate from '../views/applicants/ApplicantsCreate.vue'

Vue.use(VueRouter)

const isLoggedIn = false;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/applicants',
    name: 'Applicants-All',
    component: ApplicantsAll,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      }
      else {
        next('/login');
      }
    }
  },
  {
    path: '/applicants/create',
    name: 'Applicants-Create',
    component: ApplicantsCreate,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      }
      else {
        next('/login');
      }
    }
  },
  {
    path: '/applicants/:id',
    name: 'Applicants-Edit',
    component: ApplicantsEdit,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      }
      else {
        next('/login');
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) {
        next();
      }
      else {
        next('/');
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) {
        next();
      }
      else {
        next('/');
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
