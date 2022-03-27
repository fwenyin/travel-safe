import { createRouter, createWebHistory } from "vue-router";
import ForumPage from "@/components/ForumPage.vue";
import ForumThread from "@/components/ForumThread.vue";

const routes = [
  {
    path: "/",
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
  routes,
});
export default router;
