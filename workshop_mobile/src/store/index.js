import Vue from 'vue';
import Vuex from 'vuex';
import { getAllOrders } from '../api/Api';

let storage = window.localStorage;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        orders: [
            {
                "roId": 2,
                "roNumber": "string",
                "shopId": 0,
                "inTime": 1514256227000,
                "planCompletedTime": 1514256227000,
                "actCompletedTime": null,
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 0,
                "processStatus": 0,
                "carNumber": "沪C12345",
                "carColor": "string",
                "carType": "上海通用汽车别克 凯越",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 0,
                "techId": 0,
                "techId2": 0,
                "isRework": 1,
                "roStatus": 0,
                "invalid": 0,
                "remark": "string",
                "createdUser": "workshop_newRo",
                "createdTime": 1514256313000,
                "updatedUser": null,
                "updatedTime": null
            },
            {
                "roId": 5,
                "roNumber": "string",
                "shopId": 0,
                "inTime": 1514256227000,
                "planCompletedTime": 1514256227000,
                "actCompletedTime": null,
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 0,
                "processStatus": 0,
                "carNumber": "string",
                "carColor": "string",
                "carType": "string",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 0,
                "techId": 0,
                "techId2": 0,
                "isRework": 1,
                "roStatus": 1,
                "invalid": 0,
                "remark": "string",
                "createdUser": "workshop_newRo",
                "createdTime": 1514256313000,
                "updatedUser": null,
                "updatedTime": null
            },
            {
                roId: 1,
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 0,
                processId: 1,
                roStatus: 0,

            },
            {
                roId: 0,
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 0,
                processId: 2,
                roStatus: 1,

            },
            {
                roId: 3,
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 1,
                processId: 4,
                roStatus: 1,
            }
		],
        orderCounts: {

        },
        timeGap: 0  // int(ms)
	},
	getters: {
	    getTimeGap (state) {
	        return state.timeGap;
        },
	    getOrderCounts (state) {
	        return state.orderCounts;
        },
        getOrders (state) {
	        try {
	            return state.orders
            } catch (e) {
	            return JSON.parse(storage.getItem('orders'));
            }
        },

        //  waiting to add localstorage
		getOrdersByLineId: (state) => (lineId) => {
			const lineOrders = state.orders.filter(order => order.lineId === lineId);
			return (processId) => {
				return lineOrders.filter(order => order.processId === processId);
			}
		},
        getOrdersByProcessId: (state) => {
		    return (processId) => {
		        return state.orders.filter(order => order.processId === Number(processId));
            }
        },
	},
    mutations: {

	    // get all orders and counts
        init (state, payload) {
            // state.orders = payload.orders;
            state.orderCounts = payload.orderCounts;
        }
    },
    actions: {
        initAsync ({ commit }) {
            getAllOrders()
                .then(res => {
                    const { workshopRos, roStats } = res.data;
                    commit({
                        type: 'init',
                        orders: workshopRos,
                        orderCounts: roStats
                    });
                    storage.setItem('orders', JSON.stringify(workshopRos));
                    storage.setItem('orderCounts', JSON.stringify(roStats));
                })
        },
	    refreshOrderCounts ({ commit }) {

        }
    }



});