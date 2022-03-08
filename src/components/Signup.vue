<template>
<h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
<div class = "signup">
  <h2>Sign Up</h2>
  <div class = "signupform">
    <form @submit.prevent="SignUp" id="signupForm">
      <label for="username">Username</label>
      <input type = "text" id = "username" placeholder="avid_traveller123">
      <label for="email">Email</label>
      <input type = "text" id = "email" placeholder="adambenjamin@gmail.com">
      <label for="password">Password</label>
      <input type = "password" id = "password" placeholder="Min. 8 characters">
      <button id="keepLoggedIn" type = "button">Keep me logged in</button>
      <div class = "signUpButton">
        <button id="signUpButton" type="button" v-on:click="savetofs()">Sign Up</button>
      </div>
      <p>Already have an account? <router-link to="/login">Log In</router-link></p>
    </form>
  </div>
</div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async savetofs() {
            var a = document.getElementById("username").value;
            var b = document.getElementById("email").value;
            var c = document.getElementById("password").value;
            alert("Saving account details for: " + a);

            try {
                const docRef = await setDoc(doc(db, "Users", a), {
                    Username: a, Email: b, Password: c
                })
                console.log(docRef)
                document.getElementById('signupForm').reset();
                this.$emit("account registered")

            }
            catch(error) {
                console.error("Error registering account: ", error);
            }
        }
    }
}
</script>

<style>

</style>