<template>
    <div class="dashboard has-text-centered">
        <h1 class="Dashboard-title">sENIOR aSSASSIN</h1>

        <div class="container">
            <div class="columns">
                <div class="column is-one-third">

                    <img class="nopicture" alt="No Picture" src="../assets/img/nopicture.jpg"/>
                </div>
                <div class="column is-two-thirds target has-text-left-desktop">
                    <h2>Target: John Doe</h2><br>
                    <a href="#" class="brk-btn">Hire A Teacher</a>
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
                        <a href="#" class="brk-btn-grey brk-btn">Rules</a>
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
    .Dashboard-title {
        padding-top: 10vh;
        width: 100%;
        font-size: 3em;
        font-family: 'mad_hackerregular', sans-serif;
    }

    .nopicture {
        width: 50%;
    }

    .target h2 {
        font-size: 2em;
    }
</style>