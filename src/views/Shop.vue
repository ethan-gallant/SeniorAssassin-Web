<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Loading Shop</span></div>
        <div class="has-text-centered shop">
            <div class="shop-header">
                <h1>Shop</h1>
            </div>
            <div class="columns" v-if="products">
                <div class="column">
                    <img src="../assets/img/shop/hide.png" class="shop-icon" alt="">
                    <h2 class="shop-desc">Hide Your Picture</h2>
                    <p class="shop-cost">Cost: {{products["hidden-photo"].cost}}</p>
                    <div class="btn-wrapper">
                        <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                    </div>
                </div>
                <div class="column">
                    <img src="../assets/img/shop/school.png" alt="" class="shop-icon">
                    <h2 class="shop-desc">Hire A Teacher</h2>
                    <p class="shop-cost">Cost: {{products["teacher-assassin"].cost}}</p>
                    <div class="btn-wrapper">
                        <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                    </div>
                </div>
                <div class="column">
                    <img src="../assets/img/shop/search.png" alt="" class="shop-icon">
                    <p class="shop-desc">See who's your assassinator</p>
                    <p class="shop-cost">Cost: {{products["teacher-assassin"].cost}}</p>
                    <div class="btn-wrapper">
                        <a href="#" class="brk-btn brk-btn-gold">Purchase</a>
                    </div>
                </div>
            </div>
            <div class="btn-wrapper">
                <router-link to="/dashboard" class="brk-btn brk-btn-green">Return To Dashboard</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Shop",
        data: () => {
            return {
                loading: false,
                products: null
            }

        },
        mounted() {
            let _this = this;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$cookies.get("session")
                }
            }
            this.loading = true
            axios.get('https://saapi.excl.dev/shop/products', config)
                .then(function (response) {

                    _this.products = response.data;
                    _this.loading = false;
                })
                .catch(function (error) {

                    _this.$router.push({path: '/error?title=Error&message=Shop was unable to load please try again and if issue persists contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                })
        }
    }
</script>

<style scoped>
    .shop {
        padding-top: 15vh;
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }

    .shop-header {
        color: red;
        font-family: 'mad_hackerregular', sans-serif;
        font-size: 2em;
        margin-bottom: 50px;
    }

    .shop-icon {
        padding: 20px;
        margin: auto;
        width: 25%;
        background-color: white;
        border-radius: 10px;

    }

    .shop-desc {
        font-size: 1.2em;
    }
</style>