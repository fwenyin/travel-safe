<template>
  <div id="placeholder">
    <div id="comment-header">
      <span id="user">@{{ sender }}</span>
      <span id="timestamp">Commented on {{ commentDate }}</span>
    </div>
    <div id="comment-content">
      <p>{{ commentBody }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBlock",
  props: {
    sender: String,
    commentDate: String,
    commentBody: String,
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
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  overflow: auto;
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
