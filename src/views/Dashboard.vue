<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Logging In Please Wait</span></div>
        <div class="dashboard has-text-centered">
            <h1 class="Dashboard-title">sENIOR aSSASSIN</h1>

            <div class="container">
                <div class="columns">
                    <div class="column is-one-third">
                        <div v-if="target">
                            <img :src="target.url" alt="" class="picture">
                        </div>
                        <div v-else>
                            <img class="nopicture" alt="No Picture" src="../assets/img/nopicture.jpg"/>

                        </div>

                    </div>
                    <div class="column is-two-thirds target has-text-left-desktop">
                        <div v-if="target">
                            <h2>Target: {{target.FirstName}} {{target.LastName}}</h2><br>

                            <a href="#" class="brk-btn">Submit Assassination</a>
                        </div>
                    </div>


                </div>
                <div class="columns">
                    <div class="column">
                        <div class="btn-wrapper">
                            <a href="#" class="brk-btn brk-btn-gold">Shop</a>
                        </div>
                    </div>
                    <div class="column">
                        <div class="btn-wrapper">
                            <a href="#" class="brk-btn-red brk-btn">Open targets</a>
                        </div>
                    </div>
                    <div class="column">
                        <div class="btn-wrapper">
                            <a href="#" class="brk-btn-blue brk-btn">Stats</a>
                        </div>
                    </div>

                    <div class="column">
                        <div class="btn-wrapper">
                            <router-link to="/rules" class="brk-btn-grey brk-btn">Rules</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Vue from "vue";

    export default {
        name: "Dashboard",
        data: () => {
            return {
                target: null,
                loading: false

            }
        },
        mounted() {
            let _this = this;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + Vue.$cookies.get("session")
                }
            }
            this.loading = true
            axios.get('https://saapi.excl.dev/api/game/current-target', config)
                .then(function (response) {

                    _this.target = response.data
                    _this.loading = false;
                })
                .catch(function (error) {

                    _this.$router.push({path: '/error?title=Target Not Found&message=Target was not returned try clearing your cookies if issue persists please contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                })

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
</style>