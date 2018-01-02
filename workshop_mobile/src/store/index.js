import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        orders: [
            {
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
				lineId: 0,
				processId: 0,
				status: 0,

            },
            {
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 0,
                processId: 1,
                status: 0,

            },
            {
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 0,
                processId: 2,
                status: 1,

            },
            {
                no: '沪C12345',
                brand: '上海通用汽车别克 凯越',
                orderNo: 'TH18842734',
                lineId: 1,
                processId: 4,
                status: 1,

            }
		]
	},
	getters: {
		getOrdersByLineId: (state) => (lineId) => {
			const lineOrders = state.orders.filter(order => order.lineId === lineId);
			return (processId) => {
				return lineOrders.filter(order => order.processId === processId);
			}
		},
        getOrdersByProcessId: (state) => {
		    return (processId) => {
		        state.orders.filter(order => order.processId === processId);
            }
        }
	}


});