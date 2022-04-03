<template>
  <NavBar />
  <Chat />
  <br />
  <br />
  <br />
  <br />
  <Footer />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Chat from "../components/Chat.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Homepage",
  components: {
    NavBar,
    Chat,
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
