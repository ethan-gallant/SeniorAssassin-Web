<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Anton&display=swap');
  @font-face {
    font-family: 'mad_hackerregular';
    src: url('assets/fonts/mad_hacker/mad_hacker-webfont.woff2') format('woff2'),
    url('assets/fonts/mad_hacker/mad_hacker-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

  }

  * {
    margin: 0;
    padding: 0;
    color:white;

  }

  body {
    background-color: #111111;
    height: 100vh;
    font-family: 'Anton', sans-serif;
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
      background: #222;
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
      background: #222;
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
</style>
