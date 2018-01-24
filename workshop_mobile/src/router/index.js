import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard';
import Task from '../pages/task/Task';
import OrderList from '../pages/orderList/OrderList';
import OrderDetail from '../pages/orderDetail/OrderDetail';
import StartUp from '../pages/startUp/StartUp';
import Interrupt from '../pages/interrupt/Interrupt';
import Rework from '../pages/rework/Rework';
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
            path: '/order/:oId/process/:pId/startUp',
            name: 'startUp',
            component: StartUp
        },
        {
            path: '/order/:oId/process/:pId/interrupt',
            name: 'interrupt',
            component: Interrupt
        },
        {
            path: '/order/:oId/process/:pId/rework',
            name: 'rework',
            component: Rework
        },
	],
	// mode: 'history'
});
