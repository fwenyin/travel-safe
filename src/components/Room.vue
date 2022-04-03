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
          placeholder="Enter Group Name"
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
      <div class="card" style="width: 280px">
        <h5 class="card-header text-white">Groups You've Joined</h5>
        <div class="card-body">
          <div
            class="card bg-transparent mb-2 p-2 justify-content-center"
            id="joinedGroups"
            v-for="group in groups"
            :key="group"
          >
            <div class="right">
              <h6 style="margin-top: 4%">
                <b>{{ group.roomName }}</b>
              </h6>
              <p>
                {{ group.country }}
              </p>
            </div>
            <div class="left">
              <a
                :href="'/room/' + group.roomName"
                class="btn stretched-link"
                style="background-color: transparent"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <h5 class="card-header text-white">Suggested for you</h5>
      <div v-for="item in items" :key="item.roomName">
        <div
          class="card text-start mx-auto mb-2 p-3"
          v-if="filter(item)"
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
              @click="goToGroup(item)"
            >
              Join Group
            </button>
          </div>
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
  updateDoc,
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
      user: null,
      groups: [],
    };
  },

  methods: {
    filter(item) {
      console.log("item", item.roomName);
      console.log(this.groups.some((group) => group.roomName != item.roomName));
      return this.groups.some((group) => group.roomName != item.roomName);
    },

    async onSubmit() {
      if (this.items.some((x) => x.roomName == this.roomName)) { 
        alert("Group name already exists. Please enter another group name!")
        return;
      }
      
      await setDoc(doc(ref, this.roomName), {
        roomName: this.roomName,
        country: this.country,
      });
      this.groups.push({ roomName: this.roomName, country: this.country });
      await updateDoc(doc(db, "Users", this.user.uid), {
        groups: this.groups,
      });
      this.$router.push({ name: "Chat", params: { roomname: this.roomName } });
      this.roomName = "";
    },

    async display() {
      let y = await getDocs(collection(db, "Rooms"));
      let list = [];
      y.forEach((doc) => {
        list.push(doc.data());
      });
      this.items = list;
      console.log("stored list", this.items);
      let z = await getDocs(collection(db, "Users"));
      z.forEach((doc) => {
        if (auth.currentUser.uid == doc.data().userId) {
          this.groups = doc.data().groups;
          console.log("stored groups", this.groups);
        }
      });
    },

    async goToGroup(group) {
      if (this.groups.some((x) => x.roomName == group.roomName)) {
        this.$router.push({ name: "Chat", params: { roomname: group.roomName } });
      } else {
        this.groups.push({ roomName: group.roomName, country: group.country });
        await updateDoc(doc(db, "Users", this.user.uid), {
          groups: this.groups,
        });
      }
      this.$router.push({ name: "Chat", params: { roomname: group.roomName } });
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
  background-color: #61728c !important;
}

.card-header {
  background-color: #394f73 !important;
}

.card-body {
  background-color: #d0d6e8;
}

.body,
#groups,
#joinedGroups {
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
