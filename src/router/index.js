import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import ApplicantsAll from '../views/applicants/ApplicantsAll.vue'
import ApplicantsEdit from '../views/applicants/ApplicantsEdit.vue'
import ApplicantsCreate from '../views/applicants/ApplicantsCreate.vue'

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
    component: ApplicantsAll
  },
  {
    path: '/applicants/create',
    name: 'Applicants-Create',
    component: ApplicantsCreate
  },
  {
    path: '/applicants/:id',
    name: 'Applicants-Edit',
    component: ApplicantsEdit
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
