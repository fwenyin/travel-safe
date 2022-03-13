<template>

    <select v-model="countrySearch">
        <option value='AUS'> Australia </option>
        <option value='USA'> United States </option>
        <option value='GBR'> United Kingdom </option>
        <option value='DNK'> Denmark </option>
        <option value='FIN'> Finland </option>
        <option value='MYS'> Malaysia </option>
        <option value='KOR'> Republic of Korea </option>
        
    </select> 
    <button id='submitBtn' v-on:click.prevent="getRiskAssLevel()"> Submit </button>
    <br><br>    

    <div class='header'>
        COVID-19 Risk Assessment Level
    </div>

    <section class='riskAssLevel'>
        <div class='riskAssBox' style="background-color:#FAD890">
            <h1> 1 </h1>
            <h3> Low Level </h3>
            <p> Make sure you are fully vaccinated </p>
        </div>
        <div class='riskAssBox' style="background-color:#E18942">
            <h1> 2 </h1>
            <h3> Moderate Level </h3>
            <p> Make sure you are fully vaccinated. Unvaccinated travelers with increased risk should avoid nonessential travel </p>
        </div>
        <div class='riskAssBox' style="background-color:#D35836">
            <h1> 3 </h1>
            <h3> High Level </h3>
            <p> Make sure you are fully vaccinated. Unvaccinated travelers should avoid nonessential travel </p>
        </div>
        <div class='riskAssBox' style="background-color:#A03F3E">
            <h1> 4 </h1>
            <h3> Very High Level </h3>
            <p> Avoid travel </p>
        </div>
    </section>

    <div class='header'>
        {{countrySearch}} 
        Travel Notice
    </div>
        
    <div class='travelNotice'>
        <div v-for="item in items" :key="item.id">
            <li v-for="notice in item.travelNotice" :key="notice">
            {{ notice }}
            </li>
        </div>
    </div>

    <section class=docsLanesComb>
        <div class='header' id="docsLanes">
            Documents CheckList
                <div id="details" v-for="item in items" :key="item.id">
                    <li v-for="doc in item.documents" :key="doc">
                    {{ doc.doc}}
                    {{ doc.link }}
                    </li>
                </div>
            </div>

        <div class='header' id="docsLanes">
            Available Travel Lanes
            <div id="details" v-for="item in items" :key="item.id">
                    <div v-for="lane in item.travelLane" :key="lane">
                        <li v-for="detail in lane" :key="detail">
                            <u>Eligibility</u><br>
                            {{ detail.eligibility }}
                        </li>
                        
                        <li v-for="detail in lane" :key="detail">
                            <u>Application</u><br>
                                <u>Singapore Citizens (SC) / Permanent Residents (PR)</u><br>
                                    {{ detail.application.sgpr }}<br>
                                <u>Foreign Visitors (e.g. Short-Term Visitors / Long-Term Pass Holders)</u><br>
                                    {{ detail.application.foreigner }}<br>
                        </li>
                    </div>
                </div>
        </div>
    </section>


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
        }
    },
    methods: {
        async display() {
            let z = await getDocs(collection(db, "TravelAdvisory"));
            z.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.items.push(doc.data());
            }); 
        },
    },

    created() {
        this.display();
    }
}
</script>

<style scoped>
.header {
    text-align: center;
    vertical-align: middle;
    line-height: 45px;
    background-color: black;
    color: white;
    font-size: 22px;
    font-weight: bold;
    height: 45px;
    left: 48px;
    top: 1389px;
    margin-bottom: 8px;
    margin-top: 8px;
}

.riskAssLevel {
    color: white;
    display: flex;
}

.riskAssBox {
    float: left;
    width: 25%;
    height: 200px;
}

.travelNotice {
    background-color: #E5E5E5
}

.docsLanesComb {
    display: flex; 
}

#docsLanes {
    float: left;
    width: 50%;
    margin-right: 2px;
}

#details {
    background-color: #AEC4DA;
    margin-top: 8px;
}

h1 {
    font-size: 55px;
    margin-top: 10px;
    margin-bottom: 0px;
}
h3 {
    font-size: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
}

p {
    margin-top: 10px;
    color: black;
    font-size: 14px;
}

li {
    text-align: left;
    margin-right: 5px;
    margin-left: 5px;
    color: black;
    font-size: 14px;
}    

</style>