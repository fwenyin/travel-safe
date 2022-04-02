<template>
  <!-- Remove the container if you want to extend the Footer to full width. -->
  <div class=" my-0">
    <footer class="text-center text-lg-start" style="background-color: #8caccb">
      <div class=" d-flex justify-content-center py-2">
        <h5 style="text-align: center; padding-top: 0.5em">Contact Us</h5>
        <a
          type="button"
          class="btn btn-primary btn-lg btn-floating mx-3"
          style="background-color: #54456b"
          href="https://github.com/fwenyin/travel-safe"
        >
          <i class="fab fa-github"></i>
        </a>

        <a
          type="button"
          class="btn btn-primary btn-lg btn-floating mx-3"
          style="background-color: #54456b"
          href="mailto:travelsafe3103@gmail.com"
        >
          <i class="fa fa-envelope"></i>
        </a>
      </div>

      <!-- Copyright -->
      <div
        class="text-center p-1"
        style="background-color: rgba(0, 0, 0, 0.2); color: aliceblue"
      >
        © 2022 Copyright:
        <a style="color: aliceblue" href="/">travel-safe.com</a>
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

<style></style>
