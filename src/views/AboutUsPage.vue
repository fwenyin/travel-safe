<template>
<NavBar/>
<AboutUs/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import AboutUs from '../components/AboutUs.vue'

export default {
    name: 'SearchCountry',
    components: {
        NavBar,
        AboutUs
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