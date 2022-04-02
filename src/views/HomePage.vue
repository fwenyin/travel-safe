<template>
<NavBar/>
<Home/>
<Footer/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Home from '../components/Home.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Homepage',
    components: {
        NavBar,
        Home,
        Footer,
    },
    data() {
        return {
            refreshComp:0
        }
    },
    methods: {
        change() {
            this.refreshComp += 1
        }
    }
}
</script>