<template>
  <router-view />
</template>

<script>
console.log("in App");
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseApp from "../src/firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "App",
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
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        const uid = user.uid;
        const email = user.email;
        const name = user.displayName;
        const picture = user.photoURL;
        const userName = "username";
        const phone = "-";
        const DOB = "-";

        console.log("check if user is already in data base");
        getDoc(doc(db, "Users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            return;
          } else {
            console.log("user does not exist in db");
            try {
              const docRef = setDoc(doc(db, "Users", user.uid), {
                userId: uid,
                email: email,
                name: name,
                picture: picture,
                userName: userName,
                phone: phone,
                DOB: DOB,
              });
              console.log(docRef);
            } catch (error) {
              console.error("Error adding user into docs", error);
            }
          }
        });

        // console.log(uid);
        // console.log(email);
        // console.log(name);
        // console.log(picture);
      }
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');

#app {
  font-family: 'Nunito', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
