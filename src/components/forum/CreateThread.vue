<template>
  <div id="mainContainer">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="iconDiv">
      <!-- profile pic here -->
      <!-- <img
        id="userIcon"
        :src="require('@/assets/profilephoto.png')"
        alt="home"
      /> -->
      <div id="userIcon" class="rounded-circle"></div>
    </div>
    <div id="titleContainer">
      <input
        id="forumTitle"
        type="text"
        placeholder="Title"
        v-model="title"
        required
      />
    </div>
    <div id="contentContainer">
      <input id="forumContent" type="text" placeholder="Text" v-model="body" />
    </div>
    <div id="selectCountry">
      <label for="countries">Select country: </label>
      <select
        id="countries"
        name="countries"
        class="btn btn-secondary dropdown-toggle text-black"
        @change="saveCountry($event)"
      >
        <option value="None">None</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Finland">Finland</option>
        <option value="Australia">Australia</option>
        <option value="Denmark">Denmark</option>
        <option value="United States">United States</option>
        <option value="South Korea">South Korea</option>
        <option value="United Kingdom">United Kingdom</option>
      </select>

      <input
        id="submitButton"
        class="p-0 btn btn-primary col6"
        type="submit"
        @click="submit()"
      />
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "CreateThread.vue",
  data() {
    return {
      postCounter: "",
      title: "",
      body: "",
      country: "",
      user: "",
      validTitle: false,
      validBody: false,
      validCountry: false,
      displayName: "",
      userDetails: [],
    };
  },
  methods: {
    saveCountry(event) {
      this.validCountry = true;
      this.country = event.target.value;
    },
    async display() {
      let z = await getDocs(collection(db, "Users"));
      // let item = [];
      z.forEach((doc) => {
        //console.log(auth.currentUser.uid == doc.data().userId);
        // item = doc.data();
        // console.log(item);
        if (auth.currentUser.uid == doc.data().userId) {
          // console.log("found current user");
          this.userDetails = doc.data();
          this.displayImage(this.userDetails.picture);
          this.user = this.userDetails.userName;
          // console.log(this.user);
        }
      });
    },
    displayImage(pictureURL) {
      let divLoc = document.getElementById("userIcon");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style =
        "margin: 0px auto; width: 50px; height: 50px; border-radius: 50%;";
      divLoc.append(img);
      // console.log("rendering image");
      // console.log(this.user);
    },

    async submit() {
      if (!this.validTitle || !this.validBody || !this.validCountry) {
        alert("Please fill in the necessary fields");
      } else {
        var updatedCounter = parseInt(this.postCounter) + 1;
        var post = {
          id: updatedCounter,
          user: this.userDetails.userName + "",
          title: this.title,
          body: this.body,
          timestamp: new Date().toString().slice(0, 24),
          likes: 0,
          country: this.country + "",
          comments: {
            comment_count: 0,
            responses: {
              commentBody: "",
              commentDate: "",
              sender: "",
            },
          },
        };
        await setDoc(doc(db, "Posts", updatedCounter + ""), post);
        this.postCounter = updatedCounter + "";
        location.reload();
      }
    },
    async getCounter() {
      let z = await getDocs(collection(db, "Posts"));
      z.forEach((doc) => {
        this.postCounter = doc.data().id;
      });
    },
  },
  watch: {
    title: function (val) {
      if (val === "") {
        this.validTitle = false;
      } else {
        this.validTitle = true;
      }
    },
    body: function (val) {
      if (val === "") {
        this.validBody = false;
      } else {
        this.validBody = true;
      }
    },
  },
  created() {
    this.getCounter();
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = this.userDetails.userName;
        // console.log(this.user);
      }
    });
    this.display();
  },
};
</script>

<style scoped>
#mainContainer {
  position: relative;
  margin-top: 2em;
  width: 60vw;
  height: 35vh;

  background: #aec4da;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#userIcon {
  position: absolute;
  size: 50px;
  width: 50px;
  height: 50px;
  left: 5%;
  top: 12%;
  border-radius: 1000px;
}

#forumTitle {
  position: absolute;
  width: 70%;
  height: 20%;
  left: 20%;
  top: 10%;
  background: #ffffff;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}
.btn-primary {
  position: relative;
  margin-bottom: 5%;
  background-color: #2f5ba3;
  padding-top: 25%;
  height: 35%;
  width: 15%;
}
.btn-secondary {
  margin-left: 3%;
  bottom: 72%;
  width: 32%;
  background-color: #8caccb !important;
}
.dropdown-menu {
  width: 300px;
  background-color: #aec4da !important;
}

#forumContent {
  position: absolute;
  width: 70%;
  height: 40%;
  left: 20%;
  top: 40%;

  background: #ffffff;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#selectCountry {
  position: absolute;
  width: 60%;
  height: 40%;
  left: 20%;
  top: 85%;
}

#countries {
  position: absolute;
  left: 20%;
}
#submitButton {
  position: absolute;
  left: 115%;
  bottom: 42%;
}
</style>
