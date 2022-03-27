<template>
  <div class="header">
    <img class="headerImage" :src="require('@/assets/forum.png')" alt="home" />
    <div class="box">
      <p class="headerText">Forum Page</p>
    </div>
  </div>
</template>
<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5%;
}
.headerImage {
  width: 100%;
}
.box {
  position: absolute;
  color: white;
  background-color: black;
  justify-content: center;
  height: 70px;
  width: 500px;
  margin-top: 8%;
}

.headerText {
  font-size: 30px;
  margin-top: 3%;
  text-align: center;
}
</style>
