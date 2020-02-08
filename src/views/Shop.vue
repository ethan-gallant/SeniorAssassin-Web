<template>
    <div class="has-text-centered shop">
            <div class="shop-header">
                <h1>Shop</h1>
            </div>
        <div class="columns">
            <div class="column">
                <img src="../assets/img/shop/hide.png" class="shop-icon" alt="">
                <p class="shop-desc">Hide Your Picture</p>
                <div class="btn-wrapper">
                    <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                </div>
            </div>
            <div class="column">
                <img src="../assets/img/shop/school.png" alt="" class="shop-icon">
                <p class="shop-desc">Hire A Teacher</p>
                <div class="btn-wrapper">
                    <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                </div>
            </div>
            <div class="column">
                <img src="../assets/img/shop/search.png" alt="" class="shop-icon">
                <p class="shop-desc">See who's your assassinator</p>
                <div class="btn-wrapper">
                    <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                </div>
            </div>
        </div>
        <div class="btn-wrapper">
            <a href="#" class="brk-btn brk-btn-green">Return To Dashboard</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Shop"
    }
</script>

<style scoped>
    .shop{
        padding-top: 15vh;
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }
    .shop-header{
        color: red;
        font-family: 'mad_hackerregular', sans-serif;
        font-size: 2em;
        margin-bottom: 50px;
    }
    .shop-icon{
        padding: 20px;
        margin: auto;
        width: 25%;
        background-color: white;
        border-radius: 10px;

    }
    .shop-desc{
        font-size: 1.2em;
    }
</style>