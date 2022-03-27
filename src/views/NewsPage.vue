<template>
<NavBar/>
<News/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import News from '../components/News.vue'

export default {
    name: 'Newspage',
    components: {
        NavBar,
        News
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