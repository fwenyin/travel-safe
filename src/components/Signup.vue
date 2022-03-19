<template>
<!-- <h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
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
      <p>Already have an account? <router-link to="/">Log In</router-link></p>
    </form>
  </div>
</div> -->

<head>
<link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet'>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
      <img src="https://t4.ftcdn.net/jpg/04/41/71/55/360_F_441715520_tVOReRBE2YdytMuDCrIl7O7vES29Otl9.jpg" />
      <h1 style="font-weight:bold; font-family: 'Nunito';">ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>

      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <div class = "signup">
          <br/>
          <h3 style="font-weight:bold; font-family: 'Nunito';">Sign Up with TravelSafe</h3>


          <div class = "signupform">
            <form @submit.prevent="SignUp" id="signupForm">
              <!-- <label for="username">Username</label>
              <input type = "text" id = "username" placeholder="avid_traveller123">
              <br><br>
              <label for="email">Email</label>
              <input type = "text" id = "email" placeholder="adambenjamin@gmail.com">
              <br><br>
              <label for="password">Password</label>
              <input type = "password" id = "password" placeholder="Min. 8 characters">
              <br><br>
              <div class = "signUpButton">
                <button id="signUpButton" type="button" v-on:click="savetofs()">Sign Up</button>
              </div> -->
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>

            </form>
          </div>



          <h5 style="font-family: 'Nunito';">Already have an account?  <router-link to="/">Login</router-link><router-view/> </h5> 
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  name: "Signup",
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
.signup {
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  border-radius: 15px;

  box-shadow: rgba(74, 79, 97, 0.25) 0px 13px 27px -5px, rgba(74, 79, 97, 0.3) 0px 8px 16px -8px;
  /* background-color:#c9d1dd; */
  padding: 20px 35px 35px 35px;
  width:100%;
  height: 100%;
  /* text-align: center; */
}

#signupform{
  margin-top: 10%;
  margin-bottom: 10%;

}
</style>