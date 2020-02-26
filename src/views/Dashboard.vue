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


                            <a v-if="!killed" @click="submitKill(target.email)" class="brk-btn">Submit Assassination</a>
                            <p v-else>Pending Approval</p>
                        </div>
                    </div>


                </div>
                <div v-if="dead">
                    <h1 class="has-text-centered">Your are dead</h1>
                </div>
                <div class="columns" >
                    <div class="column" v-if="showShop">
                        <div class="btn-wrapper">
                            <router-link to="/shop" class="brk-btn brk-btn-gold">Shop</router-link>
                        </div>
                    </div>
                    <div class="column">
                        <div class="btn-wrapper">
                            <router-link to="/stats" class="brk-btn brk-btn-blue">Stats</router-link>
                        </div>
                    </div>
                    <div class="column">
                        <div class="btn-wrapper" >
                            <router-link to="/rules" class="brk-btn-grey brk-btn">Rules</router-link>
                        </div>
                    </div>
                    <div class="column" v-if="!dead">
                        <div class="btn-wrapper">
                            <router-link to="/opentargets" class="brk-btn-red brk-btn">Bounty List</router-link>
                        </div>
                    </div>
                    <div class="column" v-if="isAdmin()">
                        <div class="btn-wrapper">
                            <router-link to="/admin" class="brk-btn-red brk-btn">Admin</router-link>
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
                        <h1 class="safe">How to stay safe: Could not read 'data' of undefined</h1>

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
                //Expose Assassin Vars
                assassinFirstName: null,
                assassinLastName: null,
                assassinUrl: null,
                assassinHidden: null,


            }
        },
        mounted() {
            let _this = this;
            this.loading = true
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + _this.$cookies.get("session")
                }
            }
            //Grab User Data
            axios.get('https://saapi.excl.dev/me/', config).then((response)=>{
                _this.dead = response.data.is_dead
            }).catch(()=>{
                Swal.fire('Failed', 'Unable to load user', 'error').then(() =>{
                    _this.$router.push({path: '/'})
                })
            })
            //Grab Current Target
            axios.get('https://saapi.excl.dev/me/targets/current', config)
                .then(function (response) {
                    //If User does not have a target, This is either because the user is dead or is an admin/not playing
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
                .catch((error) => {
                    Swal.fire('Failed', 'Unable To Load Target', 'error').then(() =>{
                        _this.$router.push({path: '/'})
                    })
                });
            //Expose Assassin Logic
            axios.get('https://saapi.excl.dev/me/expose-assassin', config).then((response)=>{
                 _this.assassinHidden = response.data.photo_hidden;
                 _this.assassinFirstName = response.data.name_first;
                 _this.assassinLastName = response.data.name_last;
                 _this.assassinUrl = response.data.url;
            }).catch((error) =>{
                // console.log(error)
            });

        },
        methods:{
            isAdmin(){
                return JSON.parse(atob(Vue.$cookies.get("session").split('.')[1])).is_admin;
            },
            isTeacher(){
                return JSON.parse(atob(Vue.$cookies.get("session").split('.')[1])).type === "teacher";
            },
            submitKill(target){
                this.$router.push({ path: '/submitkill', query: { target: target, type: '0' } })
            }
        },
        computed:{
            showShop(){
                return !this.dead && !this.isTeacher();
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
