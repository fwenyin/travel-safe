<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Nunito"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
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
              style="padding-left: 8em; font-size: 18px"
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
              href="/aboutus"
              >About Us</a
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
        </ul>
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="d-flex align-items-center" v-if="user">
        <!-- Icon -->
        <a class="me-5" style="color: aliceblue"> {{ user.displayName }} </a>

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
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              class="rounded-circle"
              height="25"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
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

export default {
  name: "NavBar",
  data() {
    return {
      user: false,
      refreshComp: 0,
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
      console.log(user.displayName);
      console.log("user has been signed out");
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
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
