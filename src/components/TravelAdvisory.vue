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

    <div class='docs'>
        <div class='docsCheckList'>
            <div class='header'>
                Documents Checklist & Calculator
            </div>
    
            <form class='docsCheckListForm' v-for="doc in travelDocs" :key="doc.id">
                <input class="checkbox" id="docID" type="checkbox" :value="doc.doc" v-model="checkedDocs">
                <label for="docID" class="docName">
                    {{ doc.doc }}
                </label>

                <span class="cost">
                    <b>$</b>{{ doc.cost }}
                </span>

                <a v-bind:href="''+doc.link+''" target="_blank"><i class="fa-solid fa-circle-chevron-right"></i></a>
                <div class="docDesc"> 
                    {{ doc.desc }} 
                </div> <br>

                <hr>
            </form>

            <div class='totalCost'>
                <hr style="margin-bottom:10px;margin-left:30px;margin-right:-5px;color:black;height:2px">
                Budget to Prepare : ${{ getTotalSum - payableSum }}
            </div>       
        </div>
    </div>
    <br>

    <div class='header'>
        Available Travel Lanes
    </div>

    <div class='travelLanes'>
        <div class='vtlAirBox'>
                <button :disabled=!this.travelLaneBool.vtlAir class="btn btn-primary btn-lg btn-block" data-toggle="collapse" 
                    data-target="#vtlAirName" aria-expanded="false" aria-controls="vtlAirName">
                    <i v-if="!this.travelLaneBool.vtlAir" class="fa-solid fa-circle-xmark"></i>
                    <i v-if="this.travelLaneBool.vtlAir" class="fa-solid fa-circle-check"></i>
                    {{ this.vtlAirData.laneName }}
                </button>
                <hr class='travelLaneBreak'>

            <div class='eligibility collapse' id="vtlAirName" data-parent="vtlAirBox">
                <strong><u>Eligibility</u></strong><br>
                {{ this.vtlAirData.eligibility }}
                <br>

                <div class='application' id="vtlAirapplication">
                    <br>
                    <strong><u>Application</u></strong><br>
                    
                    <button class="btn btn-primary" type="button" data-toggle="collapse" 
                        data-target="#vtlAirscpr" aria-expanded="false" aria-controls="#vtlAirscpr" > 
                        Singapore Citizens (SC) / Permanent Residents (PR)</button> &nbsp;&nbsp;

                    <button class="btn btn-primary" type="button" data-toggle="collapse" 
                        data-target="#vtlAirforeigner" aria-expanded="false" aria-controls="#vtlAirforeigner">
                        Foreign Visitors</button>
        
                    <div class="collapse" id="vtlAirscpr" data-parent="#vtlAirapplication" style="padding-top: 5px">
                        {{ this.vtlAirData.application.scpr }}
                    </div>

                    <div class="collapse" id="vtlAirforeigner" data-parent="#vtlAirapplication" style="padding-top: 5px">
                        {{ this.vtlAirData.application.foreigner }}
                    </div>
                </div>
            </div>
        </div>


        <section class='vtlLandBox'>
            <div class='travelLaneName' id='vtlLand'>
                <button :disabled="!this.travelLaneBool.vtlLand" class="btn btn-primary btn-lg btn-block" data-toggle="collapse" 
                    data-target="#vtlLandName" aria-expanded="false" aria-controls="vtlLandName">
                    <i v-if="!this.travelLaneBool.vtlLand" class="fa-solid fa-circle-xmark"></i>
                    <i v-if="this.travelLaneBool.vtlLand" class="fa-solid fa-circle-check"></i>
                    {{ this.vtlLandData.laneName }}
                </button>
                <hr class='travelLaneBreak'>
            </div>

            <div class='eligibility collapse' id="vtlLandName" data-parent="vtlLandBox">
                <strong><u>Eligibility</u></strong><br>
                {{ this.vtlLandData.eligibility }}

                <div class='application' id="vtlLandapplication">
                    <br>
                    <strong><u>Application</u></strong><br>
                    
                    <button class="btn btn-primary" type="button" data-toggle="collapse" 
                        data-target="#vtlLandscpr" aria-expanded="false" aria-controls="#vtlLandscpr" > 
                        Singapore Citizens (SC) / Permanent Residents (PR)</button> &nbsp;&nbsp;

                    <button class="btn btn-primary" type="button" data-toggle="collapse" 
                        data-target="#vtlLandforeigner" aria-expanded="false" aria-controls="#vtlLandforeigner">
                        Foreign Visitors</button>
        
                    <div class="collapse" id="vtlLandscpr" data-parent="#vtlLandapplication" style="padding-top: 5px">
                        {{ this.vtlLandData.application.scpr }}
                    </div>

                    <div class="collapse" id="vtlLandforeigner" data-parent="#vtlLandapplication" style="padding-top: 5px">
                        {{ this.vtlLandData.application.foreigner }}
                    </div>
                </div>
            </div>
        </section>


        <section class='pcaBox'>
            <div class='travelLaneName' id='pca'>
                <button :disabled=!this.travelLaneBool.pca class="btn btn-primary btn-lg btn-block" data-toggle="collapse" 
                    data-target="#pcaName" aria-expanded="false" aria-controls="pcaName">
                    <i v-if="!this.travelLaneBool.pca" class="fa-solid fa-circle-xmark"></i>
                    <i v-if="this.travelLaneBool.pca" class="fa-solid fa-circle-check"></i>
                    {{ this.pcaData.laneName }}
                </button>
                <hr class='travelLaneBreak'>
            </div>

            <div class='eligibility collapse' id="pcaName" data-parent="pcaBox">
                <strong><u>Eligibility</u></strong><br>
                {{ this.pcaData.eligibility }}

                <div class='application'>
                    <br>
                    <strong><u>Application</u></strong><br>
        
                    <div style="padding-top: 5px">
                        {{ this.pcaData.application }}
                    </div>

                </div>
            </div>
        </section>


        <section class='rglBox'>
            <div class='travelLaneName' id='rgl'>
                <button :disabled=!this.travelLaneBool.rgl class="btn btn-primary btn-lg btn-block" data-toggle="collapse" 
                    data-target="#rglName" aria-expanded="false" aria-controls="rglName">
                    <i v-if="!this.travelLaneBool.rgl" class="fa-solid fa-circle-xmark"></i>
                    <i v-if="this.travelLaneBool.rgl" class="fa-solid fa-circle-check"></i>
                    {{ this.rglData.laneName }}
                </button>
                <hr class='travelLaneBreak'>
            </div>

            <div class='eligibility collapse' id="rglName" data-parent="rglBox">
                <strong><u>Eligibility</u></strong><br>
                {{ this.rglData.eligibility }}

                <div class='application'>
                    <br>
                    <strong><u>Application</u></strong><br>
        
                    <div style="padding-top: 5px">
                        {{ this.rglData.application }}
                    </div>

                </div>
            </div>
        </section>
    </div>

    <br><br><br><br>
    <Footer/>
        
