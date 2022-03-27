<template>
<NavBar/>
<Home/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Home from '../components/Home.vue'

export default {
    name: 'Homepage',
    components: {
        NavBar,
        Home
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