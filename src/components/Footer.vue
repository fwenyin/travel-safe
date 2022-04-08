<template>
  <!-- Remove the container if you want to extend the Footer to full width. -->
  <div class="my-0">
    <footer class="text-center text-lg-start" style="background-color: #8caccb">
      <div class="d-flex justify-content-center py-0">
        <p style="text-align: center; padding-top: 0.7em; padding-bottom: -2em">
          Contact Us:
        </p>
        <a
          class="btn btn-link btn-floating btn-lg text-dark mx-0"
          href="https://github.com/fwenyin/travel-safe"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-github"></i
        ></a>
        <a
          class="btn btn-link btn-floating btn-lg text-dark mx-0"
          href="mailto:travelsafe3103@gmail.com"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fa fa-envelope"></i
        ></a>
      </div>

      <!-- Copyright -->
      <div
        class="text-center"
        style="background-color: rgba(0, 0, 0, 0.2); color: aliceblue"
      >
        © 2022 Copyright:
        <a style="color: aliceblue" href="/home">travel-safe.com</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
  <!-- End of .container -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
</style>
