// THIS COMPONENT IS NOT USED
<template>
  <div class="container">
    <p
      id="likeButton"
      class="fa fa-thumbs-up"
      @click="emitLike(), changeColour()"
    ></p>
  </div>
</template>

<script>
export default {
  name: "LikeButton",
  props: {
    pressedLike: Boolean,
  },
  data() {
    return { tempPressedLike: this.pressedLike };
  },
  emits: ["likelike"],
  methods: {
    emitLike() {
      this.$emit("likelike");
    },
    changeColour() {
      console.log(
        "this is change colour, this.pressedLike is ",
        this.pressedLike
      );

      if (!this.tempPressedLike) {
        document.getElementById("likeButton").style.color = "green";

        // document.getElementById("likeButton").style.color = "green";
      } else {
        // document.getElementById("likeButton").className = "notLiked";

        document.getElementById("likeButton").style.color = "#808080";
      }
      this.tempPressedLike = !this.empPressedLike;
      console.log(
        "end of this is change colour, this.pressedLike is ",
        this.tempPressedLike
      );
    },
  },
};
</script>

<style scoped>
.clicked {
  color: green;
}
</style>
