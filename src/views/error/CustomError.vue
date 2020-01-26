<template>
    <div class="customerror has-text-centered">
        <h1 class="error">{{title}}</h1>
        <p>{{message}}</p>
        <br>
        <router-link :to='{path: buttonPath}' class="brk-btn">{{buttonMessage}}</router-link>
    </div>
</template>

<script>
    export default {
        name: "CustomError",
        data: () => {
            return {
                title: "error",
                message: "an unknown error has occurred",
                buttonPath: "/",
                buttonMessage: "Return"
            }
        },
        mounted() {
            let urlParams = new URLSearchParams(window.location.search);
            urlParams.forEach((val, key) => {
                //there is probably a better way to do this but this is my way
                if(key === "title"){
                    this.title = val;
                    return;
                }else if(key === "message"){
                    this.message = val;
                    return;
                }else if(key === "buttonPath"){
                    this.buttonPath = val;
                    return;
                }else if(key === "buttonMessage"){
                    this.buttonMessage = val;
                }
            })
        }
    }
</script>

<style scoped>
    .customerror{
        padding-top: 25vh;
    }
    .error{
        color: red;
        font-family: 'mad_hackerregular', sans-serif;
        font-size: 2em;
    }
</style>