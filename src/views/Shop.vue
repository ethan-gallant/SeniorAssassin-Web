<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Loading Shop</span></div>
        <div v-if="products || user" class="has-text-centered shop">
            <div class="shop-header">
                <h1>Shop</h1>
            </div>
            <img src="../assets/img/shop/hide.png" class="shop-icon" alt="" style="display:none;">
            <img src="../assets/img/shop/school.png" class="shop-icon" alt="" style="display:none;">
            <img src="../assets/img/shop/search.png" class="shop-icon" alt="" style="display:none;">
            <div class="columns" v-for="product in products">
                <div class="column">
                    <img :src="'img/' + product.image + '.png'" class="shop-icon" alt="">
                    <h2 class="shop-desc">{{product.name}}</h2>
                    <p class="shop-about">{{product.description}}</p>
                    <p class="shop-cost">Cost: {{product.cost}}</p>
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
                products: null,
                user: null,
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
                    console.log("products" + JSON.stringify(response.data))
                    _this.products = response.data;
                    axios.get('https://saapi.excl.dev/me', config)
                        .then(function (response) {
                            console.log("me" + JSON.stringify(response))
                            _this.user = response.data;
                            _this.loading = false;
                        })
                        .catch(function (error) {

                            _this.$router.push({path: '/error?title=Error&message=Shop was unable to load please try again and if issue persists contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                        })
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

    .shop-desc, .shop-about {
        font-size: 1.2em;
    }
</style>