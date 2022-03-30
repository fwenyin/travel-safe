<template>
  <h2>
    {{ roomname }}
    <button @click="back()">Back</button>
  </h2>

  <div class="chat-box">
    <div class="chat-item" v-for="chat in chats" :key="chat.key">
      <div>
        <div class="chat-message text-right" v-if="chat.user === user">
          <div class="right-bubble">
            <span class="msg-name">Me</span>
            <span class="msg-date">{{ chat.sendDate }}</span>
            <p text-wrap>{{ chat.message }}</p>
          </div>
        </div>
        <div class="chat-message text-left" text-left v-if="chat.user !== user">
          <div class="left-bubble">
            <span class="msg-name">{{ chat.user }}</span>
            <span class="msg-date">{{ chat.sendDate }}</span>
            <p text-wrap>{{ chat.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sticky-footer">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="data.message"
        placeholder="Enter your message"
      />
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import {
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "Chat",
  data() {
    return {
      roomname: this.$route.params.roomname,
      data: { type: "", user: "", message: "" },
      chats: [],
      user: null, // get current user
    };
  },

  created() {
    onSnapshot(
      collection(db, "Rooms", this.roomname, "Messages"),
      (snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
          let item = doc.data();
          item.key = doc.key;
          data.push(item);
        });
        this.chats = data
      }
    );
    this.data.message = "";
  },

  methods: {
    async onSubmit() {
      await addDoc(collection(db, "Rooms", this.roomname, "Messages"), {
        type: "newmsg",
        user: this.user,
        message: this.data.message,
        sendDate: Date(),
      });
      this.data.message = "";
    },

    back() {
      this.$router.push({ name: "Room" });
    }
  },
};
</script>

<style>
.chat-box {
  height: 500px;
  width: 100%;
  overflow: scroll;
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
  background: #dcf8c6;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 15%;
}
.chat-message .right-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: green;
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
  border-left-color: #dcf8c6;
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
  color: blue;
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
footer.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border-top: solid 1px #efefef;
}
</style>
