<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Loading Shop</span></div>
        <div v-if="products" class="has-text-centered shop">
            <div class="shop-header">
                <h1>Shop</h1>
                <p>Current Balance: {{balance}}</p>
            </div>
            <div class="columns" v-for="(product, index) in products">
                <div class="column">
                    <img :src="'img/shop/' + product.image + '.png'" class="shop-icon" alt="">
                    <h2 class="shop-desc">{{product.name}}</h2>
                    <p class="shop-about">{{product.description}}</p>
                    <p class="shop-cost">Cost: {{product.cost}}</p>
                    <div class="btn-wrapper">
                        <a v-if="product.cost <= balance" href="#" @click="purchase(index)"
                           class="brk-btn brk-btn-gold">Purchase</a>
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
    import Swal from 'sweetalert2/src/sweetalert2.js'

    export default {
        name: "Shop",
        data: () => {
            return {
                loading: false,
                products: null,
                balance: 0,
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
                            _this.balance = response.data.balance;
                            _this.loading = false;
                        })
                        .catch(function (error) {

                            _this.$router.push({path: '/error?title=Error&message=Shop was unable to load please try again and if issue persists contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                        })
                })
                .catch(function (error) {

                    _this.$router.push({path: '/error?title=Error&message=Shop was unable to load please try again and if issue persists contact support&buttonPath=/dashboard&buttonMessage=Return To Dashboard'})
                })

        },
        methods: {
            purchase(item) {
let _this = this;
                axios.post('https://saapi.excl.dev/shop/buy/' + item, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$cookies.get("session")
                    }}).then((response) =>{
                    console.log(response)
                        if(response.data.err){
                            Swal.fire('Failed', response.data.err, 'error').then(() =>{
                                _this.$router.push({path: '/dashboard'})

                            })
                            return;
                        }
                    Swal.fire('Congrats', 'Item Purchased', 'success').then(() =>{
                        _this.$router.push({path: '/dashboard'})
                    })

                }).catch((error) =>{
                    Swal.fire('Failed', 'Something Went Wrong Please Try Again later', 'error').then(() =>{
                        _this.$router.push({path: '/dashboard'})
                    })
                })

            }
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

    .shop-header p {
        font-size: .5em;
    }
</style>