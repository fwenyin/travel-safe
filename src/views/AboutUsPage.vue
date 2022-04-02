<template>
<NavBar/>
<AboutUs/>
<br> <br> <br>
<Footer/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import AboutUs from '../components/AboutUs.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'SearchCountry',
    components: {
        NavBar,
        AboutUs,
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