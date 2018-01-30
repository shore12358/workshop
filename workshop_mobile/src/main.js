
import Vue from 'vue';
import App from './App';
import router from './router';
import * as Icon from 'vue-awesome';
import infiniteScroll from 'vue-infinite-scroll';
import store from './store/index';
import 'isomorphic-fetch';
import Multiselect from 'vue-multiselect';
import TransDate from './directives/date';
import Popout from './components/Popout';
import Toast from './components/Toast';
import Loading from './components/Loading';

import './utils/Bu';

Vue.component('Icon', Icon);
Vue.component('Popout', Popout);
Vue.component('Toast', Toast);
Vue.component('Multiselect', Multiselect);
Vue.component('Loading', Loading);

Vue.directive('transDate', TransDate);

Vue.use(infiniteScroll);

new Vue({
	el: '#app',
	store,
    router,
	template: '<App/>',
	components: { App }
});

