<template>
<NavBar/>
    <div style = "text-align: center;" v-if="user">
        <br>
        <br>
        
        <h3>Error 404 Page Not Found!!</h3>
        <br>
        <h4>Please click on the above available options</h4>
        <br>
    </div>
    <div id = "footer">
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from "../components/Footer.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
    name:"NotFound",

    components: {
        NavBar,
        Footer,
    },

    data() {
        return {
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>  {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style>
#footer {
  position: fixed;
  width: 100%;
  bottom: 0%;
}
</style>