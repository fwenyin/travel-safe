<template>
<NavBar/>
<SearchedCountry/>
<TravelAdvisory/>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import SearchedCountry from '../components/SearchedCountry.vue'
import TravelAdvisory from "../components/TravelAdvisory.vue"

export default {
    name: 'SearchCountry',
    components: {
        NavBar,
        SearchedCountry,
        TravelAdvisory
    },
    data() {
        return {
            refreshComp:0
        }
    },
    methods: {
        change() {
            this.refreshComp += 1
        },
        moveUp(){
           window.scrollTo(0,0);
        }
    },

    created() {
        this.moveUp();
    }
}
</script>