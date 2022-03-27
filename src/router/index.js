import { createRouter, createWebHistory } from 'vue-router'
import SearchedCountry from '@/views/SearchedCountryPage.vue'
import Login from "../components/Login.vue";
import Home from "../views/HomePage.vue";
import NavBar from "../components/NavBar.vue";
import News from "../views/NewsPage.vue";
import Profile from "../views/Profile.vue";
import ForumPage from "@/views/ForumPage.vue";
import ForumThread from "@/views/ForumThread.vue";

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
    {
      path: "/forumpage",
      name: "ForumPage",
      component: ForumPage,
    },
    {
      path: "/ForumThread/:id",
      name: "ForumThread",
      component: ForumThread,
    },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
