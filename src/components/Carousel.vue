<template>
  <div class="main">
    <carousel :items-to-show="2.5">
      <slide v-for="country in countries" :key="country">
        <div class="one-box">
          <a @click="goToCountry(country)">
            <img
              class="header_image"
              :src="getImgUrl(country.toLowerCase().split(' ').join('-'))"
            />
          </a>
          <br />
          <a
            @click="goToCountry(country)"
            style="text-align: center; font-size: 150%; cursor: pointer"
          >
            {{ country }}
          </a>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      countries: [
        "Australia",
        "Denmark",
        "Finland",
        "Malaysia",
        "South Korea",
        "United States",
        "United Kingdom",
      ],
      selected: "Select Destination",
    };
  },

  methods: {
    getImgUrl(country) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + country + ".png");
    },

    goToCountry(country) {
      this.$router.push({
        name: "Searched Country",
        params: { country: country },
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin-left: 5%;
  margin-right: 5%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
  border-radius: 3%;
}

.one-box {
  padding: 5%;
}
</style>
