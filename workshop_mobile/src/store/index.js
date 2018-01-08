import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client'
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
                "startTime": 1514256227000,
                "actCompletedTime": null,
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 1,
                "processStatus": 0,
                "carNumber": "沪C12345",
                "carColor": "string",
                "carType": "上海通用汽车别克 凯越",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 1,
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
                "processId": 1,
                "processStatus": 1,
                "carNumber": "string",
                "carColor": "string",
                "carType": "string",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 1,
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
                carType: "上海通用汽车别克 凯越",
                carNumber: "沪C12345",
                orderNo: 'TH18842734',
                processStatus: 0,
                lineId: 0,
                processId: 1,
                roStatus: 0,

            },
            {
                roId: 0,
                no: '沪C12345',
                carType: "上海通用汽车别克 凯越",
                carNumber: "沪C12345",
                processStatus: 0,
                orderNo: 'TH18842734',
                lineId: 0,
                processId: 2,
                roStatus: 1,

            },
            {
                roId: 3,
                no: '沪C12345',
                carType: "上海通用汽车别克 凯越",
                processStatus: 0,
                carNumber: "沪C12345",
                orderNo: 'TH18842734',
                lineId: 1,
                processId: 4,
                roStatus: 1,
            }
		],
        orderCounts: {

        },
        timeGap: 0,  // int(ms)
        queryKey: ''
	},
	getters: {
	    getTimeGap (state) {
	        return state.timeGap;
        },
        getQueryKey (state) {
	        return state.queryKey;
        },
	    getOrderCounts (state) {
	        return state.orderCounts;
        },
        getOrders (state) {
            const { queryKey } = state;
            if (queryKey) {
               return state.orders.filter(order => {
                    const { carNumber, carType, roId } = order;
                    return carNumber.indexOf(queryKey) !== -1 || carType.indexOf(queryKey) !== -1 || roId.toString().indexOf(queryKey) !== -1;
                })
            }
            return state.orders;
            // try {
	         //    return state.orders
            // } catch (e) {
	         //    return JSON.parse(storage.getItem('orders'));
            // }
        },

        //  waiting to add localstorage
		getOrdersByLineId: (state, getters) => (lineId) => {
			const lineOrders = getters.getOrders.filter(order => order.lineId === lineId);
			return (processId) => {
				return lineOrders.filter(order => order.processId === processId);
			}
		},
        getOrdersByProcessId: (state, getters) => (processId) => {
            return getters.getOrders.filter(order => order.processId === Number(processId));
        },
	},
    mutations: {

	    // get all orders and counts
        init (state, payload) {

            // state.orders = payload.orders;
            state.orderCounts = payload.orderCounts;
        },
        updateFromPush (state, payload) {
            state.orders.push(payload.order);   // order attr map to the data structure in ws api
            state.orderCounts = payload.orderCounts;
        },
        modifyQueryKey (state, payload) {
            const { queryKey } = payload;
            state.queryKey = queryKey;
        },


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

        },
        updateFromPushAsync ({ commit }) {
            const socket = io('http://comet.tuhu.work?token=Bearer f90deda7a84b429fbf0fbbf3992a4afd');
            socket.on('connect',() => {
                console.log('connect ' + socket.id);
            });

            socket.on('disconnect', () => {
                console.log('disconnect ' + socket.id);
            });

            socket.on('ChatMessage', msg => {
                console.log(msg);
                // commit({
                //     type: 'updateFromPush',
                // });
            });
        }
    }



});