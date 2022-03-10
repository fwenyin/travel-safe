<template>
  <h1>Global COVID-19 News</h1>
  <div v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.news_agency + " - " + item.time }}</p>
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      items: [],
    };
  },

  methods: {
    async display() {
      //const first = query(collection(db, "News"), limit(25));
      //let z = await getDocs(first)
      let z = await getDocs(collection(db, "News"));
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
