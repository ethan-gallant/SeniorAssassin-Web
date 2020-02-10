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
                <div class="columns" v-if="!dead">
                    <div class="column">
                        <div class="btn-wrapper">
                            <router-link to="/shop" class="brk-btn brk-btn-gold">Shop</router-link>
                        </div>
                    </div>

<!--                    <div class="column">-->
<!--                        <div class="btn-wrapper">-->
<!--                            <a href="#" class="brk-btn-blue brk-btn">Stats</a>-->
<!--                        </div>-->
<!--                    </div>-->

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
    import Swal from 'sweetalert2/src/sweetalert2.js'
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