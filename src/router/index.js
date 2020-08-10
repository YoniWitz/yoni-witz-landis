import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import ApplicantsAll from '../views/applicants/ApplicantsAll.vue'
import ApplicantsEdit from '../views/applicants/ApplicantsEdit.vue'
import ApplicantsView from '../views/applicants/ApplicantsView.vue'
import ApplicantsCreate from '../views/applicants/ApplicantsCreate.vue'
import * as auth from '../services/auth'

Vue.use(VueRouter)

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
      auth.isLoggedIn() ? next() : next('/login');
    }
  },
  {
    path: '/applicants/create',
    name: 'Applicants-Create',
    component: ApplicantsCreate,
    beforeEnter: (to, from, next) => {
      auth.isLoggedIn() ? next()  : next('/login');
    }
  },
  {
    path: '/applicants/edit/:id',
    name: 'Applicants-Edit',
    component: ApplicantsEdit,
    beforeEnter: (to, from, next) => {
      auth.isLoggedIn() ? next()  : next('/login');
    }
  },
  {
    path: '/applicants/view/:id',
    name: 'Applicants-View',
    component: ApplicantsView,
    beforeEnter: (to, from, next) => {
      auth.isLoggedIn() ? next()  : next('/login');
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      !auth.isLoggedIn() ? next()  : next('/');
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      !auth.isLoggedIn() ? next()  : next('/');
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
