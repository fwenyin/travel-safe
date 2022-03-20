import App from "./App.vue";
import { createApp } from 'vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap";

createApp(App).use(router).use(VueChartkick).mount('#app')