</template> 


<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, where, query } from "firebase/firestore";
const db = getFirestore(firebaseApp);
import Footer from '../components/Footer.vue'

export default {
    data() {
        return {
            country: this.$route.params.country,

            travelLaneData: {},
            travelNotice: {},
            travelDocs: {},
            travelLaneBool: {},
            vtlAirData: [],
            vtlLandData: [],
            pcaData: [],
            rglData: [],
            checkedDocs: [],
        }
    },
    components: {
        Footer,
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
                console.log(doc.id, " => ", doc.data().documents);
                this.travelDocs = doc.data().documents; 
                console.log(JSON.parse(JSON.stringify(this.travelDocs)))          
            })
        },

        async getVTLAirData() {
            const a = query(collection(db, "TravelLanes"), where("lane", "==", "vtlAir"));
            const querySnapshot = await getDocs(a);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                this.vtlAirData = doc.data();
            })
            return this.vtlAirData
        },

        async getVTLLandData() {
            const b = query(collection(db, "TravelLanes"), where("lane", "==", "vtlLand"));
            const querySnapshot = await getDocs(b);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                this.vtlLandData = doc.data();
            })
            return this.vtlLandData
        },

        async getpcaData() {
            const c = query(collection(db, "TravelLanes"), where("lane", "==", "pca"));
            const querySnapshot = await getDocs(c);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                this.pcaData = doc.data();
            })
            return this.pcaData
        },

        async getrglData() {
            const d = query(collection(db, "TravelLanes"), where("lane", "==", "rgl"));
            const querySnapshot = await getDocs(d);
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                this.rglData = doc.data();
            })
            return this.rglData
        },

        async getLaneBool(c) {
            this.country = c
            const x = query(collection(db, "TravelAdvisory"), where("countryName", "==", c));
            const querySnapshot = await getDocs(x);
            querySnapshot.forEach((doc) => {
                //console.log("travel lane boolean" + doc.id, " => ", doc.data().travelLane);
                this.travelLaneBool = doc.data().travelLane;
            })
            return this.travelLaneBool
        }
                    
    },

    computed: {
        payableSum() { 
            let sum = 0

            if(this.checkedDocs.length == 0) {
                return sum
            }
            for (var z = 0; z < this.checkedDocs.length; z++) {
                const doc = this.travelDocs.filter(x => x.doc === this.checkedDocs[z]);
                var cost = doc[0].cost; 
                sum += parseFloat(cost);
            }
            return sum;
        },
            
        getTotalSum() {
            let totalSum = 0
            for (var i = 0; i < this.travelDocs.length; i++) {
                var cost = this.travelDocs[i].cost; 
                totalSum += parseFloat(cost);
            }
            return totalSum;
        }
        },


    created() {
        this.getNotice(this.country);
        this.getDocuments(this.country);
        this.getLaneBool(this.country);
        this.getVTLAirData();
        this.getVTLLandData();
        this.getpcaData();
        this.getrglData();
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
    margin-left: 30px;
    margin-right: 30px;
}

