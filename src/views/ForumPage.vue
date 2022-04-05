<template>
  <NavBar />
  <div id="forumPage">
    <ForumHeader />
    <div class="body">
      <div class="left">
        <div class="card text-white" style="width: 280px">
          <h6 class="card-header">Filter</h6>
          <div class="card-body text-center">
            <button
              class="btn btn-secondary dropdown-toggle text-black"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="margin-top: 10px; margin-bottom: 10px"
            >
              {{ selected }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="option in countries" :key="option">
                <a class="dropdown-item" @click="selected = option">{{
                  option
                }}</a>
              </li>
            </ul>
          </div>
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
              >Upvotes (descending)</label
            >
            <br />
            <input
              type="radio"
              id="leastLikes"
              value="leastLikes"
              v-model="sortBy"
            />
            <label for="leastLikes" style="margin-left: 12px; padding-top: 25px"
              >Upvotes (ascending)</label
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
            :commentCount="post.comments.comment_count"
            :id="post.id"
            :key="post.key"
          ></ShortenedThread>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <Footer />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ForumHeader from "../components/forum/ForumHeader.vue";
import ShortenedThread from "../components/forum/ShortenedThread.vue";
import CreateThread from "../components/forum/CreateThread.vue";
import firebaseApp from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "ForumPage",
  data() {
    return {
      posts: [],
      selected: "Select destination",
      filteredPosts: [],
      countries: [
        "All",
        "Australia",
        "Denmark",
        "Finland",
        "Malaysia",
        "South Korea",
        "United States",
        "United Kingdom",
      ],
      sortBy: "",
      updateLikeCount: 0,
    };
  },
  components: {
    NavBar,
    ShortenedThread,
    CreateThread,
    ForumHeader,
    Footer,
  },
  methods: {
    async fetchItems() {
      this.posts = [];
      let posts = await getDocs(collection(db, String("Posts")));

      posts.forEach((doc) => {
        let post = {};
        post = doc.data();
        console.log("Each post is ", post);
        this.posts.push(post);
      });
    },
    change() {
      this.updateLikeCount += 1;
    },
    filterPosts() {
      let z = this.posts;
      if (this.selected != "Select destination" && this.selected != "All") {
        z = z.filter((post) => post.country === this.selected);
      }
      this.filteredPosts = z;
    },
  },
  watch: {
    $route(to, from) {
      this.id = from.params.id;
    },
  },

  computed: {
    sortPosts() {
      this.filterPosts();
      let z = this.filteredPosts;
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
.dropdown-menu {
  width: 200px;
  background-color: #aec4da !important;
}

.btn-secondary {
  width: 200px;
  background-color: #8caccb !important;
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
