<template>
  <h1>Global COVID-19 News</h1>
  <div>
    <p>Filter</p>
    <select v-model="selected">
      <option disabled value="">Select Destination</option>
      <option>All</option>
      <option>Australia</option>
      <option>Denmark</option>
      <option>Finland</option>
      <option>Malaysia</option>
      <option>South Korea</option>
      <option>United States</option>
      <option>United Kingdom</option>
    </select>
    <p> {{ selected }} </p>
    <p>Sort</p>
    <input type="radio" id="newest" value="newest" v-model="sorted">
    <label for="newest">Newest</label>
    <input type="radio" id="oldest" value="oldest" v-model="sorted">
    <label for="oldest">Oldest</label>
  </div>
  <div v-for="item in filter" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.news_agency + " - " + item.time }}</p>
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import firebaseApp from "./firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      items: [],
      selected: "",
      sorted: "",
    };
  },

  computed: {
    filter() {
      let z = this.items;
      if (this.selected === "") {
        return z.sort(function(a, b) {
          return Date.parse(b.time) - Date.parse(a.time)
        })
      }
      z = z.filter(article => article.country === this.selected);
      if (this.sorted === "oldest") {
        return z.sort(function(a, b) {
          return Date.parse(a.time) - Date.parse(b.time)
        })
      } else {
        return z.sort(function(a, b) {
          return Date.parse(b.time) - Date.parse(a.time)
        })
      }
    }
  },

  methods: {
    async display() {
      let z = await getDocs(collection(db, "News"));
      z.forEach((doc) => {
        console.log(doc.data());
        this.items.push(doc.data());
      });
    },
  },

  created() {
    this.display();
  },
};
</script>

<style></style>