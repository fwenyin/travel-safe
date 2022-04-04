<template>
  <div class="top_header">
    <div class="header">
      <div
        class="card text-white bg-black mb-5 justify-content-center"
        style="height: 70px; width: 500px; position: absolute; margin-top: 14%"
      >
        <p class="headerText">About Us</p>
      </div>
      <img class="header_image" :src="require('@/assets/aboutus.png')">
    </div>
  </div>

  <div class="body">
    <br>
    <p> We are a one-stop portal for those in Singapore intending to travel to other countries amidst the COVID-19 pandemic. We provide updated protocols and statistics to help you plan your next travel. </p>
    <b> Travel safe for yourself and your loved ones. </b>
  </div>
</template>

<script>
export default {

}
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
  height: 230px; /* 400px */
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

  font-family: 'Nunito';
  font-style: normal;

}

.body {
  text-align: center;
  margin-top: 50px;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 41px;
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
  height: 280px;
}

</style>