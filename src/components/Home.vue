<template>
  <h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
  <div>
    <select v-model="selected">
      <option disabled value="">Select Destination</option>
      <option>Australia</option>
      <option>Denmark</option>
      <option>Finland</option>
      <option>Malaysia</option>
      <option>South Korea</option>
      <option>United States</option>
      <option>United Kingdom</option>
    </select>
    <button @click="goToCountry(selected)">SEARCH</button>
  </div>
  <h2>COVID-19 Stringency Index</h2>
  <div>
    <GChart :data = "stringency"
      :options = "options"
      :settings = "{ packages: ['geochart'] }"
      type = "GeoChart"/>
  </div>
  <h1>At a Glance</h1>
  <p>
    The COVID-19 situation is constantly evolving and knowing information on
    global news and statistics can help you make better travel decisions.
  </p>
  <h3>{{ totalCases }}</h3>
  <p>GLOBAL TOTAL CASES</p>
  <h3>{{ newCases }}</h3>
  <p>GLOBAL NEW CASES</p>
  <h1>Keeping Up With COVID-19 News</h1>
  <div v-for="item in news" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.news_agency + " - " + item.time }}</p>
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { collection, getDocs, query, limit, getFirestore } from "firebase/firestore";
import { GChart } from "vue-google-charts";
import axios from 'axios'
const db = getFirestore(firebaseApp);
const getCountryISO2 = require("country-iso-3-to-2");

export default {
  name: "Home",

  components: {
    GChart
  },

  data() {
    return {
      news: [],
      stringency: [['Country', 'Stringency Index']],
      options: { 
        chart: {},
        colorAxis: {colors: ['#4374e0', '#e7711c']} // orange to blue
      },
      totalCases: 0,
      newCases: 0
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
      let url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/' + this.getDate() + '/' + this.getDate() + '';
      let received  = await axios.get(url)
      let data = received.data.data[this.getDate()]
      Object.keys(data).forEach((key) => {
        let countryCode = getCountryISO2(data[key].country_code) // convert a country code ISO 3166-1 Alpha-3 to ISO 3166-1 Alpha-2
        if (typeof countryCode == 'undefined') {
          return;
        }
        let stringencyIndex = data[key].stringency
        this.stringency.push([countryCode, stringencyIndex])
      });
    },

    async displayCovidStats() {
      let url = 'https://api.covid19api.com/summary'
      let received  = await axios.get(url)
      let data = received.data.Global
      this.totalCases = data.TotalConfirmed
      this.newCases = data.NewConfirmed
      console.log(data.NewConfirmed)
    },

    display() {
      this.displayNews();
      this.displayMap();
      this.displayCovidStats();
    },

    // goToCountry(country) {

    // }

  },

  created() {
    this.display();
  },
};
</script>

<style>

</style>
