import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Landing from "../views/Landing.vue";
import Rv from '../views/Rv.vue';
import Room from "../views/Room.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import RvCreate from "../views/RvCreate.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: '/h',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: "/rv",
    name: "Rv",
    component: Rv,
  },
  {
    path:"/rvCreate",
    name: "RvCreate",
    component: RvCreate,
  },
  {
    path: "/room",
    name: "Room",
    component: Room,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
