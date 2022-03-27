<template>
  <ForumHeader />
  <div id="threadPage">
    <div id="mainThread">
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
          <div id="countryContainer">
            <p id="countryText">{{ country }}</p>
          </div>
        </div>
      </div>
      <div class="bottomHalf">
        <div id="forumContent">
          <p id="forumDetailsText" class="displayText">{{ body }}</p>
        </div>
      </div>
    </div>
    <div class="comments" id="commentsDiv">
      <CommentBlock
        v-for="response in responses"
        :sender="response.sender"
        :commentDate="response.commentDate"
        :commentBody="response.commentBody"
        :key="response.key"
      ></CommentBlock>
    </div>
  </div>
</template>

<script>
import CommentBlock from "@/components/CommentBlock";
import ForumHeader from "@/components/ForumHeader";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  name: "ForumThread",
  components: {
    CommentBlock,
    ForumHeader,
  },
  data() {
    return {
      posts: [],
      id: this.$route.params.id,
      isValid: false,
      hasLiked: false,
      user: "",
      title: "",
      body: "",
      timestamp: "",
      likes: 0,
      country: "",
      responses: [],
      pressedLike: false,
      updatedLikeCount: 0,
    };
  },
  methods: {
    fetchItems: async function () {
      console.log("This is fetch items");
      let posts = await getDocs(collection(db, String("Posts")));
      console.log("ForumThread Fetched result is ", posts);
      let item = {};
      posts.forEach((doc) => {
        item = doc.data();
        if (this.id == item.id) {
          console.log("Post data is ", item);
          this.user = item.user;
          this.country = item.country;
          this.title = item.title;
          this.body = item.body;
          this.timestamp = item.timestamp;
          this.country = item.country;
          this.likes = item.likes;
          this.comments = item.comments;
          item.comments.responses.forEach((response) => {
            console.log("Pushing response: ", response);
            this.responses.push(response);
          });
          console.log("Post body is: " + this.country);
        }
      });
    },
    pressLike: function () {
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
    change() {
      this.updateLikeCount += 1;
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#mainThread {
  position: relative;
  align-items: left;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  width: 60%;
  height: 40vh;
  left: 20%;

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
  align-content: left;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;

  color: #000000;
}

#forumAuthorAndDate {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #5b5b5b;
}
#forumTitle {
  display: inline-block;
}

#countryContainer {
  position: absolute;
  justify-content: center;
  width: 20%;
  left: 70%;
  bottom: 68%;
  background: #dda375;
  border-radius: 20px;
}

#countryText {
  font-family: "Nunito";
  font-style: normal;
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
  /* overflow: auto; */

  width: 80%;
  height: 40%;
  left: 10%;
  top: 35%;
}
#commentsDiv {
  position: relative;
  width: 60%;
  height: fit-content;
  background-color: #ffffff;
  display: inline-block;

  max-height: 60%;
  padding: 2px;
  margin-top: 20px;
}
</style>
