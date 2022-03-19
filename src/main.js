import App from "./App.vue";
import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap";
import router from "./router/index.js";

createApp(App).use(router).mount("#app");
