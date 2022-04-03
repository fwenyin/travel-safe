<template>
  <div class="body">
    <div class="left">
      <div class="card" style="width: 280px">
        <h5 class="card-header text-white">Groups You've Joined</h5>
        <div class="card-body">
          <div
            class="card bg-transparent mb-2 p-2 justify-content-center"
            id="joinedGroups"
            v-for="group in groups"
            :key="group"
          >
            <div class="right">
              <h6 style="margin-top: 4%">
                <b>{{ group.roomName }}</b>
              </h6>
              <p>
                {{ group.country }}
              </p>
            </div>
            <div class="left">
              <a
                :href="'/room/' + group.roomName"
                class="btn stretched-link"
                style="background-color: transparent"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <h2 style="padding: 3px">
          {{ roomname }}
        </h2>
        <button
          type="button"
          class="leave p-2 btn btn-dark col6"
          @click="leaveGroup(this.roomname)"
        >
          Leave Group
        </button>
      </div>
      <div class="scroll">
        <div class="chat-item" v-for="chat in chats" :key="chat.key">
          <div
            class="chat-message text-right mb-3"
            v-if="chat.user === user.uid"
          >
            <div class="right-bubble">
              <span class="msg-name">Me</span>
              <span class="msg-date">{{ chat.sendDate.slice(0, 10) }}</span>
              <p text-wrap>{{ chat.message }}</p>
            </div>
          </div>
          <div
            class="chat-message text-left mb-3"
            v-if="chat.user !== user.uid"
          >
            <div class="left-bubble">
              <span class="msg-name">{{ chat.user }}</span>
              <span class="msg-date">{{ chat.sendDate }}</span>
              <p text-wrap>{{ chat.message }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky-footer">
        <input
          type="text"
          id="addMessage"
          v-model="data.message"
          @keyup.enter="onSubmit"
          placeholder="Enter your message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import {
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const db = getFirestore(firebaseApp);

export default {
  name: "Chat",
  data() {
    return {
      roomname: this.$route.params.roomname,
      data: { user: "", message: "" },
      chats: [],
      user: null,
      groups: [],
    };
  },

  
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(this.user.uid);
      }
    });
    
    onSnapshot(
      collection(db, "Rooms", this.roomname, "Messages"),
      (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          let item = doc.data();
          item.key = doc.key;
          data.push(item);
        });
        data.sort(function (a, b) {
          return Date.parse(a.sendDate) - Date.parse(b.sendDate);
        });
        this.chats = data;
      }
    );
    this.display();
    this.data.message = "";
    console.log("here", this.groups);
  },

  methods: {
    async onSubmit() {
      await addDoc(collection(db, "Rooms", this.roomname, "Messages"), {
        user: this.user.uid,
        message: this.data.message,
        sendDate: new Date().toISOString(),
      });
      this.data.message = "";
    },

    async display() {
      let z = await getDocs(collection(db, "Users"));
      z.forEach((doc) => {
        if (auth.currentUser.uid == doc.data().userId) {
          this.groups = doc.data().groups;
          console.log("stored groups", this.groups);
        }
      });
    },

    async leaveGroup(roomname) {
      console.log(roomname); // remove group from user attribute
      this.groups.filter((x) => x.roomName != roomname)
      await updateDoc(doc(db, "Users", this.user.uid), {
        groups: this.groups,
      });
      this.$router.push({ name: "Room" });
    },
  },
};
</script>

<style scoped>
.header {
  margin: 20px;
  padding: 10px;
  background-color: #8caccb;
  position: relative;
}

.card-header {
  background-color: #394f73 !important;
}

.card-body {
  background-color: #aec4da;
}

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

.scroll {
  overflow: scroll;
  height: 550px;
}

.leave {
  position: absolute;
  margin-left: 85%;
  margin-top: -5%;
}

.chat-item {
  border: none;
}
.chat-status {
  min-height: 49px;
}
.chat-status .chat-date {
  display: block;
  font-size: 10px;
  font-style: italic;
  color: #999;
  height: 15px;
  left: 10%;
  right: 10%;
}
.chat-status .chat-content-center {
  padding: 5px 10px;
  background-color: #e1e1f7;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
  height: 34px;
  left: 10%;
  right: 10%;
}
.chat-message {
  width: 80%;
  min-height: 40px;
}
.chat-message .right-bubble {
  position: relative;
  background: #cae6db;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 15%;
}
.chat-message .right-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: #93ada8;
  display: block;
}
.chat-message .right-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .right-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #cae6db;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.chat-message .left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 5%;
}
.chat-message .left-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: #394f73;
  display: block;
}
.chat-message .left-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .left-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}

.sticky-footer {
  position: absolute;
  left: 29%;
  width: 63%;
  padding: 10px;
  height: 6%;
  background: #aec4da;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#addMessage {
  position: absolute;
  background: transparent;
  border: none;
  outline: none;
  bottom: 20%;
  left: 5%;
  height: 60%;
  width: 80%;
  color: black;
}

#joinedGroups {
  display: flex;
  flex-direction: row;
}
</style>
