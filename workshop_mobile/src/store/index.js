import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client'
import * as R from '../api/Api';

let storage = window.localStorage;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        orders: [],
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
        getWorkingZoneList: (state, getters) => (lineId) => {
            return getters.getLineList.find(line => line.LineID === Number(lineId)).ProcesseList.slice(1);
        },
        getOverTimeNum: (state, getters) => {
	        const current_time = getters.getCurrentTime;
	        return getters.getAllOrders.filter(order => current_time > order.planCompletedTime).length;
        },
        getOrdersByLineId: (state, getters) => (lineId) => {
            return getters.getOrders.filter(order => order.lineId === Number(lineId));
        },
        getLineOrdersByProcessId: (state, getters) => (lineId, processId) => {
            return getters.getOrdersByLineId(lineId).filter(order => order.processId === Number(processId));
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
            state.orders && (state.orders = payload.orders);
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
            const { workshopRo, roStats } = payload.content;
            try {
                switch (payload.crudType) {
                    case 1:
                        state.orders = [...state.orders, workshop];
                        break;
                    case 3:
                        state.orders = state.orders.map(order => {
                            if (order.roId === workshopRo.roId) {
                                return workshopRo
                            }
                            return order;
                        });
                        break;
                    case 4:
                        state.orders = state.orders.filter(order => order.roId !== workshopRo.roId);
                        break;
                    default:

                }
                state.orderCounts = roStats;
            } catch (e) {

            }
            Bu.st.setKey('orders', state.orders);
            Bu.st.setKey('orderCounts', state.orderCounts);
        },
        modifyQueryKey (state, payload) {
            const { queryKey } = payload;
            state.queryKey = queryKey;
        },
        // modifyProcessStatusByOrderId (state, payload) {
        //     const attrs = Object.assign({}, payload);
        //     delete attrs.type;
        //     try {
        //         state.orders = state.orders.map(order => {
        //             if (order.roId === Number(payload.roId)) {
        //                 return Object.assign(order, attrs);
        //             }
        //             return order;
        //         });
        //     } catch (e) {
        //
        //     }
        //     Bu.st.setKey('orders', state.orders);
        // },

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

            const socket = io(`https://comet.tuhu.work/banpen?token=Bearer f90deda7a84b429fbf0fbbf3992a4afd&channel=shop&ua=pc&module=tab&shopId=38&userId=WQ${Date.now()}`);
            socket.on('connect', () => {
                console.log('connect socket');
            });
            socket.on('disconnect', () => {
                console.log('disconnect');
            });
            socket.on('error',(msg) => {
                console.log(`error ${msg}`);
            });
            socket.on('PushMessage', function(msg){
                console.log("PushMessage", msg);
                commit({
                    type: 'updateFromPush',
                    ...JSON.parse(msg).msg
                });
            });
            // var socket = io('path', {
            //     polling: {
            //         extra: token
            //     }
            // })
            // fetch ({
            //     body:
            //      condition: ['定点推送']
            // })
            //  token 失效 客户端onError 重连
            //  client use series id to make sure push info completed,
            //  resend the request if doesn't meet the des above
        }
    }



});