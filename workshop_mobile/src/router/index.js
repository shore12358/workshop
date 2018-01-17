import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard';
import Task from '../pages/task/Task';
import OrderList from '../pages/orderList/OrderList';
import OrderDetail from '../pages/orderDetail/OrderDetail';
import StartUp from '../pages/startUp/StartUp';
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
					name: 'dashboard',
					component: Dashboard
				},
				{
					path: 'task',
					name: 'task',
					component: Task
				}
			]
		},
		{
			path: '/process/:processId/orders',
			name: 'orderList',
			component: OrderList
		},
		{
			path: '/order/:id/detail',
			name: 'orderDetail',
			component: OrderDetail
		},
        {
            path: '/order/:id/startUp',
            name: 'startUp',
            component: StartUp
        },
	],
	// mode: 'history'
});
