<template>
    <br>
    <div class='header'>
        COVID-19 Risk Assessment Level
    </div>

    <div class='riskAssLevel'>
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
        <div class='riskAssBox' style="background-color:#A03F3E; border-style:solid; border-color:black; border-width: 8px;">
            <h1> 4 </h1>
            <h3> Very High Level </h3>
            <p> Avoid travel </p>
        </div>
    </div>
    <br>

    <div class='header'>
        Travel Notice
    </div>
        
    <div class='travelNotice'>
        <li v-for="doc in travelNotice" :key="doc.id">
            {{ doc }}<br>
        </li>
    </div>
    <br>

        <div class='header'>
            Documents Checklist 
        </div>

        <div class='docs'>
            <form class='docsCheckList' v-for="doc in travelDocs" :key="doc.id">
                <label>
                    <input class="checkbox" type="checkbox" value="">
                    <div class="docName">
                        {{ doc.doc }}
                    </div>
                    <a v-bind:href="''+doc.link+''" target="_blank"><i class="fa-solid fa-chevron-right"></i></a>
                    <div class="docDesc"> 
                        {{ doc.desc }} 
                    </div> <br>
                </label>
                <hr>
            </form>         
        </div>
        <br>

        <div class='header'>
            Available Travel Lanes
        </div>
        
        <div class='travelLanes'>
            <button class="btn btn-primary btn-lg btn-block" data-toggle="collapse" data-target="#travelLane" aria-expanded="true" aria-controls="travelLane" v-on:click="getLaneData(vtlAir)">
                {{ travelLaneData.laneName }}
            </button>

            <div id="travelLane" class="collapse show" data-parent="#travelLanes">
                <strong><u>Eligibility</u></strong><br>
                {{ travelLaneData.eligibility }}
                <div id="application">
                    <br>
                    <strong><u>Application</u></strong><br>

                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#scpr" aria-expanded="false" aria-controls="#scpr" > Singapore Citizens (SC) / Permanent Residents (PR)</button> &nbsp;&nbsp;
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#foreigner" aria-expanded="false" aria-controls="#foreigner">Foreigners</button>
                
                    <div class="application-details">
                        <div class="collapse" id="scpr" data-parent="#application" >
                            {{ travelLaneData.application.scpr }}
                        </div>

                        <div class="collapse" id="foreigner" data-parent="#application">
                            {{ travelLaneData.application.foreigner }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            

        
</template> 


<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, where, query } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            country: this.$route.params.country,

            travelLaneData: {},
            travelNotice: {},
            travelDocs: {},
        }
    },
    methods: {
        async getNotice(c) {
            this.country = c
            const q = query(collection(db, "TravelAdvisory"), where("countryName", "==", c));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data().travelNotice);
                this.travelNotice = doc.data().travelNotice;
            })
        },

        async getDocuments(c) {
            this.country = c
            const q = query(collection(db, "TravelAdvisory"), where("countryName", "==", c));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data().documents);
                this.travelDocs = doc.data().documents;
            })
        },

        async getLaneData(l) {
            this.lane = l
            const z = query(collection(db, "TravelLanes"), where("lane", "==", l));
            const querySnapshot = await getDocs(z);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                this.travelLaneData = doc.data();
            })
        }
    },

    created() {
        this.getNotice(this.country);
        this.getDocuments(this.country);
        this.getLaneData("vtlAir");
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

.docsCheckList, .travelLanes {
    background-color: #AEC4DA8F;
}

input[type=checkbox] {
    margin-left: 20px;
    margin-top: 25px;
    vertical-align: middle;
    transform: scale(2);
}

input[type=checkbox]:checked {
  accent-color: green;

}

.docName {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 5px;
    margin-top: 15px;
}

.docDesc {
    color: #5B5B5B;
    font-size: 14px; 
    text-align: left;
    margin-left: 52px;
    margin-top: 0px;
    margin-right: 30px;
}

.fa-chevron-right {
    font-size:24px; 
    color:black; 
    float: right;
    margin-top: 35px;
    margin-right: 15px;
}

.btn-primary {
    background-color: #8CACCB;
    border: none;
}



.travelLanes {
    padding-left: 10px;
    padding-right: 10px;
}

#details {
    background-color: #AEC4DA;
    margin-top: 8px;
    margin-left: 10px;
    color: black;
    font-size: 14px;
    text-align: left;
}

h1 {
    font-size: 55px;
    margin-top: 10px;
    margin-bottom: 0px;
    text-align: center;
}
h3 {
    font-size: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
}

p {
    margin-top: 10px;
    color: black;
    font-size: 14px;
    text-align: center;
}

li {
    text-align: left;
    margin-right: 5px;
    margin-left: 5px;
    color: black;
    font-size: 14px;
}    

label {
    display: block;
    width: 100%;
}

hr {
    margin-left: 50px;
    margin-right: 55px;
    margin-bottom: 0px;
    margin-top: -10px;
    color: grey;
}

</style>
