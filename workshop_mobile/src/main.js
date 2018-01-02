
import Vue from 'vue';
import App from './App';
import router from './router';
import * as Icon from 'vue-awesome';
import store from './store/index';
import 'isomorphic-fetch';
// import VueSocketio from 'vue-socket.io';
import Multiselect from 'vue-multiselect';

Vue.component('Icon', Icon);
Vue.component('Multiselect', Multiselect);
// Vue.use(VueSocketio, 'http://comet.tuhu.work');


new Vue({
	el: '#app',
	store,
    router,
	template: '<App/>',
	components: { App }
});
