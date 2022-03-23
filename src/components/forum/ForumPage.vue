<template>
  <h3>This is Forum page</h3>
  <div id="forumPage">
    <div id="forumBlock">
      <CreateThread/>
      <ShortenedThread />
    </div>
  </div>
</template>

<script>
import ShortenedThread from "@/components/ShortenedThread";
import CreateThread from "@/components/CreateThread";

export default {
  name: "ForumPage",

  data() {
    return {};
  },
  components: {
    ShortenedThread,
    CreateThread
  },
};
</script>
