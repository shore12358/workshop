import myFetch from '../utils/fetch';

const __PRO__ = 'PRODUCTION';
const TEST_SERVER_JAVA = 'http://172.16.20.50:84';
const TEST_SERVER_NET = 'http://shopapi.tuhu.work';
let PRO_SERVER;
let server_net, server_java;

if (process.env.NODE_ENV === __PRO__) {

} else {
    server_net = TEST_SERVER_NET;
    server_java = TEST_SERVER_JAVA;
}

const API = {
    getAllOrders: `${server_java}/rest/workshop/ro/getIndex`,
    getOrderDetail: `${server_java}/rest/workshop/ro/getRoDetail`,
    getLineList: `${server_net}/api/LineProcess/GetLineProcessList`,


};

const getAllOrders = () => {
    return myFetch(API.getAllOrders, {
        method: 'post',
        postData: {
            optDescription: "string",
            optUser: "string",
            shopId: 38
        },
        options: {
            // showToast: false,
            toastText: '更新中'
        }
    })

};

const getLineList = () => {
    return myFetch(API.getLineList, {
        method: 'post',
        postData: {
            ShopID: 38
        },
        options: {
            // showToast: false,
            toastText: '更新中'
        }
    });
};

const getOrderDetail = () => {
    return myFetch(API.getOrderDetail, {
        method: 'post',
        postData: {
            optDescription: "string",
            optUser: "string",
            roId: 2
        }
    });
};

export {
    getAllOrders,
    getLineList,
    getOrderDetail,
}


