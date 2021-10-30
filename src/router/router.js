import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hotel from '../views/Hotel.vue'
import Reservation from '../views/Reservation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/*",
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hotel/:id',
    name: 'Hotel',
    component: Hotel,
    props:true,
  },
  {
    path: '/hotel/:id/reservation',
    name: 'Reservation',
    component: Reservation,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
