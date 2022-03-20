import { createRouter, createWebHistory } from 'vue-router'
import SearchedCountry from '@/components/SearchedCountry'
import Home from '@/components/Home'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/searched-country',
        name: 'Searched Country',
        component: SearchedCountry
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router