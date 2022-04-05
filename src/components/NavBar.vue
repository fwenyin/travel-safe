<template>
  <nav class="navbar navbar-expand-lg">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        v-if="user"
      >
        <a class="nav-icon" href="/home">
          <img
            style="width: 20%; height: 15%"
            :src="require(`../assets/logo.png`)"
        /></a>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="text-align: center">
          <!-- <img style= "width:15%;height:15%;" :src="require(`../assets/logo.png`)" /> -->
          <li class="nav-item">
            <a
              class="nav-link"
              style="padding-left: 5em; font-size: 18px"
              href="/home"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              style="padding-left: 2em; font-size: 18px"
              href="/news"
              >News</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              style="padding-left: 2em; font-size: 18px"
              href="/room"
              >Travel Buddies</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              style="padding-left: 2em; font-size: 18px"
              href="/forumpage"
              >Forum</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              style="padding-left: 2em; font-size: 18px"
              href="/aboutus"
              >About Us</a
            >
          </li>
        </ul>
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="d-flex align-items-center" v-if="user">
        <!-- Icon -->
        <a class="me-5" style="color: aliceblue">
          {{ userDetails.userName }}
        </a>

        <!-- Avatar -->
        <div class="dropdown">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div id="navImg" class="rounded-circle"></div>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item" href="/profile">Profile</a>
            </li>
            <li>
              <a class="dropdown-item" href="/" @click="signOut()">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "NavBar",

  data() {
    return {
      user: false,
      refreshComp: 0,
      userDetails: [],
      picture: "",
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      // console.log(user.displayName);
      // console.log("user has been signed out");
    },
    async display() {
      let z = await getDocs(collection(db, "Users"));
      let item = [];
      z.forEach((doc) => {
        //console.log(auth.currentUser.uid == doc.data().userId);
        item = doc.data();
        console.log(item);
        if (auth.currentUser.uid == doc.data().userId) {
          console.log("found current user");
          this.userDetails = doc.data();
          this.displayImage(this.userDetails.picture);
        }
      });
    },
    displayImage(pictureURL) {
      let divLoc = document.getElementById("navImg");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style =
        "margin: 0px auto; width: 25px; height: 25px; border-radius: 50%;";
      divLoc.append(img);
      console.log("rendering image");
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.display();
  },
};
</script>

<style>
.navbar {
  background-color: #8caccb;
}

.navbar .nav-item .nav-link {
  color: aliceblue;
}
</style>
