<template>
  <NavBar />
  <Room />
  <br />
  <br />
  <br />
  <Footer />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Room from "../components/Room.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Homepage",
  components: {
    NavBar,
    Room,
    Footer,
  },
  data() {
    return {
      refreshComp: 0,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
  },
};
</script>
