import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import SignUp from './components/signup'
import FASTModule from './Views/FASTModule'
// import Intro from './components/intro'
// import JQuery from 'jquery'
import Test from './components/test'
// window.$ = JQuery
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'SignUp',
    //   component: SignUp,
    // },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/fast',
      name: 'FASTModule',
      component: FASTModule
    }]
})
new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount('#app');

// import jQuery from 'jquery'
