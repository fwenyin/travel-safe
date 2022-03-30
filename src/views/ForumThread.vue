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
          <p
            id="likeButton"
            class="fa fa-thumbs-up"
            style="color: #808080"
            @click="pressLike()"
          ></p>
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
            <img
              id="userIcon"
              :src="require('@/assets/profilephoto.png')"
              alt="home"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="commentsDiv">
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
import NavBar from "../components/NavBar.vue";
import CommentBlock from "../components/forum/CommentBlock.vue";
import ForumHeader from "../components/forum/ForumHeader.vue";
import firebaseApp from "../firebase";
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
    NavBar,
    CommentBlock,
    ForumHeader,
  },
  data() {
    return {
      posts: [],
      id: this.$route.params.id,
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
      commentCount: 0,
      commentBody: "",
      validComment: "",
    };
  },
  methods: {
    async fetchItems() {
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
          if (item.comments.comment_count > 0) {
            this.commentCount = item.comments.comment_count;
            item.comments.responses.forEach((response) => {
              console.log("Pushing response: ", response);
              this.responses.push(response);
            });
          }
        }
      });
      console.log("Fetched responses are: ", this.responses);
    },
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
    change() {
      this.updateLikeCount += 1;
    },
    async submitComment() {
      console.log("This is submit comment function ");
      if (!this.validComment) {
        alert("Please fill in your comments before submitting!");
      } else {
        console.log("Else part");
        console.log(
          "submitcomment function comment count is ",
          this.commentCount
        );
        this.commentCount += 1;
        var newResponse = {
          sender: "Bandy",
          commentBody: this.commentBody,
          commentDate: new Date().toDateString(),
        };
        console.log("New response is: ", newResponse);
        this.responses.push(newResponse);
        let responses = this.responses;
        let comment_count = this.commentCount;
        let newComments = {
          comment_count,
          responses,
        };
        console.log("Pushing new comment: ", newComments);

        await updateDoc(doc(db, "Posts", this.id + ""), {
          comments: newComments,
        });
        const form = document.getElementById("addComment");
        console.log("Form Value is " + form.value);
        form.value = "";
        alert("Pushing to firestore ");
      }
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
  created() {
    this.fetchItems();
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

#likeCounter {
  margin: 2%;
  padding-right: 3%;
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
#countryBox {
  position: absolute;
  height: 100px;
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

#forumContent {
  position: relative;
  margin-top: -1.5em;
  height: auto;
  width: 80%;
  left: 10%;
}
#userIcon {
  position: absolute;
  size: 45px;
  width: 45px;
  height: 45px;
  left: 3%;
  bottom: 3%;
  border-radius: 1000px;
}

#addCommentDiv {
  position: relative;
  left: 10%;
  width: 80%;
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
  position: absolute;
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
