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
  <NavBar />
  <br />
  <br />
  <br />
  <div class="container-xl px-4 mt-4">
    <h3>Edit Your Profile Here</h3>
    <hr class="mt-0 mb-4" />
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div id = "imgDiv" class="card-body text-center" >
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
                  />
                </div>
                <!-- Form Group (birthday)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputBirthday">Birthday</label>
                  <input
                    class="form-control"
                    id="inputBirthday"
                    type="text"
                    name="birthday"
                    placeholder="Enter date of birth here"
                    v-model="DOB"
                  />
                </div>
              </div>
              <!-- Save changes button-->
              <a class="btn btn-primary" @click="submit()" href="/profile"> Save Details </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
// import { getStorage,ref } from "firebase/storage";
// import { getStorage,ref, getDownloadURL} from "firebase/storage";

// import firebase from 'firebase';

const db = getFirestore(firebaseApp);
const auth = getAuth();
console.log("in EditProfile");

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
    };
  },

  components: {
    NavBar,
  },

  methods: {
    change() {
      this.refreshComp += 1;
    },
    // onChange(e) {
    //   const file = e.target.files[0];
    //   this.image = file;

    //   const storage = getStorage();

    //   const storageRef=ref(storage,"Users/" + auth.currentUser.uid + "/picture/" + this.image.name);
    //   // ()=>{
    //   //   storageRef.ref.getDownloadURL().then((url)=>{
    //   //     this.imageUrl=url;
    //   //   })
    //   // }
       
    //   getDownloadURL(storageRef).then((res) => (this.imageUrl = res));
    // },
    displayImage(pictureURL) {
      let divLoc = document.getElementById("imgDiv");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style = "margin: 0px auto; width: 30%; height: 30%; border-radius: 50%;"
      divLoc.append(img);
      console.log("rendering image")
    },

    async display() {
      console.log("Fetching user data");
      let z = await getDocs(collection(db, "Users"));
      let item = [];
      z.forEach((doc) => {
        //console.log(auth.currentUser.uid == doc.data().userId);
        item = doc.data();
        console.log(item);
        if (auth.currentUser.uid == doc.data().userId) {
          console.log("found current user");
          this.userDetails = doc.data();
          console.log("here", this.userDetails.picture);
          this.displayImage(this.userDetails.picture);
        }
      });
    },

    async submit() {
      console.log("Submitting new user data");
      var userDetails = {
        DOB: this.DOB,
        email: this.email,
        name: this.name,
        phone: this.phone,
        picture: auth.currentUser.photoURL,
        userId: auth.currentUser.uid,
        userName: this.userName,
      };
      console.log(this.picture);

      await setDoc(doc(db, "Users", auth.currentUser.uid), userDetails);
      console.log("User details updated");
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
