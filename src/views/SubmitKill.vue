<template>
    <div class="container">
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Uploading</span></div>
  <div class="submit-kill">

<div class="level">
    <div class="upload-btn-wrapper">
        <p class="has-text-centered">Picture must include target's face</p>
        <button class="btn">Upload a file</button> <p v-if="file" class="has-text-centered">{{file.name}}</p>
        <input type="file" id="file" ref="file" accept=".jpg,.jpeg" @change="handleFileUpload()"/>
    </div>
</div>
      <div class="level">
          <a v-if="file" @click="submitFile()" class="brk-btn submit-button">Submit</a>
      </div>
      <div class="level">
          <router-link to="/dashboard" class="brk-btn-grey submit-button brk-btn">Return to Dashboard</router-link>
      </div>




  </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2/src/sweetalert2.js'
    export default {
        name: "SubmitKill",
        data: () => {
            return {
                loading: false,
                file: null,
                type: -1,
                target: null,
            }
        },
        mounted() {
            let urlParams = new URLSearchParams(window.location.search);
            urlParams.forEach((val, key) => {
                //there is probably a better way to do this but this is my way
                console.log(val, key)
                if(key === "target"){
                    this.target = val;
                }else if (key === "type"){
                    this.type = parseInt(val, 10);
                }
            })
            if(!this.target || this.type === -1){
                Swal.fire('Error', 'No Target Found Please Try Again', 'error').then(() =>{
                    this.$router.push({path: '/dashboard'})
                })
            }
        },
        methods: {
            submitFile() {

                let _this = this;
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + _this.$cookies.get("session")
                    }
                }
                this.loading = true;
                let jpegconfig = {
                    headers: {
                        'Content-Type': 'image/jpeg'
                    }
                }
                axios.post('https://saapi.excl.dev/me/kill', {
                    type: _this.type,
                    target: _this.target,
                }, config).then(function (response){
                    axios.put(response.data.data.url, _this.file, jpegconfig)
                        .then(function (response) {
                        _this.loading = false;
                        Swal.fire('Congrats', 'Kill Submitted Please Wait for Approval', 'success').then(() =>{
                            _this.$router.push({path: '/dashboard'})
                        })
                    })
                        .catch(function (error) {
                            _this.loading = false;
                            Swal.fire('Oops...', 'Something went wrong! Please Try again', 'error')
                        });
                }).catch(function (error) {
                    _this.loading = false;
                    Swal.fire('Oops...', error.response.data.err, 'error')
                })


            },
            handleFileUpload() {

                this.file = this.$refs.file.files[0];

            }
        }
    }
</script>

<style scoped>
    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        margin: auto;
    }

    .btn {
        border: 2px solid gray;
        color: gray;
        background-color: white;
        padding: 8px 20px;
        border-radius: 8px;
        font-size: 20px;
        font-weight: bold;
    }

    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    .submit-button{
        margin: auto;
    }
    .submit-kill{
        padding-top: 100px;
        background-image: url("../assets/img/db-background.png");
        background-size: cover;
        min-height: 100vh;
    }
    .level{
        display: flex;
    }
</style>