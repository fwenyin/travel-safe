<template>
  <label for="roomname">Room Name</label>
  <input
    class="form-control"
    v-model="roomName"
    id="roomname"
    placeholder="Enter Room Name"
  />
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    id="dropdownMenuButton1"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {{ country }}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li v-for="option in countries" :key="option">
      <a class="dropdown-item" @click="country = option">{{ option }}</a>
    </li>
  </ul>
  <button type="submit" class="btn btn-primary" @click="onSubmit()">
    Create Group
  </button>
  <div
    class="card text-start mx-auto mb-2 p-2 justify-content-center"
    v-for="item in items"
    :key="item.roomName"
  >
    <h4>{{ item.roomName }}</h4>
    <p>{{ item.country }}</p>
    <button
      type="button"
      class="p-2 btn btn-primary col6 btn-lg"
      @click="goToGroup(item.roomName)"
    >
      Join Group
    </button>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { collection, getFirestore, setDoc, doc, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const ref = collection(db, "Rooms");

export default {
  name: "Room",

  data() {
    return {
      roomName: "",
      countries: [
        "Australia",
        "Denmark",
        "Finland",
        "Malaysia",
        "South Korea",
        "United States",
        "United Kingdom",
      ],
      country: "Select Destination",
      items: [],
    };
  },

  methods: {

    async onSubmit() {
      await setDoc(doc(ref, this.roomName), {
        roomName: this.roomName,
        country: this.country,
      });
      this.$router.push({ name: "Chat", params: { roomname: this.roomName } });
      this.roomName = ""
    },

    async display() {
      let z = await getDocs(collection(db, "Rooms"));
      z.forEach((doc) => {
        console.log(doc.data());
        this.items.push(doc.data());
      });
    },

    goToGroup(group) {
      this.$router.push({ name: "Chat", params: { roomname: group } });
    },
  },

  created() {
    this.display();
  },
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}

.btn-secondary {
  width: 300px;
  background-color: #8caccb;
}

.dropdown-menu {
  width: 300px;
  background-color: #aec4da;
}

.table {
  width: 96%;
  margin: 0 auto;
}
</style>
