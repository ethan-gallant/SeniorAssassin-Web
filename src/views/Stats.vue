<template>
   <div>
       <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Getting Stats</span></div>
       <div class="stats">
           <div class="stats-title has-text-centered">
               <h1>sTATS</h1>
           </div>
           <div class="btn-wrapper has-text-centered">
               <router-link to="/dashboard" class="brk-btn-grey brk-btn">Return to Dashboard</router-link>
           </div>
           <div v-if="this.topkills" class="top-kills has-text-centered">
               <h1>Top Assassins</h1>
               <div class="columns top-kills-list">
                   <div v-for="kill in this.topkills" class="column">
                       <img class="top-killers-img" :src="kill.url" alt="">
                       <h2>{{kill.name_first}} {{kill.name_last}}</h2>
                       <h2>Kills: {{kill.kills.low}}</h2>
                   </div>
               </div>
           </div>
           <div v-if="this.fallen" class="top-kills has-text-centered">
               <h1>Fallen comrades</h1>
               <h2>Total Deaths: {{fallen.length}}</h2>
               <div class="columns  is-multiline top-fallen-list">
                   <div v-for="dead in this.fallen" class="column is-one-quarter">
                       <img class="top-fallen-img" :src="dead.url" alt="">
                       <h2>{{dead.name_first}} {{dead.name_last}}</h2>
                       <h2>Kills: {{dead.kills.low}}</h2>
                   </div>
               </div>
           </div>
       </div>

   </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Stats",
        data: ()=>{
            return{
                loading: true,
                topkills: null,
                fallen: null,

            }
        },
        mounted() {
            let _this = this;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + _this.$cookies.get("session")
                }
            }
            this.loading = true;
            axios.get('https://saapi.excl.dev/stats/top/kills', config).then((response)=>{
                _this.topkills = response.data.data
            }).catch(()=>{
                Swal.fire('Failed', 'Could Not Load Top Kills', 'error').then(() =>{
                    _this.$router.push({path: '/'})
                })
            })
            axios.get('https://saapi.excl.dev/stats/dead', config).then((response)=>{
                _this.fallen = response.data.data
                _this.loading = false;
            }).catch(()=>{
                Swal.fire('Failed', 'Could Not Load Deaths', 'error').then(() =>{
                    _this.$router.push({path: '/'})
                })
            })
        }
    }
</script>

<style scoped>
    .stats{
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }
    .stats-title {
        padding-top: 10vh;
        width: 100%;
        font-size: 3em;
        font-family: 'mad_hackerregular', sans-serif;
    }
    .top-kills {
        padding-top: 5vh;
        width: 100%;
        font-size: 2em;
        font-family: 'mad_hackerregular', sans-serif;
    }
    .top-killers-img{
        width: 50%;
    }
    .top-kills-list{
        font-family: 'Cabin', sans-serif;
    }
    .top-fallen-list{
        font-size: .5em;
        font-family: 'Cabin', sans-serif;
    }
    .top-fallen-img{
        width: 50%;
    }
</style>