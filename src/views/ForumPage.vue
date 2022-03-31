<template>
  <NavBar />
  <div id="forumPage">
    <ForumHeader />
    <div class="body">
      <div class="left">
        <div class="card text-white" style="width: 280px">
          <h6 class="card-header">Sort Posts</h6>
          <div class="card-body text-black">
            <input type="radio" id="newest" value="newest" v-model="sortBy" />
            <label for="newest" style="margin-left: 12px; padding-top: 10px"
              >Newest</label
            >
            <br />
            <input type="radio" id="oldest" value="oldest" v-model="sortBy" />
            <label for="oldest" style="margin-left: 12px; padding-top: 15px"
              >Oldest</label
            >
            <br />
            <input
              type="radio"
              id="mostLikes"
              value="mostLikes"
              v-model="sortBy"
            />
            <label for="mostLikes" style="margin-left: 12px; padding-top: 20px"
              >Most Likes</label
            >
            <br />
            <input
              type="radio"
              id="leastLikes"
              value="leastLikes"
              v-model="sortBy"
            />
            <label for="leastLikes" style="margin-left: 12px; padding-top: 25px"
              >Least Likes</label
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div id="forumBlock">
          <CreateThread />
          <ShortenedThread
            v-for="post in sortPosts"
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
import NavBar from "../components/NavBar.vue";
import ForumHeader from "../components/forum/ForumHeader.vue";
import ShortenedThread from "../components/forum/ShortenedThread.vue";
import CreateThread from "../components/forum/CreateThread.vue";
import firebaseApp from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "ForumPage",
  data() {
    return {
      posts: [],
      sortBy: "",
      updateLikeCount: 0,
    };
  },
  components: {
    NavBar,
    ShortenedThread,
    CreateThread,
    ForumHeader,
  },
  methods: {
    async fetchItems() {
      this.posts = [];
      console.log("This is fetch items");
      let posts = await getDocs(collection(db, String("Posts")));

      posts.forEach((doc) => {
        let post = {};
        post = doc.data();
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
  computed: {
    sortPosts() {
      console.log("Sort is called");
      console.log("Initial posts are ", this.posts);

      let z = this.posts;
      if (this.sortBy === "oldest") {
        return z.sort(function (a, b) {
          return Date.parse(a.timestamp) - Date.parse(b.timestamp);
        });
      } else if (this.sortBy === "newest" || this.sortBy === "") {
        return z.sort(function (a, b) {
          return Date.parse(b.timestamp) - Date.parse(a.timestamp);
        });
      } else if (this.sortBy === "mostLikes") {
        return z.sort(function (a, b) {
          return b.likes - a.likes;
        });
      } else {
        return z.sort(function (a, b) {
          return a.likes - b.likes;
        });
      }
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

.card-header {
  background-color: #394f73 !important;
}

.card-body {
  background-color: #aec4da;
}

input[type="radio"] {
  border: 1px solid white;
  padding: 0.5em;
  -webkit-appearance: none;
}

input[type="radio"]:checked {
  background: url(data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)
    no-repeat center center;
  background-size: 9px 9px;
}

input[type="radio"]:focus {
  outline-color: transparent;
}
</style>
