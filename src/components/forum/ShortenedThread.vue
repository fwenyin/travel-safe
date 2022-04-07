<template>
  <div id="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topHalf">
      <div id="buttonsDiv">
        <p id="likeButton" class="fa fa-thumbs-up"></p>
        <p id="likeCounter" v-if="pressedLike">{{ updatedLikeCount }}</p>
        <p id="likeCounter" v-else>{{ likes }}</p>
        <p id="commentButton" class="fa fa-comment"></p>
        <p id="commentCounter">{{ commentCount }}</p>
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
    commentCount: Number,
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
  height: 32vh;
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

#likeCounter,
#commentCounter {
  margin: 2%;
  padding-right: 3%;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: #5b5b5b;
}

#commentButton {
  margin-top: 30%;
  margin-left: 40%;
}

#forumHeader {
  font-weight: 700;
  font-size: 20px;
  color: black;
}

#forumAuthorAndDate {
  margin-top: 3%;
  font-weight: 400;
  font-size: 16px;
  color: #5b5b5b;
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
  font-size: 20px;
  color: black;
}

#forumDetailsText {
  position: absolute;
  overflow: hidden;
  width: 80%;
  height: 45%;
  left: 10%;
  top: 43%;
}
#viewFullPost {
  position: absolute;
  bottom: 4%;
  right: 3%;
  font-size: 16px;
  text-decoration-line: underline;
  color: #5b5b5b;
}
</style>
