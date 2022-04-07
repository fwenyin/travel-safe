<template>
  <NavBar />
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

          <p id="commentButton" class="fa fa-comment"></p>
          <p id="commentCounter">{{ commentCount }}</p>
        </div>

        <div id="forumHeader" class="normalText">
          <div id="authorAndDate">
            <p id="forumAuthorAndDate" class="displayText">
              Posted by @{{ poster }} - {{ timestamp }}
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

        <div id="addCommentDiv">
          <div class="commentSection">
            <input
              id="addComment"
              type="text"
              placeholder="Add a comment"
              v-model="commentBody"
            />
            <p
              id="submitComment"
              class="fa fa-mail-reply"
              @click="submitComment()"
              value="reset"
            ></p>
          </div>
          <div id="iconDiv">
            <div id="userIcon"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="commentsDiv">
      <div class="innerDiv">
        <CommentBlock
          v-for="response in sortComments"
          :sender="response.sender"
          :commentDate="response.commentDate"
          :commentBody="response.commentBody"
          :key="response.key"
        ></CommentBlock>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <Footer />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CommentBlock from "../components/forum/CommentBlock.vue";
import ForumHeader from "../components/forum/ForumHeader.vue";
import firebaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer.vue";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "ForumThread",
  components: {
    NavBar,
    CommentBlock,
    ForumHeader,
    Footer,
  },
  data() {
    return {
      docRef: {},
      posts: [],
      id: this.$route.params.id,
      hasLiked: false,
      poster: "",
      title: "",
      body: "",
      timestamp: "",
      likes: 0,
      country: "",
      responses: [],
      pressedLike: false,
      updatedLikeCount: 0,
      commentCount: 0,
      commentBody: "",
      validComment: "",
      sender: "",
    };
  },
  methods: {
    async fetchItems() {
      let posts = await getDocs(collection(db, String("Posts")));
      let item = {};
      posts.forEach((doc) => {
        item = doc.data();
        if (this.id == item.id) {
          this.poster = item.user;
          this.country = item.country;
          this.title = item.title;
          this.body = item.body;
          this.timestamp = item.timestamp;
          this.country = item.country;
          this.likes = item.likes;
          this.comments = item.comments;
          if (item.comments.comment_count > 0) {
            this.commentCount = item.comments.comment_count;
            item.comments.responses.forEach((response) => {
              this.responses.push(response);
            });
          }
        }
      });
    },
    pressLike() {
      const docRef = doc(db, "Posts", this.id + "");
      this.pressedLike = true;
      if (!this.hasLiked) {
        document.getElementById("likeButton").style.color = "green";
        this.hasLiked = true;
        this.updatedLikeCount = parseInt(this.likes) + 1;
      } else {
        document.getElementById("likeButton").style.color = "#464B4F";
        this.hasLiked = false;
        this.updatedLikeCount = parseInt(this.likes);
      }
      updateDoc(docRef, { likes: parseInt(this.updatedLikeCount) });
    },
    change() {
      this.updateLikeCount += 1;
    },
    async submitComment() {
      if (!this.validComment) {
        alert("Please fill in your comments before submitting!");
      } else {
        this.commentCount += 1;
        var newResponse = {
          sender: this.user,
          commentBody: this.commentBody,
          commentDate: new Date().toString().slice(0, 24),
        };
        this.responses.push(newResponse);
        let responses = this.responses;
        let comment_count = this.commentCount;
        let newComments = {
          comment_count,
          responses,
        };
        await updateDoc(doc(db, "Posts", this.id + ""), {
          comments: newComments,
        });
        const form = document.getElementById("addComment");
        form.value = "";
      }
    },
    async display() {
      let z = await getDocs(collection(db, "Users"));
      let item = [];
      z.forEach((doc) => {
        item = doc.data();
        console.log(item);
        if (auth.currentUser.uid == doc.data().userId) {
          console.log("found current user");
          this.userDetails = doc.data();
          this.displayImage(this.userDetails.picture);
          this.user = this.userDetails.userName;
        }
      });
    },
    displayImage(pictureURL) {
      let divLoc = document.getElementById("userIcon");
      let img = document.createElement("img");
      img.src = pictureURL;
      img.style =
        "margin: 0px auto; margin-top: 5%;width: 35px; height: 35px; border-radius: 50%;";
      divLoc.append(img);
    },
  },
  watch: {
    commentBody(val) {
      if (val === "") {
        this.validComment = false;
      } else {
        this.validComment = true;
      }
    },
  },
  computed: {
    sortComments() {
      let z = this.responses;
      return z.sort(function (a, b) {
        return Date.parse(b.commentDate) - Date.parse(a.commentDate);
      });
    },
  },
  created() {
    this.fetchItems();
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.displayName;
      }
    });
    this.display();
  },
};
</script>

<style scoped>
#mainThread {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  width: 60%;
  height: auto;
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
  width: 10%;
  padding: 5% 0 0 0;
}

#likeButton {
  margin-left: 40%;
  cursor: pointer;
}

#commentButton {
  margin-top: 30%;
  margin-left: 40%;
}

#likeCounter,
#commentCounter {
  margin: 2%;
  padding-right: 3%;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: #5b5b5b;
}

#forumHeader {
  font-weight: 700;
  font-size: 20px;
  color: #000000;
}

#forumAuthorAndDate {
  margin-top: 3%;
  font-weight: 400;
  font-size: 16px;
  color: #5b5b5b;
}
#countryBox {
  position: absolute;
  height: 100px;
  width: 40%;
  padding: 2% 0 0 0;
  left: 60%;
}

#countryContainer {
  text-align: center;
  height: 52%;
  width: 45%;
  margin-left: 40%;
  background: #dda375;
  border-radius: 20px;
}

#countryText {
  padding-top: 5%;
  font-size: 18px;
  color: #ffffff;
}
.bottomHalf {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  line-height: 27px;
  color: black;
}

#forumContent {
  position: relative;
  height: auto;
  width: 80%;
  left: 10%;
  margin-top: -10%;
}
#userIcon {
  position: absolute;
  /* size: 30px;
  width: 30x;
  height: 30px; */
  left: 5%;
  /* top: 50%; */
  /* bottom: 23%; */
  /* border-radius: 1000px; */
}

#addCommentDiv {
  position: relative;
  left: 10%;
  width: 80%;
  margin-top: 3%;
  height: 2.5em;
  margin-bottom: 0.5em;
  background: #8caccb;
  border: 2px solid #8caccb;
  box-sizing: border-box;
  border-radius: 10px;
}

#addComment {
  position: absolute;
  background: transparent;
  border: none;
  outline: none;
  bottom: 20%;
  left: 14%;
  height: 60%;
  width: 80%;
}
#submitComment {
  position: absolute;
  cursor: pointer;
  top: 20%;
  right: 2%;
}

#commentsDiv {
  position: relative;
  left: 20%;
  width: 60%;
  height: fit-content;
  background-color: #ffffff;
  display: inline-block;
  max-height: 60%;
  padding: 2px;
  margin-top: 20px;
}
</style>
