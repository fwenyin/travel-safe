<template>
  <div id="mainContainer">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="iconDiv">
      <img
        id="userIcon"
        :src="require('@/assets/profilephoto.png')"
        alt="home"
      />
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
      <select id="countries" name="countries" @change="saveCountry($event)">
        <option value="None">None</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Finland">Finland</option>
        <option value="Australia">Australia</option>
        <option value="Denmark">Denmark</option>
        <option value="United States">United States</option>
        <option value="South Korea">South Korea</option>
        <option value="United Kingdom">United Kingdom</option>
      </select>
      <input id="submitButton" type="submit" @click="submit()" />
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
const db = getFirestore(firebaseApp);

export default {
  name: "CreateThread.vue",
  data() {
    return {
      postCounter: "",
      title: "",
      body: "",
      country: "",
      validTitle: false,
      validBody: false,
    };
  },
  methods: {
    saveCountry(event) {
      console.log("Saving country ", event.target.value);
      this.country = event.target.value;
    },

    async submit() {
      console.log("This is submit function ");
      if (!this.validTitle || !this.validBody) {
        alert("Please fill in the necessary fields");
      } else {
        console.log("Else part");
        var updatedCounter = parseInt(this.postCounter) + 1;
        var post = {
          id: updatedCounter,
          user: "Bandy",
          title: this.title,
          body: this.body,
          timestamp: new Date().toDateString(),
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
        console.log(this.postCounter + " --> " + updatedCounter);
        this.postCounter = updatedCounter + "";
        console.log("new count: " + this.postCounter);
        alert("Pushing to firestore ");
        location.reload();
      }
    },
    async getCounter() {
      let z = await getDocs(collection(db, "Posts"));
      z.forEach((doc) => {
        this.postCounter = doc.data().id;
      });
      console.log("Lastest post id is ", this.postCounter);
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
};
</script>

<style scoped>
#mainContainer {
  position: relative;
  margin-top: 2em;
  width: 60vw;
  height: 30vh;

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
  top: 9%;
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
}
</style>
