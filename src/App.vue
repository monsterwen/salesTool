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
@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
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
