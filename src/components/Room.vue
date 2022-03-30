<template>
  <div class="header">
    <img class="headerImage" :src="require('@/assets/rooms.png')" alt="home" />
    <div
      class="card text-white bg-black mb-5 justify-content-center"
      style="height: 70px; width: 400px; position: absolute; margin-top: 5%"
    >
      <p class="headerText">Travel Buddies</p>
    </div>
  </div>
  <div class="body">
    <div class="left">
      <div class="card text-white mb-5" style="width: 280px">
        <h5 class="card-header">Create Group</h5>
        <input
          class="form-control"
          v-model="roomName"
          id="roomname"
          placeholder="Enter Room Name"
        />
        <div class="card-body">
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
              <a class="dropdown-item" @click="country = option">{{
                option
              }}</a>
            </li>
          </ul>
          <button
            type="submit"
            class="btn btn-dark mt-4 float-right"
            @click="onSubmit()"
          >
            + Create
          </button>
        </div>
      </div>
      <div class="card text-white" style="width: 280px">
        <h5 class="card-header">Groups You've Joined</h5>
        <div class="card-body"></div>
      </div>
    </div>
    <div class="right">
      <h5 class="card-header text-white">Suggested for you</h5>
      <div
        class="card text-start mx-auto mb-2 p-3 justify-content-center"
        v-for="item in items"
        :key="item.roomName"
        id="groups"
      >
        <div class="right">
          <h5>
            <b>{{ item.roomName }}</b>
          </h5>
          <div id="countryContainer">
            {{ item.country }}
          </div>
        </div>
        <div class="left">
          <button
            type="button"
            class="p-2 btn btn-dark col6 float-right"
            @click="goToGroup(item.roomName)"
          >
            Join Group
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
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
      user: null, // add current user
    };
  },

  methods: {
    async onSubmit() {
      await setDoc(doc(ref, this.roomName), {
        roomName: this.roomName,
        country: this.country,
      });
      this.$router.push({ name: "Chat", params: { roomname: this.roomName } });
      this.roomName = "";
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

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.display();
  },
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3%;
}

.headerText {
  font-size: 30px;
  margin-top: 4%;
  text-align: center;
}

.headerImage {
  width: 100%;
}

.dropdown-menu {
  width: 240px;
  background-color: #aec4da !important;
}

.btn-secondary {
  width: 240px;
  background-color: #8caccb !important;
}

.card-header {
  background-color: #394f73 !important;
}

.card-body {
  background-color: #aec4da;
}

.body,
#groups {
  display: flex;
  flex-direction: row;
}

#groups {
  align-items: center;
}

.left {
  flex: 1;
  margin-left: 5%;
}

.right {
  flex: 3;
  margin-right: 5%;
}

#countryContainer {
  text-align: center;
  padding: 3px;
  margin: 2px;
  width: 25%;
  background: #dda375;
  border-radius: 50px;
}
</style>
