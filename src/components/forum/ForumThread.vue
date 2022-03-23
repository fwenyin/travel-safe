<template>
  <p>This is Forum Thread</p>
  <div id="threadPage">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="blockElements">
      <div id="mainThread">
        <div id="iconDiv">
          <span id="icon"><i id="userIcon" class="fa fa-user"></i></span>
        </div>
        <div id="forumHeader">
          <p id="forumAuthorAndDate" class="displayText">
            Posted by @{{ userName }} {{ getDateDisplay() }}
            {{ getTimeDisplay() }} ago
          </p>
          <h4 id="forumTitle" class="displayText">{{ subject }}</h4>
          <span id="forumCountry">{{ country }}</span>
        </div>
        <div id="buttonsDiv">
          <i
            id="likeButton"
            class="fa fa-thumbs-up"
            v-on:click="pressLike()"
          ></i>
          <p id="likeCounter">{{ likes }}</p>
          <i id="replyButton" class="fa fa-reply"></i>
          <p id="replyCounter">{{ numReplies }}</p>
        </div>
        <div id="forumContentDiv">
          <p id="forumContent" class="displayText">{{ body }}</p>
        </div>
      </div>
      <div class="comments" id="commentsDiv">
        <CommentBlock
          :sender="commentSender"
          :date="commentDate"
          :body="commentBody"
        ></CommentBlock>
      </div>
    </div>
    <p></p>
  </div>
</template>

<script>
import CommentBlock from "@/components/CommentBlock";

export default {
  name: "ForumThread",
  components: {
    CommentBlock,
  },
  data() {
    return {
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
    getDateDisplay: function () {
      const timeOfPost = new Date(this.timestamp);
      const timeStampNow = new Date();
      const diffTime = Math.abs(
        timeStampNow.getMilliseconds() - timeOfPost.getMilliseconds()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        var pluralSuffixDay = "s";
        if (diffDays === 1) {
          pluralSuffixDay = "";
        }
        return diffDays.toString() + " day" + pluralSuffixDay + " ago";
      } else if (diffDays <= 31) {
        var pluralSuffixWeek = "s";
        if (diffDays === 1) {
          pluralSuffixWeek = "";
        }
        return Math.ceil(diffDays / 7) + " week" + pluralSuffixWeek + " ago";
      } else {
        return new Date(this.timestamp).toLocaleString().split(",")[0];
      }
    },
    getTimeDisplay: function () {
      var timeOfPost = new Date(this.timestamp);
      var hours = timeOfPost.getHours();
      var minutes = timeOfPost.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return hours + ":" + minutes + " " + ampm;
    },

    getNumReplies: function () {
      return this.replies.responses.length;
    },
  },
  computed: {
    user: "Bandy-user",
  },
};
</script>

<style scoped>
.blockElements {
  padding-top: 40px;
}

#forumContentDiv {
  width: 100%;
  border-radius: 20px;
  background-color: #e6f7ff;
  /* position: absolute; */
}

#mainThread {
  width: 60%;
  max-height: 40%;
  border-radius: 20px;
  background: #e6f7ff;
  position: relative;
  display: inline-block;
}

#forumContent {
  padding: 20px;
  text-align: left;
  font-size: 16px;
}

#buttonsDiv {
  /* background-color: #e6f7ff; */
  position: absolute;
  top: 10px;
  left: 10px;
  height: 50%;
  width: 10%;
}

#forumCountry {
  background: #dda375;
  border-radius: 10px;
}

/* #icon {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #6097ca;
  display: inline-block;
  line-height: 60px;
  margin-top: 15%;
}

#userIcon {
  font-size: 34px;
  color: whitesmoke;
  z-index: 2;
  padding-top: 12px;
} */

#forumAuthorAndDate {
  font-size: 12px;
}

#commentsDiv {
  position: relative;
  width: 60%;
  height: fit-content;
  background-color: #ffffff;
  /* flex-direction: column-reverse; */
  display: inline-block;
  /* overflow: scroll;
  overflow-x: hidden; */
  max-height: 60%;
  padding: 2px;
  margin-top: 20px;
}
</style>
