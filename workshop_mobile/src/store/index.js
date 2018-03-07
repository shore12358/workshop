import Vue from 'vue';
import Vuex from 'vuex';
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
        pushInfo: {},
	},
	getters: {
        getCurrentTime (state) {
	        return Date.now() + state.timeGap;
        },
        getPushInfo (state) {
            return state.pushInfo;
        },
        getQueryKey (state) {
	        return state.queryKey;
        },
	    getOrderCounts (state) {
	        if (state.orderCounts) {
	            return state.orderCounts;
            }
            return Bu.st.getKey('orderCounts') || {};
        },
        getAllOrders(state) {
            if (state.orders.length) {
                return state.orders;
            }
            return Bu.st.getKey('orders') || [];
        },
        getMyOrders (state) {
            const _techId = Bu.st.getTechInfoSync().employeeId;
            const orders = state.orders.length ? state.orders : Bu.st.getKey('orders');
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
                        const { carNumber, carType, roNumber } = order;
                        return carNumber.toLowerCase().indexOf(queryKey) !== -1 || carType.toLowerCase().indexOf(queryKey) !== -1 || roNumber.toString().toLowerCase().indexOf(queryKey) !== -1;
                    })
                }
                return state.orders;
            }
            return Bu.st.getKey('orders') || [];

        },
        getLineList (state) {
	        if (state.lineList.length) {
	            return state.lineList;
            }
            return Bu.st.getKey('lineList') || [];
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
            'orders' in payload && (state.orders = payload.orders);
            'orderCounts' in payload && (state.orderCounts = payload.orderCounts);
            'timeGap' in payload && (state.timeGap = payload.timeGap);

        },
        updateOvertimeCounts (state, payload) {
            try {
                state.orderCounts.overtimeNum =  payload.overTimeNum;   //  update when req finished
            } catch (e) {

            }
        },
        fetchLineList (state, payload) {
            'lineList' in payload && (state.lineList = payload.lineList);
        },
        updatePushInfo (state, payload) {
            state.pushInfo = Object.assign({}, state.pushInfo, payload);
        },
        updateFromPush (state, payload) {
            const { workshopRo, roStats } = payload.content;
            try {
                switch (payload.crudType) {
                    case 1:
                        state.orders = [...state.orders, workshop];
                        break;
                    case 3:
                        if (workshopRo.roStatus === 2) {
                            state.orders = state.orders.filter(order => order.roId !== workshopRo.roId);
                        } else {
                            state.orders = state.orders.map(order => {
                                if (order.roId === workshopRo.roId) {
                                    return workshopRo
                                }
                                return order;
                            });
                        }
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

    },
    actions: {
        initAsync ({ commit }) {
            R.getAllOrders()
                .catch(err => {
                    alert('function getOrders is running into catch block');
                    commit({
                        type: 'init',
                        orders: [],
                        orderCounts: null,
                    });
                    Bu.st.setKey('orders', null);
                    Bu.st.setKey('orderCounts', null);
                })
                .then(res => {
                    alert('function getOrders is running into then block');
                    const { workshopRos, roStats, currentTime } = res.data;
                    const time_gap = currentTime - Date.now();
                    commit({
                        type: 'init',
                        orders: workshopRos,
                        orderCounts: roStats,
                        timeGap: Math.abs(time_gap) < 10 * 1000 ? 0 : time_gap
                    });
                    Bu.st.setKey('orders', workshopRos);
                    Bu.st.setKey('orderCounts', roStats);
                })

        },
	    fetchLineListAsync ({ commit }) {
            R.getLineList()
                .catch(err => {
                    alert('function getLineList is running into catch block');
                    commit({
                        type: 'fetchLineList',
                        lineList: []
                    });
                    Bu.st.setKey('lineList', null);
                })
                .then(res => {
                    alert('function getLineList is running into then block');
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
                        Bu.st.setKey('lineList', data);
                    }
                })

        },
    }



});