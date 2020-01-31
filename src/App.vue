<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Cabin:400,500&display=swap');
  @font-face {
    font-family: 'mad_hackerregular';
    src: url('assets/fonts/mad_hacker/mad_hacker-webfont.woff2') format('woff2'),
    url('assets/fonts/mad_hacker/mad_hacker-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

  }
  html{
    background-color: transparent;
  }i

  * {
    margin: 0;
    padding: 0;
    color:white;

  }

  body {
    background-color: #111111;
    height: 100vh;
    font-family: 'Cabin', sans-serif;
  }
  canvas {
    display: block;
  }
  .brk-btn {
    position: relative;
    background: none;
    color: #00ff1d;
    text-transform: uppercase;
    text-decoration: none;
    border: 0.2em solid #09ff00;
    padding: 0.5em 1em;
    margin-top: .5em;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 10%;
      background: #111;
      height: 0.3em;
      right: 20%;
      top: -0.21em;
      transform: skewX(-45deg);
      -webkit-transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
      transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 10%;
      background: #111;
      height: 0.3em;
      left: 20%;
      bottom: -0.25em;
      transform: skewX(45deg);
      -webkit-transition: all 0.45 cubic-bezier(0.86, 0, 0.07, 1);
      transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }
    &:hover {
      color: #00ff1d;
      &::before {
        right: 80%;
      }
      &::after {
        left: 80%;
      }
    }
  }
  .brk-btn-red {

    color: #ff000a;

    border: 0.2em solid #ff000a;

    &:hover {
      color: #ff000a;
    }
  }
  .brk-btn-blue {

    color: #0003ff;

    border: 0.2em solid #0003ff;

    &:hover {
      color: #0003ff;
    }
  }
  .brk-btn-gold {

    color: #ff9f00;

    border: 0.2em solid #ff9f00;

    &:hover {
      color: #ff9f00;
    }
  }
  .brk-btn-grey {

    color: #a5a5a5;

    border: 0.2em solid #a5a5a5;

    &:hover {
      color: #a5a5a5;
    }
  }
  .btn-wrapper{
    margin:10px;
  }
</style>
