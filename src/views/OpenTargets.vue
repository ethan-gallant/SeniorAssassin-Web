<template>
    <div class="open-targets">
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Getting Targets</span></div>
        <div class="open-targets-title has-text-centered">
            <h1>Open Targets</h1>
        </div>
        <div class="btn-wrapper has-text-centered">
            <router-link to="/dashboard" class="brk-btn-grey brk-btn">Return to Dashboard</router-link>
        </div>
        <div class="open-targets-students container">
            <div class="columns  is-multiline open-targets-list">
                <div v-if="targets" v-for="target in this.targets" class="column is-one-third has-text-centered">
                    <img class="open-targets-img" :src="target.url" alt="">
<!--                    <img class="open-targets-img" src="../assets/img/nopicture.jpg" alt="">-->
                    <h2>{{target.name_first}} {{target.name_last}}</h2>
                    <a @click="submitKill(target.email)" class="brk-btn">Submit Assassination</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2/src/sweetalert2.js'
    export default {
        name: "OpenTargets",
        data: () => {
            return {
                targets: null,
                loading: true,
            }
        },
        mounted() {
this.loading = true;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$cookies.get("session")
                }
            };
            let _this = this;
            axios.get('https://saapi.excl.dev/opentargets', config)
                .then((response) => {
                    _this.loading = false;
                    _this.targets = response.data.data;
                })
                .catch((error) => {
                    Swal.fire('Error', 'Open Targets Could Not Load', 'error').then(() =>{
                        _this.$router.push({path: '/dashboard'})
                    })
                    console.log(error);
                });
        },
        methods:{
            submitKill(target){
                this.$router.push({ path: '/submitkill', query: { target: target, type: '1' } })
            }
        }
    }
</script>

<style scoped>
    .open-targets {
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }

    .open-targets-title {
        padding-top: 10vh;
        width: 100%;
        font-size: 3em;
        font-family: 'mad_hackerregular', sans-serif;
    }
    .open-targets-list h2{
        font-size: 1.5em;
        margin-bottom: 5px;
    }
    .open-targets-img{
        width: 50%;
    }
</style>