<!-- TO DO NEXT: ADD STRINGENCY INDEX + FIX THE CHART PROBLEM -->

<template>
    <div class="top_header">
        <div class="header_image">
            <img :src="getImgUrl(this.country.toLowerCase().split(' ').join('-'))">
            <div class="text-block">
                <h1 style="text-align: center;"> {{this.country}} </h1>
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
                    <div class="content">
                        <h1 style="text-align: center;">{{ this.totalConfirmedCases }}</h1>
                        <h5>TOTAL CONFIRMED CASES</h5>
                    </div>
                </div>
                <div class="box">
                    <div class="content">
                        <h1 style="text-align: center;">{{ this.totalActiveCases }}</h1>
                        <h5>TOTAL ACTIVE CASES</h5>
                    </div>
                </div>
                <div class="box">
                    <div class="content">
                        <h1 style="text-align: center;">{{ this.totalDeaths }}</h1>
                        <h5>TOTAL DEATHS</h5>
                    </div>
                </div>
                <div class="box">
                    <div class="content">
                        <h1 style="text-align: center;">{{ this.totalRecovered }}</h1>
                        <h5>TOTAL RECOVERED</h5>
                    </div>
                </div>
                <div class="box">
                    <div class="content">
                        <h1 style="text-align: center;"> {{ this.stringencyIdx }} </h1>
                        <h5>STRINGENCY INDEX</h5>
                    </div>
                </div>
            </div>

            <div class="header">
                <h2 style="color:white; padding: 10px 0;"> New COVID-19 Cases Over Time </h2>
            </div>
            <br>
            <div class="final-row"> 
                <line-chart :data = "hist_confirmedCases" xmin="2021-02-01" xmax="2022-05-01" label="New cases" :messages="{empty: 'Loading data...'}" @mouseover = "updateNewestData()"></line-chart>
                <br>
                <p style="color: grey; padding-left:20px;"> Each day shows new cases reported since the previous day 
                    <span href="https://support.google.com/websearch/answer/9814707?p=cvd19_statistics&hl=en&visit_id=637832961477220002-2029545735&rd=1" style="text-decoration: underline; color: blue; font-size:95%; padding-left:4px;"> About this data </span>
                </p>
            </div>
            <!-- <div id="loading" v-else>
            </div> -->
      </div>
  </div>
  <travel-advisory />
</template>

<script>
import TravelAdvisory from "./TravelAdvisory.vue";

export default {
    name: 'SearchedCountry',
    
    components: {
        TravelAdvisory,
    },
    
    data() {
        return {

            country: this.$route.params.country,

            totalConfirmedCases: 0,
            totalActiveCases: 0,
            totalDeaths: 0,
            totalRecovered: 0,
            stringencyIdx: 0,
        
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
        },

        getDate() {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 2);
            return currentDate.toISOString().slice(0, 10);
        },

        async calcStringency() {
            var mapper = {
                'Australia': 'AUS',
                'Denmark': 'DNK',
                'Finland': 'FIN',
                'Malaysia': 'MYS',
                'South Korea': 'KOR',
                'United States': 'USA',
                'United Kingdom': 'GBR'
            };

            let url = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/" + mapper[this.country] + "/" + this.getDate();

            let received = await fetch(url);
            let data = await received.json();
            return data
        }

    },
  
    created() {
        this.fetchData(this.country).then((res) => {
            console.log('success', res);
            this.cache = res;
            this.$nextTick(() => this.savingHistoricalData());
        });
        this.calcStringency().then((result) => {
            console.log('stringency Success', result);
            this.stringencyIdx = result['stringencyData']['stringency']
        });
    },

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

.top_header {
    height: auto;
    position: relative;
}

.col {
    width: 100%;
    height: auto;
}

.container {
    width: 100%;
    height: 220px;
    left: 1%;
}

.box {
    position: relative;
    top: 15px;
    width: 18%;
    height: calc(200px - 30px);
    background: #FFFFFF;
    float: left;
    margin: 1%;
    border: 2px solid #8CACCB;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
    display: inline-block;
}

.box:hover {
   border-color: red;
}

.container .box {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    background: white;
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

.content {
    text-align: center;
    vertical-align: middle;
    font-weight: bold;
}

h5 {
    text-align: center;
    font-size: 100%;
}
</style>
