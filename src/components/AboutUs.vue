<template>
  <div class="top_header">
    <div class="header">
      <div
        class="card text-white bg-black mb-5 justify-content-center"
        style="height: 70px; width: 400px; position: absolute; margin-top: 14%"
      >
        <p class="headerText">About Us</p>
      </div>
      <img class="header_image" :src="require('@/assets/aboutus.png')" />
    </div>
  </div>

  <div class="body">
    <br />
    <p>
      We are a one-stop safety-centric portal for users in Singapore intending to travel to other countries amidst the COVID-19 
      pandemic. We provide updated protocols and statistics to help you plan your next trip. Look no further to connect with others to 
      share travel experiences and find travel buddies. Ultimately, we hope you can make more informed travel decisions and network with others. 

    </p>
    <b> Travel safe for yourself and your loved ones. </b>
  </div>
  <div id="footer">
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  name: "About Us",
  components: {
    Footer,
  },
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5%;
}

.header_image {
  width: 100%;
  height: 230px; 
}

.headerText {
  font-size: 30px;
  margin-top: 3%;
  text-align: center;
}

.header_text {
  position: absolute;
  text-align: center;
  width: 100%;
  font-size: 50px;
  margin-top: 25px;
  color: black;

  font-family: "Nunito";
  font-style: normal;
}

.body {
  text-align: center;
  margin-top: 50px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
  position: relative;
}

#footer {
  position: fixed;
  width: 100%;
  bottom: 0%;
}
</style>
