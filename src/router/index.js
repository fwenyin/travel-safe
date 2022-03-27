import { createRouter, createWebHistory } from 'vue-router'
import SearchedCountry from '@/components/SearchedCountry'
import Login from "../components/Login.vue";
// import Signup from "../components/Signup.vue";
import Home from "../components/Home.vue";

const routes = [
    {
      path: "/",
      name: Login,
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
        path: '/searched-country/:country',
        name: 'Searched Country',
        component: SearchedCountry
    }
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
