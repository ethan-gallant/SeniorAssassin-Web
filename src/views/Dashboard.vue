<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Getting Target</span></div>
        <div class="dashboard has-text-centered">
            <h1 class="Dashboard-title">sENIOR aSSASSIN</h1>

            <div class="container">
                <div v-if="hasTarget" class="columns">
                    <div class="column is-one-third">

                            <img v-if="!hidePhoto" :src="url" alt="" class="picture">


                            <img v-if="hidePhoto" class="nopicture" alt="No Picture" src="../assets/img/nopicture.jpg"/>


                    </div>
                    <div v-if="!dead" class="column is-two-thirds target has-text-left-desktop">
                        <div v-if="target">
                            <h2>Target: {{target.name_first}} {{target.name_last}}</h2><br>


                            <router-link v-if="!killed" to="/submitKill" class="brk-btn">Submit Assassination</router-link>
                            <p v-else>Pending Approval</p>
                        </div>
                    </div>


                </div>
                <div v-if="dead">
                    <h1 class="has-text-centered">Your are dead</h1>
                </div>
                <div class="columns" >
                    <div class="column" v-if="!dead">
                        <div class="btn-wrapper">
                            <router-link to="/shop" class="brk-btn brk-btn-gold">Shop</router-link>
                        </div>
                    </div>
                    <div class="column">
                        <div class="btn-wrapper">
                            <router-link to="/stats" class="brk-btn brk-btn-blue">Stats</router-link>
                        </div>
                    </div>

                    <div class="column" v-if="isAdmin()">
                        <div class="btn-wrapper">
                            <router-link to="/admin/pendingkills" class="brk-btn-red brk-btn">Admin</router-link>
                        </div>
                    </div>

                    <div class="column">
                        <div class="btn-wrapper" >
                            <router-link to="/rules" class="brk-btn-grey brk-btn">Rules</router-link>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="columns" v-if="assassinFirstName">
                            <div class="column">
                                <img v-if="!assassinHidden" class="assassin-picture" :src="assassinUrl" alt="">
                                <img v-if="assassinHidden" class="assassin-picture" src="../assets/img/nopicture.jpg" alt="">
                                <h2 class="reveal-assassin">
                                    Your Assassin: {{assassinFirstName}} {{assassinLastName}}
                                </h2>
                            </div>
                        </div>

                    </div>
                    <div class="column">
                        <h1 class="safe">How to stay safe: Holding Hands With Freshman</h1>
                        <p>Effective Until Midnight Feb 12</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2/src/sweetalert2.js'
    import Vue from "vue";
    export default {
        name: "Dashboard",
        data: () => {
            return {
                target: null,
                url: '#',
                hidePhoto: false,
                loading: false,
                hasTarget: false,
                dead: false,
                assassinFirstName: null,
                assassinLastName: null,
                assassinUrl: null,
                assassinHidden: null,


            }
        },
        mounted() {
            let _this = this;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + _this.$cookies.get("session")
                }
            }
            this.loading = true
            axios.get('https://saapi.excl.dev/me/', config).then((response)=>{
                _this.dead = response.data.dead
            }).catch(()=>{
                Swal.fire('Failed', 'Unable to load user', 'error').then(() =>{
                    _this.$router.push({path: '/'})
                })
            })
            axios.get('https://saapi.excl.dev/me/targets/current', config)
                .then(function (response) {
                console.log(response)
                    if(!response.data){
                        _this.loading = false;
                        _this.hasTarget = false;
                        return;

                    }
                    _this.hasTarget = true;
                    _this.target = response.data;
                    _this.url = response.data.url;
                    _this.hidePhoto = response.data.photo_hidden;
                    _this.killed = response.data.killed;
                    _this.loading = false;
                })
                .catch(function (error) {
console.log(error)
                    _this.$router.push({path: '/error?title=Target Not Found&message=Target was not returned try clearing your cookies if issue persists please contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                })
            axios.get('https://saapi.excl.dev/me/expose-assassin', config).then((response)=>{
                 _this.assassinHidden = response.data.photo_hidden;
                 _this.assassinFirstName = response.data.name_first;
                 _this.assassinLastName = response.data.name_last;
                 _this.assassinUrl = response.data.url;
            })

        },
        methods:{
            isAdmin(){
                return JSON.parse(atob(Vue.$cookies.get("session").split('.')[1])).is_admin;
            }
        }
    }
</script>

<style scoped>
    .dashboard {
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }

    .Dashboard-title {
        padding-top: 10vh;
        width: 100%;
        font-size: 3em;
        font-family: 'mad_hackerregular', sans-serif;
    }

    .nopicture {
        width: 50%;
    }

    .picture {
        width: 50%;
    }

    .target h2 {
        font-size: 2em;
    }
    .safe{
        font-size: 1.5em;
    }
    .assassin-picture{
        width: 50%;
    }
    .reveal-assassin{
        font-size: 2em;
    }
</style>