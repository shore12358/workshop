import myFetch from '../utils/fetch';

const __PRO__ = 'PRODUCTION';
const TEST_SERVER_NET = 'http://172.16.20.50:84';
const TEST_SERVER_JAVA = 'http://shopapi.tuhu.work';
let PRO_SERVER;
let server_net, server_java;

if (process.env.NODE_ENV === __PRO__) {

} else {
    server_net = TEST_SERVER_NET;
    server_java = TEST_SERVER_JAVA;
}

const API = {
    getAllOrders: `${server_net}/rest/workshop/ro/getIndex`,
    getLineList: `${server_java}/api/LineProcess/GetLineProcessList`
};

const getAllOrders = () => {
    return myFetch(API.getAllOrders, {
        method: 'post',
        postData: {
            optDescription: "string",
            optUser: "string",
            shopId: 0
        },
        options: {

            // showToast{Boolean}
            toastText: '更新中'
        }
    })

};

const getLineList = () => {
    return myFetch(API.getLineList, {
        method: 'post',
        postData: {
            ShopID: 1
        }
    });
};

export {
    getAllOrders,
    getLineList
}


