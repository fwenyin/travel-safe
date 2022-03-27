import { createRouter, createWebHistory } from 'vue-router'
import SearchedCountry from '@/components/SearchedCountry'
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import NavBar from "../components/NavBar.vue";
import News from "../components/News.vue";
import Profile from "../views/Profile.vue";

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
    },
    {
      path: "/navbar",
      name: "NavBar",
      component: NavBar,
    },
    {
      path: "/news",
      name: "News",
      component: News,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
