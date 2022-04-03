<template>
<NavBar/>
<News/>
<br/> <br/> <br/>
<Footer/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import News from '../components/News.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Newspage',
    components: {
        NavBar,
        News,
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