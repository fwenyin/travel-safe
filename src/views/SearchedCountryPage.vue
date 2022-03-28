<template>
<NavBar/>
<SearchedCountry/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import SearchedCountry from '../components/SearchedCountry.vue'

export default {
    name: 'SearchCountry',
    components: {
        NavBar,
        SearchedCountry
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