<template>
  <div class="top_header">
    <div class="header">
      <h2 class="header_text">
          <hr style="width:25%; font-weight: bold; align:center; margin:auto;"/>
          <br />
          ABOUT US<br />
          <br />
          <hr style="width:25%; font-weight: bold; align:center; margin:auto;" />
      </h2>
      <img class="header_image" :src="require('@/assets/aboutus.png')">
    </div>
  </div>

  <div class="body">
    <p> We are a one-stop portal for those in Singapore intending to travel to other countries amidst the COVID-19 pandemic. By presenting the COVID-19 statistics and travel advisories of other countries, we hope that this portal can help others make better informed travel decisions. </p>
    <b> Travel safe for yourself and your loved ones. </b>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.header_image {
  width: 100%;
  height: 400px;
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
}

</style>