<template>
  <p>This is shortened thread</p>
  <div id="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="buttonsDiv">
      <i id="likeButton" class="fa fa-thumbs-up" v-on:click="pressLike()"></i>
      <p id="likeCounter">{{ likes }}</p>
    </div>
    <div id="iconDiv">
      <span id="icon"><i class="fa fa-user"></i></span>
    </div>
    <div id="forumHeader">
      <p>{{ country }}</p>
      <h3 id="forumTitle" class="displayText">
        <router-link to="/ForumThread">{{ shortenedTitle }}</router-link>
      </h3>
      <p id="forumAuthorAndDate" class="displayText">
        by {{ user }} - {{ time }}
      </p>
    </div>
    <div id="forumDetailsDiv">
      <p id="forumDetailsText" class="displayText">{{ shortenedBody }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortenedThread",
  data() {
    return {
      exampleDateDisplay: "1 day ago at 11:45pm",
      threadLink: "",
      user: "Bandy",
      time: "21/3/2022",
      shortenedTitle: "Shortened Title",
      shortenedBody: "This is shortened thread body",
      id: "ID",
      replyBody: "",
      isValid: false,
      hasLiked: false,
      userName: "Bandy",
      subject: "VTL exprience to Malaysia",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptate aliquid nesciunt doloribus est eius facilis eaque, eveniet doloremque, voluptatum iste hic! Numquam accusantium mollitia laborum cum. Ipsam, exercitationem modi!",
      timestamp: "",
      likes: "2",
      numReplies: 69,
      country: "Malaysia",
      commentSender: "Bob",
      commentDate: "11/03/2022",
      commentBody: "This is comment body",
    };
  },
  methods: {
    pressLike: function () {
      if (!this.hasLiked) {
        document.getElementById("likeButton").style.color = "green";
        this.hasLiked = true;
        var likesCountPlus = parseInt(this.likes) + 1;
        this.likes = likesCountPlus + "";
      } else {
        document.getElementById("likeButton").style.color = "#808080";
        this.hasLiked = false;
        var likesCountMinus = parseInt(this.likes) - 1;
        this.likes = likesCountMinus;
      }
    },
  },
};
</script>

<style scoped>
#main {
  position: absolute;
  width: 895px;
  height: 236px;
  left: 472px;
  top: 586px;

  background: #aec4da;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#likeButton {
  position: absolute;
  right: 90%;
  top: 10%;
  bottom: 0%;
}

#likeCounter {
  position: absolute;
  right: 90%;
  top: 10%;
  bottom: 0%;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  text-align: center;

  color: #5b5b5b;
}
</style>
