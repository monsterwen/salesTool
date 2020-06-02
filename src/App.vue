<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="bigHolder">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FASTModule from './Views/FASTModule'

</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');*/
/*@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
}
input + label {
    font-size: 1.2rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: .1rem solid var(--blue);
    border-radius: 50%;
    background: var(--darkblue);
    transition: .1s all;
    cursor: pointer;
    z-index: 999 !important;
}
input + label:hover {
    transform: scale(.95);
}
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
a {
    font-family: Montserrat-Regular;
    font-size: 14px;
    line-height: 1.7;
    color: #666666;
    margin: 0px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
}
h1,h3,h4,h5,h6 {
    margin: 0px;
}
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
button {
    outline: none !important;
    border: none;
    background: transparent;
}

button:hover {
    cursor: pointer;
}
.bigHolder {
    width: 100vw;
    height: 100vh;
    background-color: #cad7c8;
}
.axisLabel {
    fill: #656565;
}
.line {
    fill: #CDCDCD;
}
.tooltip {
    text-shadow: 0 1px 0 #EFEFEF, 1px 0 0 #EFEFEF, -1px 0 0 #EFEFEF, 0 -1px 0 #EFEFEF;
    fill: #565656;
}
.hidden {
    display: none;
}
/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
