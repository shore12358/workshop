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
            body: {
                optDescription: "string",
                optUser: "string",
                shopId: 0
            }
        })

};

const getLineList = () => {

    return fetch(API.getLineList, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            channel: "",
            blackbox: "",
            apiVersion: "",
            umengChannel: "",
            postData: {
                ShopID: 1
            }
        })
    })
        .then(res => res.json())
        .catch(res => {
            console.log(res);
        })

    // return fetch(API.getLineList, {
    //     method: 'post',
    //     body: {
    //         channel: "",
    //         blackbox: "",
    //         apiVersion: "",
    //         umengChannel: "",
    //         postData: {
    //             ShopID: 1
    //         }
    //     }
    // });
};

export {
    getAllOrders,
    getLineList
}


