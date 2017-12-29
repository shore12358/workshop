
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Icon from 'vue-awesome'
import store from './store/index'
import 'isomorphic-fetch'
import VueSocketio from 'vue-socket.io';

Vue.component('Icon', Icon)

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
