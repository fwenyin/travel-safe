<template>
  <div class="main">
    <div class="header">
      <img class="headerImage" :src="require('@/assets/news.png')" alt="home" />
      <div
        class="card text-white bg-black mb-5 justify-content-center"
        style="height: 70px; width: 500px; position: absolute; margin-top: 14%"
      >
        <p class="headerText">Global Travel News</p>
      </div>
    </div>
    <div class="body">
      <div class="left">
        <div class="card text-white" style="width: 280px;">
          <h6 class="card-header">Filter</h6>
          <div class="card-body text-center">
              <button
                class="btn btn-secondary dropdown-toggle text-black"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="margin-top:10px; margin-bottom: 10px"
              >
                {{ selected }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="option in countries" :key="option">
                  <a class="dropdown-item" @click="selected = option">{{ option }}</a>
                </li>
              </ul>
          </div>
          <h6 class="card-header">Sort</h6>
          <div class="card-body text-black"> 
            <input type="radio" id="newest" value="newest" v-model="sorted" >
            <label for="newest" style="margin-left:12px; padding-top: 10px">Newest</label> <br> 
            <input type="radio" id="oldest" value="oldest" v-model="sorted">
            <label for="oldest" style="margin-left:12px; padding-top: 15px">Oldest</label>
          </div>
        </div>

      </div>
      <div class="right">
        <div
          class="card text-start mx-auto mb-2 p-2 justify-content-center"
          v-for="item in filter"
          :key="item.id">
          <h5><a v-bind:href="item.link" class="link-dark" style="margin-top:12px">{{ item.title }}</a></h5>
          <p style="font-size:13px">{{ item.news_agency + " - " + item.time }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      items: [],
      selected: "Select destination",
      sorted: "",
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
    };
  },
  computed: {
    filter() {
      let z = this.items;
      if (this.selected === "Select destination" || this.selected === "All") {
        if (this.sorted === "oldest") {
          return z.sort(function(a, b) {
            return Date.parse(a.time) - Date.parse(b.time)
          })
        } else {
          return z.sort(function(a, b) {
            return Date.parse(b.time) - Date.parse(a.time)
          })
        }
      }
      z = z.filter(article => article.country === this.selected);
      if (this.sorted === "oldest") {
        return z.sort(function(a, b) {
          return Date.parse(a.time) - Date.parse(b.time)
        })
      } else {
        return z.sort(function(a, b) {
          return Date.parse(b.time) - Date.parse(a.time)
        })
      }
    }
  },
  methods: {
    async display() {
      let z = await getDocs(collection(db, "News"));
      z.forEach((doc) => {
        console.log(doc.data());
        this.items.push(doc.data());
      });
    },
  },
  created() {
    this.display();
  },
};
</script>

<style>
.header {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5%;
}

.headerText {
  font-size: 30px;
  margin-top: 3%;
  text-align: center;
}

.body {
  display: flex;
  flex-direction: row;
}

.headerImage {
  width: 100%;
}

.left {
  flex: 1;
  margin-left: 5%
}

.right {
  flex: 3;
  width: 85%;
  margin-right: 5%
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
  background-color: #394F73 !important
}

.card-body {
  background-color: #AEC4DA;
}

input[type=radio] {
  border: 1px solid white;
  padding: 0.5em;
  -webkit-appearance: none;
}

input[type=radio]:checked {
  background: url(data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==) no-repeat center center;
  background-size: 9px 9px;
}

input[type=radio]:focus {
  outline-color: transparent;
}

</style>