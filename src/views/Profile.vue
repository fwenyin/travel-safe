<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Nunito"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
  <NavBar/>
  <br/> <br/> <br/>
  <div class="container bootstrap snippets bootdey" v-if="user">
    <h1 class="text-dark">Profile</h1>
    <hr />
    <div class="row" v-if="user">
      <!-- left column -->
      <div class="col-md-3" v-if="user">
        <div class="text-center" v-if="user">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            class="avatar img-circle img-thumbnail"
            alt="avatar"
          />
          <h6>Upload a different photo...</h6>

          <input type="file" class="form-control" />
        </div>
      </div>

      <!-- edit form column -->
      <div class="col-md-9 personal-info" v-if="user">
        <h3>Personal info</h3>

        <form class="form-horizontal" role="form">
          <div class="form-group" v-if="user">
            <label class="col-lg-3 control-label">Email: {{user.email}} </label>
          </div>
            <br>
          <div class="form-group" v-if="user">
            <label class="col-lg-3 control-label">Name: {{user.displayName}} </label>  
            <div class="col-lg-8" v-if="user">
              <input class="form-control" v-model= "nametest" type="text" placeholder="Enter Name Here"/> 
            </div>
            <br>
          </div>
          <div class="form-group" v-if="user">
            <label class="col-lg-3 control-label">Username:</label>
            <div class="col-lg-8" v-if="user">
              <input class="form-control" type="text" placeholder = "Enter Username Here" />
            </div>
            <br>
          </div>
          <div class="form-group" v-if="user">
            <label class="col-lg-3 control-label">Nationality:</label>
            <div class="col-lg-8" v-if="user">
              <div class="ui-select" v-if="user">
                <select id="user_time_zone" class="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">
                    (GMT-08:00) Pacific Time (US &amp; Canada)
                  </option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">
                    (GMT-07:00) Mountain Time (US &amp; Canada)
                  </option>
                  <option
                    value="Central Time (US &amp; Canada)"
                    selected="selected"
                  >
                    (GMT-06:00) Central Time (US &amp; Canada)
                  </option>
                  <option value="Eastern Time (US &amp; Canada)">
                    (GMT-05:00) Eastern Time (US &amp; Canada)
                  </option>
                  <option value="Indiana (East)">
                    (GMT-05:00) Indiana (East)
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
    name: 'Profile',
    data() {
        return {
            user:false,
            refreshComp:0,
        }
    },
    methods: {
        change() {
            this.refreshComp += 1
        }
    },

    components: {
        NavBar
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
        
    }
}
</script>

<style>
</style>
