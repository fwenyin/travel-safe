<template>
  <NavBar />
  <div class="container-xl px-4 mt-4">
    <h3>Edit Your Profile Here</h3>
    <hr class="mt-0 mb-4" />
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div id="imgDiv" class="card-body text-center">
            <!-- <div>
              <div>
                <p>Upload an image to Firebase:</p>
                <input type="file" accept="image/*" @change="onChange" />
              </div>
            </div>
            <div v-if="imageData != null">
              <img class="preview" :src="picture" />
              <br />
              <button @click="onUpload">Upload</button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Account Details</div>
          <div class="card-body">
            <form>
              <!-- Username -->
              <div class="mb-3">
                <label class="small mb-1">Username</label>
                <input
                  class="form-control"
                  id="inputUsername"
                  type="username"
                  placeholder="Enter username here"
                  v-model="userName"
                  required
                />
              </div>
              <!-- Full Name -->
              <div class="mb-3">
                <label class="small mb-1">Full Name</label>
                <input
                  class="form-control"
                  id="inputName"
                  type="name"
                  placeholder="Enter full name Here"
                  v-model="name"
                  required
                />
              </div>
              <!-- Form Group (email address)-->
              <div class="mb-3">
                <label class="small mb-1">Email Address</label>
                <input
                  class="form-control"
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Enter email address here"
                  v-model="email"
                  required
                />
              </div>
              <!-- Form Row-->
              <div class="row gx-3 mb-3">
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputPhone"
                    >Phone number</label
                  >
                  <input
                    class="form-control"
                    id="inputPhone"
                    type="tel"
                    placeholder="Enter phone number here"
                    v-model="phone"
                    required
                  />
                </div>
                <!-- Form Group (birthday)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputBirthday">Birthday</label>
                  <input
                    class="form-control"
                    id="inputBirthday"
                    type="date"
                    name="birthday"
                    placeholder="Enter date of birth here"
                    v-model="DOB"
                    required
                  />
                </div>
              </div>
              <br />
              <!-- Save changes button-->
              <a class="btn btn-danger btn-sm active" @click="submit()">
                Save Details
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br /><br />
  <Footer />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "../components/Footer.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import {
  getFirestore,
  // setDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
// import { getStorage,ref } from "firebase/storage";
// import { getStorage,ref, getDownloadURL} from "firebase/storage";

// import firebase from 'firebase';

const db = getFirestore(firebaseApp);
const auth = getAuth();
// console.log("in EditProfile");

// Create a root reference
// const storage = getStorage();
// const storageRef = ref(storage, 'Users/' + auth.currentUser.uid + '/picture');
// console.log(storageRef)

export default {
  name: "EditProfile",

  data() {
    return {
      user: false,
      refreshComp: 0,
      userDetails: [],
      DOB: "",
      email: "",
      name: "",
      phone: "",
      picture: "",
      userId: "",
      userName: "",
      validUsername: false,
      validFullname: false,
      validEmail: false,
      validPhone: false,
      validBirthday: false,
    };
  },

  components: {
    NavBar,
    Footer,
  },
  watch: {
    userName: function (val) {
      if (val === "") {
        this.validUsername = false;
      } else {
        this.validUsername = true;
      }
    },
    name: function (val) {
      if (val === "") {
        this.validFullname = false;
      } else {
        this.validFullname = true;
      }
    },
    email: function (val) {
      if (val === "") {
        this.validEmail = false;
      } else {
        this.validEmail = true;
      }
    },
    phone: function (val) {
      if (val === "") {
        this.validPhone = false;
      } else {
        this.validPhone = true;
      }
    },
    DOB: function (val) {
      if (val === "") {
        this.validBirthday = false;
      } else {
        this.validBirthday = true;
      }
    },
  },

  methods: {
    change() {
      this.refreshComp += 1;
    },

    displayImage(pictureURL) {
      let divLoc = document.getElementById("imgDiv");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style =
        "margin: 0px auto; width: 30%; height: 30%; border-radius: 50%;";
      divLoc.append(img);
      console.log("rendering image");
    },

    async display() {
      let z = await getDocs(collection(db, "Users"));
      let item = [];
      z.forEach((doc) => {
        //console.log(auth.currentUser.uid == doc.data().userId);
        item = doc.data();
        console.log(item);
        if (auth.currentUser.uid == doc.data().userId) {
          this.userDetails = doc.data();
          this.displayImage(this.userDetails.picture);
        }
      });
    },

    async submit() {
      if (
        !this.validUsername ||
        !this.validFullname ||
        !this.validEmail ||
        !this.validPhone ||
        !this.validBirthday
      ) {
        alert("Please fill in all the necessary fields");
      } else {
        console.log("Submitting new user data");
        var userDetails = {
          DOB: this.DOB,
          email: this.email,
          name: this.name,
          phone: this.phone,
          userName: this.userName,
        };
        await updateDoc(doc(db, "Users", auth.currentUser.uid), userDetails);
        console.log("User details updated");
        alert("Your Profile Is Successfully Updated");
      }
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

<style></style>
