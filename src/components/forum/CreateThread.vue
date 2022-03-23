<template>
  <div id="mainContainer">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="iconDiv">
      <span id="icon"><i id="userIcon" class="fa fa-user"></i></span>
    </div>
    <div id="titleContainer">
      <input
        id="forumTitle"
        type="text"
        placeholder="Title"
        v-on:keypress.enter="submit"
        v-model="subject"
      />
    </div>
    <div id="contentContainer">
      <textarea
        id="forumContent"
        placeholder="Text (optional)"
        cols="40"
        rows="5"
        v-on:keypress.enter="submit"
        v-model="body"
      ></textarea>
    </div>
    <div id="selectCountry">
      <label for="countries">Select country:</label>
      <select id="countries" name="countries">
        <option value="Malaysia">Malaysia</option>
        <option value="England">England</option>
        <option value="Finland">Finland</option>
        <option value="Australia">Australia</option>
      </select>
      <input type="submit" />
    </div>
  </div>
</template>

<style scoped>
#mainContainer {
  position: absolute;
  width: 895px;
  height: 256px;
  left: 472px;
  top: 314px;

  background: #aec4da;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#userIcon {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 59px;
  top: 36px;
}

#forumTitle {
  position: absolute;
  width: 60%;
  height: 20%;
  left: 20%;
  top: 10%;
  background: #ffffff;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}
#contentContainer {
  position: absolute;
  width: 60%;
  height: 40%;
  left: 20%;
  top: 40%;

  background: #ffffff;
  border: 2px solid #aec4da;
  box-sizing: border-box;
  border-radius: 10px;
}

#selectCountry {
  position: absolute;
  width: 60%;
  height: 40%;
  left: 20%;
  top: 85%;
}
</style>
