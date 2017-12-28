
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Icon from 'vue-awesome'
import 'isomorphic-fetch'
import VueSocketio from 'vue-socket.io';

Vue.component('Icon', Icon)



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
