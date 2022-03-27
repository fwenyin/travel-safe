<template>
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
        <div class='riskAssBox' style="background-color:#A03F3E; border-style:solid; border-color:black; border-width: 8px;">
            <h1> 4 </h1>
            <h3> Very High Level </h3>
            <p> Avoid travel </p>
        </div>
    </section>

    <div class='header'>
        Travel Notice
    </div>
        
    <div class='travelNotice'>
        <li v-for="doc in travelNotice" :key="doc.id">
            {{ doc }}<br>
        </li>
    </div>

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
        </form>         
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
            travelLanes: [],
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
                console.log(doc.id, " => ", doc.data().travelNotice);
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
            })
        },
            
        async getLanes() {
            let y = await getDocs(collection(db, "TravelLanes"));
            y.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.travelLanes.push(doc.data());
        }); 
        }
    },

    created() {
        this.getNotice("Korea");
        this.getDocuments("Korea");
        this.getLanes("Korea");
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

.docsCheckList {
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
    margin-top: 25px;
    margin-right: 15px;
    
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

</style>
