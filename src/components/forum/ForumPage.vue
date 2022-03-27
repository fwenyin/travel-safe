<template>
  <div id="forumPage">
    <ForumHeader />
    <div class="body">
      <div class="left"></div>
      <div class="right">
        <div id="forumBlock">
          <CreateThread />
          <ShortenedThread
            v-for="post in posts"
            :user="post.user"
            :title="post.title"
            :body="post.body"
            :timestamp="post.timestamp"
            :country="post.country"
            :likes="post.likes"
            :id="post.id"
            :key="post.key"
          ></ShortenedThread
          >>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForumHeader from "@/components/ForumHeader";
import ShortenedThread from "@/components/ShortenedThread";
// import Thread from "@/components/Thread";
import CreateThread from "@/components/CreateThread";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "ForumPage",
  data() {
    return {
      posts: [],
      updateLikeCount: 0,
      // id: 0,
    };
  },
  components: {
    ShortenedThread,
    CreateThread,
    ForumHeader,
  },
  methods: {
    fetchItems: async function () {
      this.posts = [];
      console.log("This is fetch items");
      let posts = await getDocs(collection(db, String("Posts")));
      console.log("Fetched result is ", posts);

      posts.forEach((doc) => {
        let post = {};
        post = doc.data();
        console.log("Post data is ", post);
        this.posts.push(post);
      });
      console.log("All posts updated in forum page!");
    },
    change() {
      this.updateLikeCount += 1;
    },
  },
  watch: {
    $route(to, from) {
      this.id = from.params.id;
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
}

.left {
  flex: 1;
  margin-left: 5%;
}
.right {
  flex: 3;
  width: 85%;
  margin-right: 5%;
}
</style>
