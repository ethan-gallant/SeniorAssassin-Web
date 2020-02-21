<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Loading Shop</span></div>
        <div class="modal" :class="{'is-active': showSelectTeacher}">
            <div class="modal-background" @click="showSelectTeacher = false"></div>
            <div class="modal-content">

                <table class="table is-dark is-bordered is-striped is-fullwidth">
                    <thead>
                    <th>Teacher</th>
                    <th>Select</th>

                    </thead>
                    <tbody>
                    <tr v-for="teacher in teachers">
                        <td>{{teacher.salutation}}.{{teacher.name_last}}</td>
                        <td><a @click="hireTeacher(teacher.email)" class="button is-primary">Select</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button class="modal-close is-large" @click="showSelectTeacher = false" aria-label="close"></button>
        </div>
        <div v-if="products" class="has-text-centered shop">
            <div class="shop-header">
                <h1>Shop</h1>
                <p>Current Balance: {{balance}}</p>
                <a @click="redeem()" class="brk-btn brk-btn-gold">Redeem Code</a>
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
                teachers: null,
                selectedTeacher: null,
                showSelectTeacher: false,
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
                });
            axios.get('https://saapi.excl.dev/shop/teachers', config)
                .then((response) => {
                    _this.teachers = response.data;
                })
                .catch((error) => {
                    Swal.fire('Error', 'Could Not Load Teachers', 'error').then(() =>{
                        _this.$router.push({path: '/dashboard'})
                    })
                });

        },
        methods: {
            purchase(item) {
                if(item === "teacher-assassin"){
                    this.showSelectTeacher = true;
                    return;
                }
let _this = this;
                axios.post('https://saapi.excl.dev/shop/buy/' + item, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + _this.$cookies.get("session")
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

            },
            hireTeacher(email){
                this.showSelectTeacher = false;
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$cookies.get("session")
                    }
                }
                let _this = this;
                Swal.fire({
                    title: 'Hiring: ' + email,
                    icon: 'info',
                    html:
                        '<b>Select Who you want your teacher to target</b>',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:"My Assassin",
                    cancelButtonText:"My Target"
                }).then((res)=>{
                    console.log("Hire Teacher Repsonse: " + res)
                    if(res.dismiss === "cancel"){
                        axios.post('https://saapi.excl.dev/shop/buy/teacher-assassin', {
                            type: 0,
                            teacher: email

                        }, config).then((response) => {
                            Swal.fire('Success', 'Teacher Has Been Hired', 'success');
                            console.log(response)
                        }).catch((error) => {
                            console.log("my target error:" + error)
                            Swal.fire('error', error.response.data.err, 'error').then(() =>{
                                _this.$router.push({path: '/dashboard'})
                            })
                        })
                    }
                    if(res.value === "true"){
                        axios.post('https://saapi.excl.dev/shop/buy/teacher-assassin', {
                            type: 1,
                            teacher: email,

                        }, config).then((response) => {
                            Swal.fire('Success', 'Teacher Has Been Hired', 'success');
                        }).catch((error) => {

                            Swal.fire('Error', error.response.data.err, 'error').then(() =>{
                                _this.$router.push({path: '/dashboard'})
                            })
                            console.log("my target error:" + error)
                        })
                    }
                })
            },
            redeem(){
                let _this = this;
                Swal.fire({
                    title: 'Enter Code',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    console.log(result)

                    if (result.value) {
                        console.log(result)
                        axios.post('https://saapi.excl.dev/shop/redeem/' + result.value, {}, {
                            headers: {
                                'Authorization': 'Bearer ' + _this.$cookies.get("session")
                            }}).then((response) =>{
                            console.log(response)
                            if(response.data.err){
                                Swal.fire('Failed', response.data.err, 'error').then(() =>{
                                    _this.$router.push({path: '/dashboard'})

                                })
                                return;
                            }
                            Swal.fire('Congrats', 'Item Redeemed', 'success').then(() =>{
                                _this.$router.push({path: '/shop'})
                            })

                        }).catch((error) =>{
                            Swal.fire('Failed', 'Something Went Wrong Please Try Again later', 'error').then(() =>{
                                _this.$router.push({path: '/dashboard'})
                            })
                        })
                    }else{
                        return;
                    }
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
    .shop-header .brk-btn{
        font-size: .5em;
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
    td {
        color: black;
    }
</style>