import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client'
import * as R from '../api/Api';

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
                "processEnterTime": null,
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 0,
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
                "updatedTime": null,
            },
            {
                "roId": 3,
                "roNumber": "string",
                "shopId": 0,
                "inTime": 1514256227000,
                "planCompletedTime": 1514256227000,
                "startTime": 1514256227000,
                "processEnterTime": null,
                "actCompletedTime": null,
                "carColorValue": 'black',
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 3,
                "processStatus": 0,
                "carNumber": "沪C12345",
                "carColor": "string",
                "carType": "上海通用汽车别克ss 凯越",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 1,
                "techId": 9,
                "techId2": 0,
                "isRework": 1,
                "roStatus": 0,
                "invalid": 0,
                "remark": "string",
                "createdUser": "workshop_newRo",
                "createdTime": 1514256313000,
                "updatedUser": null,
                "updatedTime": null,
            },
            {
                "roId": 4,
                "roNumber": "string",
                "shopId": 0,
                "inTime": 1514256227000,
                "planCompletedTime": 1514256227000,
                "startTime": 1514256227000,
                "processEnterTime": null,
                "actCompletedTime": null,
                "carColorValue": 'orange',
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 3,
                "processStatus": 2,
                "carNumber": "沪C12345",
                "carColor": "string",
                "carType": "上海通用汽车别克aa 凯越",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 1,
                "techId": 9,
                "techId2": 0,
                "isRework": 1,
                "roStatus": 0,
                "invalid": 0,
                "remark": "string",
                "createdUser": "workshop_newRo",
                "createdTime": 1514256313000,
                "updatedUser": null,
                "updatedTime": null,
            },
            {
                "roId": 5,
                "roNumber": "string",
                "shopId": 0,
                "inTime": 1514256227000,
                "planCompletedTime": 1514256227000,
                "actCompletedTime": null,
                "carColorValue": 'black',
                "paintGrade": 1,
                "isEmergency": 0,
                "processId": 3,
                "processStatus": 1,
                "processEnterTime": 1514256200000,
                "carNumber": "string",
                "carColor": "string",
                "carType": "string",
                "panelRates": 0,
                "paintRates": 0,
                "lineId": 1,
                "techId": 9,
                "techId2": 0,
                "isRework": 1,
                "roStatus": 1,
                "invalid": 0,
                "remark": "string",
                "createdUser": "workshop_newRo",
                "createdTime": 1514256313000,
                "updatedUser": null,
                "updatedTime": null
            }
		],
        orderCounts: null,  // {object}
        timeGap: 0,  // int(ms)
        queryKey: '',
        lineList: [],
	},
	getters: {
        getCurrentTime (state) {
	        return Date.now() + state.timeGap;
        },
        getQueryKey (state) {
	        return state.queryKey;
        },
	    getOrderCounts (state) {
	        if (state.orderCounts) {
	            return state.orderCounts;
            }
	        return JSON.parse(storage.getItem('orderCounts')) || {};
        },
        getAllOrders(state) {
            if (state.orders.length) {
                return state.orders;
            }
            return JSON.parse(storage.getItem('orders')) || [];
        },
        getMyOrders (state) {
            const _techId = Bu.st.getKey('techInfo').techId;
            const orders = state.orders.length ? state.orders : JSON.parse(storage.getItem('orders'));
            try {
                const techId = Number(_techId);
                return orders.filter(order => techId == order.techId || techId == order.techId2);
            } catch (e) {
                return [];
            }
        },
        getOrders (state) {
	        if (state.orders.length) {
                const { queryKey } = state;
                if (queryKey) {
                    return state.orders.filter(order => {
                        const { carNumber, carType, roId } = order;
                        return carNumber.indexOf(queryKey) !== -1 || carType.indexOf(queryKey) !== -1 || roId.toString().indexOf(queryKey) !== -1;
                    })
                }
                return state.orders;
            }
            return JSON.parse(storage.getItem('orders')) || [];

        },
        getLineList (state) {
	        if (state.lineList.length) {
	            return state.lineList;
            }
            return JSON.parse(storage.getItem('lineList')) || [];
        },
        getOverTimeNum: (state, getters) => {
	        const current_time = getters.getCurrentTime;
	        return getters.getAllOrders.filter(order => current_time > order.planCompletedTime).length;
        },
		getOrdersByLineId: (state, getters) => (lineId) => {
			const lineOrders = getters.getOrders.filter(order => order.lineId === lineId);
			return (processId) => {
				return lineOrders.filter(order => order.processId === processId);
            }
		},
        getOrdersByProcessId: (state, getters) => (processId) => {
            return getters.getOrders.filter(order => order.processId === Number(processId));
        },
        queryOrderById: (state, getters) => (orderId) => {
            return getters.getOrders.find(order => order.roId === Number(orderId));
        }
	},
    mutations: {

	    // get all orders and counts
        init (state, payload) {

            // state.orders && (state.orders = payload.orders);
            payload.orderCounts && (state.orderCounts = payload.orderCounts);
            payload.timeGap && (state.timeGap = payload.timeGap);
        },
        updateOvertimeCounts (state, payload) {
            try {
                state.orderCounts.overtimeNum =  payload.overTimeNum;   //  update when req finished
            } catch (e) {

            }
        },
        fetchLineList (state, payload) {
            payload.lineList && (state.lineList = payload.lineList);
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
            R.getAllOrders()
                .then(res => {
                    const { workshopRos, roStats, currentTime } = res.data;
                    const time_gap = currentTime - Date.now();
                    commit({
                        type: 'init',
                        orders: workshopRos,
                        orderCounts: roStats,
                        timeGap: Math.abs(time_gap) < 10 * 1000 ? 0 : time_gap
                    });
                    storage.setItem('orders', JSON.stringify(workshopRos));
                    storage.setItem('orderCounts', JSON.stringify(roStats));
                })
                .catch(err => {
                    commit({
                        type: 'init',
                        orders: JSON.parse(storage.getItem('orders')),
                        orderCounts: JSON.parse(storage.getItem('orderCounts')),
                    });
                })
        },
	    fetchLineListAsync ({ commit }) {
            R.getLineList()
                .then(res => {
                    const { data } = res;
                    if (data instanceof Array && data.length > 0 ) {
                        data.forEach(line => {
                            line.ProcesseList.unshift({
                                ProcessID: 0,
                                ProcessName: '等待区'
                            });
                        });

                        commit({
                            type: 'fetchLineList',
                            lineList: data
                        });
                        storage.setItem('lineList', JSON.stringify(data));
                    }
                })
                .catch(err => {
                    commit({
                        type: 'fetchLineList',
                        lineList: JSON.parse(storage.getItem('lineList'))
                    });
                });
        },
        updateFromPushAsync ({ commit }) {
            // var socket = io('path', {
            //     polling: {
            //         extra: token
            //     }
            // })
            // fetch ({
            //     body:
            //      condition: ['定点推送']
            // })
            const socket = io('http://comet.tuhu.work?token=Bearer f90deda7a84b429fbf0fbbf3992a4afd');
            socket.on('connect', () => {
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
            //  token 失效 客户端onError 重连
            //  client use series id to make sure push info completed,
            //  resend the request if doesn't meet the des above
        }
    }



});