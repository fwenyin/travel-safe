<template>
<h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
<div class = "login">
  <h2>Log In</h2>
  <div class = "form1">
    <form @submit.prevent="Login">
      <label for="email">Email</label>
      <input type = "text" id = "email" placeholder="adambenjamin@gmail.com">
      <label for="password">Password</label>
      <input type = "password" id = "password" placeholder="Min. 8 characters">
      <button id="keepLoggedIn" type = "button">Keep me logged in</button>
      <div class = "loginButton">
        <button id="loginButton" type="button" v-on:click="getfromfs()">Log In</button>
      </div>
      <p>Dont have an account? <router-link to="/signup">Sign Up</router-link></p>
    </form>
  </div>
</div>
</template>

<script>
import {ref} from 'vue';
import firebase from '../src/firebase';

export default {
  setup() {
    const email = ref("");
    const password = ref("ref");

    const Login = () => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(data => console.log(data))
      .catch(error => alert(error.message));
    }
    return {
      Login,
      email,
      password
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