.totalCost {
    margin-left: 30px;
    margin-right: 30px;
}

.riskAssLevel {
    color: white;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 25px;
    margin-right: 25px;
}

.riskAssBox {
    float: left;
    width: 25%;
    height: 200px;
}

.travelNotice {
    background-color: #E5E5E5;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
}

.cost {
    float: right;
    margin-top: 30px;
    font-size: 22px;
    text-align: right;
    margin-right: 30px;
    width: 8%;
}

.docsCheckListForm {
    background-color: #AEC4DA8F;
    margin-left: 30px;
    margin-right: 30px;
}

.totalCost {
    background-color: #AEC4DA8F;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 23px;
    font-weight: bolder;
    color: darkslategray;
    text-align: right;
    padding-right: 30px;
}


.vtlAirBox,
.vtlLandBox,
.pcaBox,
.rglBox {
    background-color: #AEC4DA8F;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-left: 30px;
    margin-right: 30px;
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

input[type=checkbox]:checked + label {
    text-decoration-thickness: 2px;
    text-decoration-color: black;
    color:#828282;  
}

.docName {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    margin-bottom: 5px;
    margin-top: 15px;
}

.docDesc {
    color: #5B5B5B;
    font-size: 18px; 
    text-align: left;
    margin-left: 52px;
    margin-top: 0px;
    margin-right: 30px;
}

.fa-circle-chevron-right {
    font-size: 30px; 
    vertical-align: middle;
    color: #394F73; 
    float: right;
    margin-top: 32px;
    margin-right: 20px;
}

#details {
    background-color: #AEC4DA;
    margin-top: 8px;
    margin-left: 10px;
    color: black;
    font-size: 18px;
    text-align: left;
}

.btn-primary {
    background-color: #8CACCB;
    font-weight: bold;
    border: none;
    margin-bottom: 0px;
    margin-top: 5px;
    font-size: 18px;
}

.fa-circle-xmark {
    font-size: 28px;
    padding-right: 10px;
    vertical-align: middle;
    color: #FF0000;
}

.fa-circle-check {
    font-size: 28px;
    padding-right: 10px;
    vertical-align: middle;
    color: #008000;
}

.btn-primary:hover, .btn-primary:active, .btn-primary:focus {
    background-color: rgb(209, 207, 207) !important;
    border-color: none !important;
    box-shadow: none !important;
    color: white !important;
}

.btn-block {
    color: black;
    font-weight: bold;
    background-color: #D2DEEA;
    border: none;
    margin-bottom: 0px;
    margin-top: 0px;
    font-size: 20px;
}

.btn-block:disabled {
    color: #828282;
    font-weight: bold;
    background-color: #D2DEEA;
    border: none;
    margin-bottom: 0px;
    margin-top: 0px;
}

.btn-block:hover, .btn-block:active, .btn-block:focus {
    background-color: #AEC4DA !important;
    border-color: none !important;
    box-shadow: none !important;
    color: black !important;

}

.eligibility {
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: justify;
    font-size: 18px;
}

.application {
    padding-bottom: 10px;
}

.travelLaneBreak {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 5px;
    margin-top: 0px;
    color: #828282;
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
    font-size: 18px;
    text-align: center;
}

li {
    text-align: left;
    margin-right: 5px;
    margin-left: 5px;
    color: black;
    font-size: 18px;
}    

label,input{
    display: inline-block;
    vertical-align: middle
}

hr {
    margin-left: 50px;
    margin-right: 25px;
    margin-bottom: 0px;
    margin-top: -10px;
    color: #828282;
}

</style>
