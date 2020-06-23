import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
let common = require.context("../views", true, /\.router\.js/)
let commonArr = []
common.keys().forEach((key) => {
    commonArr = commonArr.concat(common(key).default)
})
  const routes = [
  {
    path: '/',
    name: 'login',
    component:() =>
    import ('../views/login'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path:'/live',
    name: 'live',
    component:()=>import ('../views/live'),
    hidder: true,
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
