<template>
    <div class="pageloader is-active is-dark"><span class="title">Logging In Please Wait</span></div>
</template>

<script>
    export default {
        name: "SetToken",
        mounted() {
            let urlParams = new URLSearchParams(window.location.search);
            urlParams.forEach((val, key) => {p
                //there is probably a better way to do this but this is my way
                if(key === "token"){
                    this.$cookies.set('session', val);
                    this.$router.push({path: '/dashboard'})

                }else{
                    this.$router.push({path: '/error?title=Token Not Found&message=Target was not returned try clearing your cookies if issue persists please contact support&buttonPath=/&buttonMessage=Return To Home'})
                }
            })
        }
    }
</script>

<style scoped>

</style>