<template>
  <h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
  <h1>At a Glance</h1>
  <p>
    The COVID-19 situation is constantly evolving and knowing information on
    global news and statistics can help you make better travel decisions.
  </p>
  <h1>Keeping Up With COVID-19 News</h1>
  <div v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.news_agency + " - " + item.time }}</p>
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import firebaseApp from "./firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, limit } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      items: [],
    };
  },

  methods: {
    async display() {
      let z = await getDocs(query(collection(db, "News"), limit(5)));
      z.forEach((doc) => {
        console.log(doc.data());
        this.items.push(doc.data());
        console.log(this.items);
      });
    },
  },

  created() {
    this.display();
  },
};
</script>

<style></style>
