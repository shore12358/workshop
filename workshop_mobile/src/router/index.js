import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard';
import Task from '../pages/task/Task';
import OrderList from '../pages/orderList/OrderList';
import Init from '../pages/Init';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/user/dashboard'
		},
		{
			path: '/user',
			component: Init,
			children: [
				{
					path: 'dashboard',
					component: Dashboard
				},
				{
					path: 'task',
					component: Task
				}
			]
		},
		{
			path: '/process/:processId/orderList',
			name: 'orderList',
			component: OrderList
		}
	],
	// mode: 'history'
});
