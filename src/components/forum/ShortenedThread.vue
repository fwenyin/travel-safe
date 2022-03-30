<template>
  <div id="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topHalf">
      <div id="buttonsDiv">
        <p id="likeButton" class="fa fa-thumbs-up" @click="pressLike()"></p>
        <p id="likeCounter" v-if="pressedLike">{{ updatedLikeCount }}</p>
        <p id="likeCounter" v-else>{{ likes }}</p>
      </div>

      <div id="forumHeader">
        <div id="authorAndDate">
          <p id="forumAuthorAndDate" class="displayText">
            Posted by @{{ user }} - {{ timestamp }}
          </p>
        </div>
        <div id="forumTitle" class="displayText">{{ title }}</div>
      </div>
      <div id="countryBox">
        <div id="countryContainer">
          <p id="countryText">{{ country }}</p>
        </div>
      </div>
    </div>
    <div class="bottomHalf">
      <div id="forumContent">
        <p id="forumDetailsText" class="displayText">{{ body }}</p>
      </div>
      <div id="viewFullPost">
        <router-link :to="'/ForumThread/' + this.id"
          >View full post</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "ShortenedThread",
  data() {
    return {
      posts: [],
      hasLiked: false,
      updatedLikeCount: 0,
      pressedLike: false,
    };
  },
  props: {
    id: Number,
    user: String,
    title: String,
    body: String,
    timestamp: String,
    country: String,
    likes: Number,
  },
  methods: {
    pressLike() {
      const docRef = doc(db, "Posts", this.id + "");
      this.pressedLike = true;
      console.log("Current post id is ", this.id);

      if (!this.hasLiked) {
        document.getElementById("likeButton").style.color = "green";
        this.hasLiked = true;
        this.updatedLikeCount = parseInt(this.likes) + 1;
      } else {
        document.getElementById("likeButton").style.color = "#808080";
        this.hasLiked = false;
        this.updatedLikeCount = parseInt(this.likes);
      }
      updateDoc(docRef, { likes: parseInt(this.updatedLikeCount) });
      console.log("Updated like count is ", this.updatedLikeCount);
    },
  },
};
</script>

<style scoped>
#main {
  position: relative;
  align-items: left;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  width: 60vw;
  height: 30vh;

  background: #aec4da;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

.topHalf {
  display: flex;
}

#buttonsDiv {
  display: inline-block;
  width: 10%;
  padding: 5% 0 0 0;
}

#likeButton {
  margin-left: 40%;
}

#likeCounter {
  margin: 10%;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: #5b5b5b;
}

#forumHeader {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  color: black;
}

#forumAuthorAndDate {
  font-weight: 400;
  font-size: 16px;
  color: #5b5b5b;
}
#forumTitle {
  align-items: left;
}

#countryBox {
  position: absolute;
  height: 40%;
  width: 40%;
  padding: 2% 0 0 0;
  left: 60%;
}

#countryContainer {
  text-align: center;
  height: 60%;
  width: 40%;
  margin-left: 40%;
  background: #dda375;
  border-radius: 20px;
}

#countryText {
  padding-top: 5%;
  font-family: "Nunito";
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
}
.bottomHalf {
  display: flex;
  flex-direction: column;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: black;
}

#forumDetailsText {
  position: absolute;
  overflow: hidden;
  width: 80%;
  height: 40%;
  left: 10%;
  top: 35%;
}
#viewFullPost {
  position: absolute;
  bottom: 5%;
  right: 1%;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-decoration-line: underline;
  color: #5b5b5b;
}
</style>
