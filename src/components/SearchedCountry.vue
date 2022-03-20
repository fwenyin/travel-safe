<!-- TO DO NEXT: ADD STRINGENCY INDEX + FIX THE CHART PROBLEM -->

<template>
    <div class="top_header">
        <div class="header_image">
            <img :src="getImgUrl(this.country.toLowerCase().split(' ').join('-'))">
            <div class="text-block">
                <h1 style="text-align: center;"> this.country </h1>
            </div>
        </div>
    </div>
    <div id="searched-country">
        <div class="col">
            <div class="header">
                <h2 style="color:white; padding: 10px 0;"> COVID-19 Statistics </h2>
            </div>
            <div class="container">
                <div class="box">
                    <i class="fa fa-search" aria-hidden="true">
                    </i>
                    <div class="content">
                        <h1>{{ this.totalConfirmedCases }}</h1>
                        <h4>TOTAL CONFIRMED CASES</h4>
                    </div>
                </div>
                <div class="box">
                    <i class="fa fa-search" aria-hidden="true">
                    </i>
                    <div class="content">
                        <h1>{{ this.totalActiveCases }}</h1>
                        <h4>TOTAL ACTIVE CASES</h4>
                    </div>
                </div>
                <div class="box">
                    <i class="fa fa-search" aria-hidden="true">
                    </i>
                    <div class="content">
                        <h1>{{ this.totalDeaths }}</h1>
                        <h4>TOTAL DEATHS</h4>
                    </div>
                </div>
                <div class="box">
                    <i class="fa fa-search" aria-hidden="true">
                    </i>
                    <div class="content">
                        <h1>{{ this.totalRecovered }}</h1>
                        <h4>TOTAL RECOVERED</h4>
                    </div>
                </div>
                <div class="box">
                    <i class="fa fa-search" aria-hidden="true">
                    </i>
                    <div class="content">
                        <h1>0</h1>
                        <h4>STRINGENCY INDEX</h4>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <div class="header">
                <h2 style="color:white; padding: 10px 0;"> New COVID-19 Cases Over Time </h2>
            </div>
            <div class="final-row"> 
                <line-chart :data = "hist_confirmedCases" @mouseover = "updateNewestData()"></line-chart>
                <p style="color: grey; "> Each day shows new cases reported since the previous day </p>
                <a href="https://support.google.com/websearch/answer/9814707?p=cvd19_statistics&hl=en&visit_id=637832961477220002-2029545735&rd=1" style="text-decoration: underline; color: grey; "> About this data </a>
            </div>
            <!-- <div id="loading" v-else>
            </div> -->
      </div>
  </div>
</template>

<script>

export default {
  name: 'SearchedCountry',

  components: {
  },

  data() {
    return {

        country: this.$route.params.country,

        totalConfirmedCases: 0,
        totalActiveCases: 0,
        totalDeaths: 0,
        totalRecovered: 0,
      
        hist_confirmedCases: {},

        cache: []
    };
  },

  methods: {
    getImgUrl(country) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + country + ".png")
    },

    async fetchData(c) {
        this.country = c
        let theCountry = c.toLowerCase().split(' ').join('-');
        let link = 'https://api.covid19api.com/live/country/' + theCountry +'/status/confirmed'
        const res = await fetch(link)
        const data = await res.json()
        return data
    },

    savingHistoricalData() {
        let data = this.cache
        let latest_data = data[data.length - 1]
        console.log(latest_data);

        this.totalConfirmedCases = latest_data.Confirmed;
        this.totalActiveCases = latest_data.Active;
        this.totalDeaths = latest_data.Deaths;
        this.totalRecovered = latest_data.Recovered;
        data.forEach(d => {
            let date = d.Date
            let noOfCases = d.Confirmed
            this.hist_confirmedCases[date] = noOfCases;
        })

    },

    updateNewestData() {
        console.log('mouse hover')
        const numbers = this.hist_confirmedCases
        this.hist_confirmedCases = numbers
    }

  },
  
  created() {
    this.fetchData('Malaysia').then((res) => {
        console.log('success', res);
        this.cache = res;
        this.$nextTick(() => this.savingHistoricalData());
    });
  },

//     this.cache = data
//     // console.log(data);
//     const latest_data = data[data.length - 1]
//     console.log(latest_data);

//     this.totalConfirmedCases = latest_data.Confirmed;
//     this.totalActiveCases = latest_data.Active;
//     this.totalDeaths = latest_data.Deaths;
//     this.totalRecovered = latest_data.Recovered;
//   },

  mounted() {
      console.log('mounting');
  }
}

</script>

<style scoped>
.header {
    background: #000;
    width: 100%;
    height: 50px;
    text-align: center;
}

.container {
    margin-left: auto;
    margin-right: auto;
}

.container .box
{
    position: relative;
    width: calc(280px - 30px);
    height: calc(200px - 30px);
    background: #FFFFFF;
    float: left;
    margin: 15px;
    border: 2px solid #8CACCB;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
}

.box:hover {
   border-color: red;
}

.container .box .content {
    position: relative;
    top: 20px;
    height: calc(100% - 100px);
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.5s;
}

img {
    width: 100%;
    object-fit: fill;
}

.text-block {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, -50%);
  background-color: #8CACCB;
  color: white;
  padding: 20px;
}

/* #loading {
    background: url('spinner.gif') no-repeat center center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999999;
} */
</style>