<template>
  <div id="placeholder">
    <div id="comment-header">
      <span id="user">@{{ sender }}</span>
      <span id="timestamp">Commented {{ getTimestampDisplay() }}</span>
    </div>
    <div id="comment-content">
      <p>{{ body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBlock",
  data() {
    return {
      exampleText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
        "mollit anim id est laborum.",
    };
  },
  props: {
    sender: String,
    date: String,
    body: String,
  },
  methods: {
    getTimestampDisplay: function () {
      const timeOfPost = new Date(this.date);
      const timeStampNow = new Date();
      const diffTime = Math.abs(timeStampNow - timeOfPost);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        var pluralSuffix = "s";
        if (diffDays === 1) {
          pluralSuffix = "";
        }
        return diffDays.toString() + " day" + pluralSuffix + " ago";
      } else if (diffDays <= 31) {
        return Math.ceil(diffDays / 7) + " weeks ago";
      } else {
        var date = new Date(timeOfPost);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        return dd + "/" + mm + "/" + yyyy;
      }
    },
  },
};
</script>

<style scoped>
#placeholder {
  width: 100%;
  border-radius: 20px;
  height: auto;
  margin-bottom: 4px;
}

#comment-content {
  height: auto;
  padding: 8px 20px 8px 20px;
  background-color: whitesmoke;
}

#comment-content p {
  height: auto;
  width: 100%;
  color: black;
  text-align: left;
  text-shadow: none;
  font-size: 16px;
  overflow: auto;
  max-height: 250px;
  padding: 20px;
}

#comment-header {
  background-color: whitesmoke;
  height: auto;
  padding: 20px;
}

#user {
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  float: left;
  padding-left: 16px;
}

#timestamp {
  color: #2c3e50;
  text-shadow: none;
  font-size: 14px;
  font-weight: bold;
  float: right;
  padding-right: 16px;
}
</style>
