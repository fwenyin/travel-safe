<template>
  <NavBar />
  <br />
  <br />
  <br />
  <div class="container-xl px-4 mt-4">
    <h3>{{ userDetails.name }}'s Profile</h3>
    <hr class="mt-0 mb-4" />
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div id="imgDiv" class="card-body text-center"></div>
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
                <p id="currUsername" class="form-control">
                  {{ userDetails.userName }}
                </p>
              </div>
              <!-- Full Name -->
              <div class="mb-3">
                <label class="small mb-1">Full Name</label>
                <p id="currName" class="form-control">
                  {{ userDetails.name }}
                </p>
              </div>
              <!-- Form Group (email address)-->
              <div class="mb-3">
                <label class="small mb-1">Email Address</label>
                <p id="currEmail" class="form-control">
                  {{ userDetails.email }}
                </p>
              </div>
              <!-- Form Row-->
              <div class="row gx-3 mb-3">
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputPhone"
                    >Phone number</label
                  >
                  <p id="currPhone" class="form-control">
                    {{ userDetails.phone }}
                  </p>
                </div>
                <!-- Form Group (birthday)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputBirthday"
                    >Date of Birth</label
                  >
                  <p id="currDOB" class="form-control">
                    {{ userDetails.DOB }}
                  </p>
                </div>
              </div>
              <!-- Save changes button-->
              <a class="btn btn-primary" href="/editprofile">
                Edit Profile Here
              </a>
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
import { getDocs, getFirestore, collection } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const auth = getAuth();
console.log("in Profile");

export default {
  name: "Profile",

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

    displayImage(pictureURL) {
      let divLoc = document.getElementById("imgDiv");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style =
        "margin: 0px auto; width: 30%; height: 30%; border-radius: 50%;";
      divLoc.append(img);
      console.log("rendering image");
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
