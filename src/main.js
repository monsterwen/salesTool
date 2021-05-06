import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import SignUp from './components/signup'
import FASTModule from './Views/FASTModule'
import Embed from "./components/version2/Embed";
// import Intro from './components/intro'
// import JQuery from 'jquery'
import Test from './components/test'
// window.$ = JQuery
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/fast',
      name: 'FASTModule',
      component: FASTModule
    },
    {
      path: '/embed',
      name: 'FASTModule',
      component: Embed
    }]
})
new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount('#app');

// import jQuery from 'jquery'
