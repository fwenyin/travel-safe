<template>
  <div class="main">
    <div class="header">
      <h2 class="headerText">
        <hr />
        <br />
        ONE-STOP PORTAL <br />
        FOR TRAVELLING <br />
        AMIDST COVID-19 <br />
        <hr />
      </h2>
      <img class="headerImage" :src="require('@/assets/home.png')" alt="home" />
      <div class="search gap-5">
        <button
          class="btn btn-secondary dropdown-toggle btn-lg"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selected }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="option in countries" :key="option">
            <a class="dropdown-item" @click="selected = option">{{ option }}</a>
          </li>
        </ul>

        <button
          type="button"
          class="p-2 btn btn-primary col6 btn-lg"
          @click="goToCountry(selected)"
        >
          SEARCH
        </button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div class="stats">
      <div id="left">
        <div
          class="card text-white bg-black mb-5 justify-content-center"
          style="height: 50px"
        >
          <h4>COVID-19 Stringency Index</h4>
        </div>
        <GChart
          :data="stringency"
          :options="options"
          :settings="{ packages: ['geochart'] }"
          type="GeoChart"
        />
      </div>
      <div id="right">
        <h2><b>At a Glance</b></h2>
        <hr style="width: 40%" />
        <br />
        <br />
        <p>
          The COVID-19 situation is constantly evolving and knowing information
          on global news and statistics can help you make better travel
          decisions.
        </p>
        <div id="cases">
          <div
            class="card justify-content-center border-danger"
            id="total"
            style="height: 100px"
          >
            <h4 class="card-title" style="margin-top: 12px">
              {{ totalCases }}
            </h4>
            <p>GLOBAL TOTAL CASES</p>
          </div>
          <div
            class="card justify-content-center border-danger"
            id="new"
            style="height: 100px"
          >
            <h4 class="card-title" style="margin-top: 12px">{{ newCases }}</h4>
            <p>GLOBAL NEW CASES</p>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div>
      <h2><b>Keeping Up With COVID-19 News</b></h2>
      <hr style="width: 50%; margin-left: 25%" />
      <br />
      <br />
      <div
        class="card text-start mx-auto mb-2 p-2 justify-content-center"
        style="width: 65%"
        v-for="item in news"
        :key="item.id"
      >
        <h5 style="margin-top: 12px">
          <b>{{ item.title }}</b>
        </h5>
        <p style="font-size: 13px">
          {{ item.news_agency + " - " + item.time }}
        </p>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import {
  collection,
  getDocs,
  query,
  limit,
  getFirestore,
} from "firebase/firestore";
import { GChart } from "vue-google-charts";
import axios from "axios";

const db = getFirestore(firebaseApp);
const getCountryISO2 = require("country-iso-3-to-2");

export default {
  name: "Home",

  components: {
    GChart,
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
      news: [],
      stringency: [["Country", "Stringency Index"]],
      options: {
        chart: {},
        colorAxis: { colors: ["#4374e0", "#e7711c"] }, // orange to blue
      },
      totalCases: 0,
      newCases: 0,
    };
  },

  methods: {
    async displayNews() {
      let z = await getDocs(query(collection(db, "News"), limit(5)));
      z.forEach((doc) => {
        this.news.push(doc.data());
      });
    },
    // covid19 API data accurate to one day before current day
    getDate() {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 2);
      return currentDate.toISOString().slice(0, 10);
    },
    async displayMap() {
      let url =
        "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" +
        this.getDate() +
        "/" +
        this.getDate() +
        "";
      let received = await axios.get(url);
      let data = received.data.data[this.getDate()];
      console.log(data);
      Object.keys(data).forEach((key) => {
        let countryCode = getCountryISO2(data[key].country_code); // convert a country code ISO 3166-1 Alpha-3 to ISO 3166-1 Alpha-2
        if (typeof countryCode == "undefined") {
          return;
        }
        let stringencyIndex = data[key].stringency;
        this.stringency.push([countryCode, stringencyIndex]);
      });
    },

    async displayCovidStats() {
      let url = "https://api.covid19api.com/summary";
      let received = await axios.get(url);
      let data = received.data.Global;
      this.totalCases = data.TotalConfirmed;
      this.newCases = data.NewConfirmed;
      console.log(data.NewConfirmed);
    },

    display() {
      this.displayNews();
      this.displayMap();
      this.displayCovidStats();
    },

    goToCountry(country) {
      this.$router.push({ name: 'Searched Country', params: {country: country}})
    }

  },

  created() {
    this.display();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

* {
  font-family: "Nunito", sans-serif;
}

p {
  font-size: 16px;
}

hr {
  width: 21%;
  position: absolute;
  height: 3px;
}

h2 {
  color: #394f73;
}

.main {
  text-align: center;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  flex-direction: column;
}

.headerText {
  position: absolute;
  margin-top: 7%;
  padding-left: 10%;
  width: 100%;
  font-size: 33px;
  color: white;
}

.headerImage {
  width: 100%;
}

.search {
  margin-top: 29%;
  position: absolute;
  display: flex;
}

.btn-primary {
  background-color: #2f5ba3;
  width: 150px;
}

.btn-secondary {
  width: 300px;
  background-color: #8caccb;
}

.dropdown-menu {
  width: 300px;
  background-color: #aec4da;
}

.stats,
#cases {
  display: flex;
  align-items: center;
  padding: 30px;
}

#left {
  flex: 1.3;
}

#right,
#new,
#total {
  flex: 1;
  margin-left: 4%;
}
</style>
