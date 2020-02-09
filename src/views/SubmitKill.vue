<template>
    <div class="container">
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Uploading</span></div>
  <div class="submit-kill">

<div class="level">
    <div class="upload-btn-wrapper">
        <button class="btn">Upload a file</button> <p v-if="file" class="has-text-centered">{{file.name}}</p>
        <input type="file" id="file" ref="file" accept=".jpg,.jpeg" @change="handleFileUpload()"/>
    </div>
</div>
      <div class="level">
          <a @click="submitFile()" class="brk-btn submit-button">Submit</a>



      </div>
      <div class="level">
          <router-link to="/dashboard" class="brk-btn-grey submit-button brk-btn">Return to Dashboard</router-link>
      </div>




  </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    export default {
        name: "SubmitKill",
        data: () => {
            return {
                loading: false,
                file: null
            }
        },
        mounted() {

        },
        methods: {
            submitFile() {

                let _this = this;
                this.loading = true;
                axios.get('https://saapi.excl.dev/me/submit-kill',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + _this.$cookies.get("session")
                        }
                    }
                ).then(function (response){
                    console.log("starting upload")
                    console.log(response)
                    axios.put(response.data.data.url,
                        _this.file,
                        {
                            headers: {
                                'Content-Type': _this.file.type
                            }
                        }
                    ).then(function (response) {
                        _this.loading = false;
                        Swal.fire('Congrats', 'Kill Submitted Please Wait for Approval', 'success').then(() =>{
                            _this.$router.push({path: '/dashboard'})
                        })
                    })
                        .catch(function (error) {
                            Swal.fire('Oops...', 'Something went wrong! Please Try again', 'error')
                        });
                }).catch(function (error) {

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