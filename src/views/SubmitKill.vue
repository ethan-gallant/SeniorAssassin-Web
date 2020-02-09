<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Uploading</span></div>
        <label>File
            <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        </label>
        <button @click="submitFile()">Submit</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import Vue from "vue";
    export default {
        name: "SubmitKill",
        data: () => {
            return {
                loading: false,
                file: null
            }
        },
        methods: {
            submitFile() {

                let _this = this;
                this.loading = true;
                axios.get('https://saapi.excl.dev/me/submit-kill',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + Vue.$cookies.get("session")
                        }
                    }
                ).then(function (response){
                    axios.put(response.data.url,
                        _this.file,
                        {
                            headers: {
                                'Content-Type': _this.file.type
                            }
                        }
                    ).then(function (response) {
                        _this.loading = false;
                    })
                        .catch(function (error) {
                            console.log(error);
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

</style>