<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Redirecting Please Wait</span></div>
        <div class="login has-text-centered">
            <h1 class=" mainHeader">SENIOR assassin</h1>
            <p>LOGIN WITH YOUR @LJCDS.ORG EMAIL</p>
            <a @click="checkAuth()">
            <img class="googleoauth" src="../assets/img/btn_google_signin_light_normal_web@2x.png" alt=""></a>
        </div>

        <canvas id="c"></canvas>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "Home",
        data: ()=>{
            return{
                loading: false
            }
        },
        mounted() {
// geting canvas by Boujjou Achraf
            let c = document.getElementById("c");
            let ctx = c.getContext("2d");

            //making the canvas full screen
            c.height = window.innerHeight;
            c.width = window.innerWidth;

            //chinese characters - taken from the unicode charset
            let matrix ="¦༚᥀jkQim@*Lacz0";
            //converting the string into an array of single characters
            matrix = matrix.split("");

            let font_size = 10;
            let columns = c.width/font_size; //number of columns for the rain
            //an array of drops - one per column
            let drops = [];
            //x below is the x coordinate
            //1 = y co-ordinate of the drop(same for every drop initially)
            for(let x = 0; x < columns; x++)
                drops[x] = 1;

            //drawing the characters
            function draw()
            {
                //Black BG for the canvas
                //translucent BG to show trail
                ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
                ctx.fillRect(0, 0, c.width, c.height);

                ctx.fillStyle = "#00f538";//green text
                ctx.font = font_size + "px arial";
                //looping over drops
                for(let i = 0; i < drops.length; i++)
                {
                    //a random chinese character to print
                    let text = matrix[Math.floor(Math.random()*matrix.length)];
                    //x = i*font_size, y = value of drops[i]*font_size
                    ctx.fillText(text, i*font_size, drops[i]*font_size);

                    //sending the drop back to the top randomly after it has crossed the screen
                    //adding a randomness to the reset to make the drops scattered on the Y axis
                    if(drops[i]*font_size > c.height && Math.random() > 0.975)
                        drops[i] = 0;

                    //incrementing Y coordinate
                    drops[i]++;
                }
            }

            setInterval(draw, 35);
            let requestFullscreen = function (ele) {
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.webkitRequestFullscreen) {
                    ele.webkitRequestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.msRequestFullscreen) {
                    ele.msRequestFullscreen();
                } else {
                    console.log('Fullscreen API is not supported.');
                }
            };


        },
        methods:{
            checkAuth(){
                this.loading = true;
                    let tempSession = null;
                    let userInfo = null;
                    tempSession = Vue.$cookies.get("session");
                    if(tempSession === null){
                        window.location.replace("https://saapi.excl.dev/auth/login");
                    }
                    userInfo = JSON.parse(atob(tempSession.split('.')[1]));

                    if((Date.now()/1000) - 86400 > userInfo.iat){
                        window.location.replace("https://saapi.excl.dev/auth/login");

                    }//TODO: refresh current cookie
                this.$router.push({ path: '/dashboard' })



            }
        }
    }
</script>

<style scoped>
.login{
    position: absolute;
    top: 30%;
    width: 100%;
    font-family: 'mad_hackerregular', sans-serif;
}
.login img{
    width:250px;


}
.googleoauth:hover{
    cursor: pointer;
}
.mainHeader{

    font-size: 2em;
}
</style>