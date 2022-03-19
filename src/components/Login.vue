<template>
<h1>ONE-STOP PORTAL FOR TRAVELLING AMIDST COVID-19</h1>
<div class = "login">
  <h2>Log In</h2>
  <div id = "firebaseui-auth-container"></div>
  <p>Don't have an account</p>
      <router-link to="/signup">Sign Up</router-link>
      <router-view/>
</div>
</template>

<script>
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

export default {
  name: "Login", 
  
  mounted() {
    // calling the ui instance
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiConfig = {
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
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

#firebaseui-auth-container{
  margin-top: 50px;
  margin-bottom: 50px;
}

</style>
