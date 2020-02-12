<template>
    <div class="dashboard has-text-centered">
        <h1 class="Dashboard-title">Admin Dashboard</h1>

        <div class="container">
            <div class="columns">
                <div class="column">
                    <div class="btn-wrapper">
                        <router-link to="/admin/pendingkills" class="brk-btn brk-btn-red">Pending Kills</router-link>
                    </div>
                </div>
                <div class="column">
                    <div class="btn-wrapper">
                        <router-link to="/admin/allstudents" class="brk-btn brk-btn-blue">All Students</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard"
    }
</script>

<style scoped>
    .dashboard {
        background-image: url("../../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }

    .Dashboard-title {
        padding-top: 10vh;
        width: 100%;
        font-size: 3em;
        font-family: 'mad_hackerregular', sans-serif;
    }
</style>