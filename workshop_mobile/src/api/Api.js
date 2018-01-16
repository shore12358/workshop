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
    getProcessListByTechId: `${server_net}/api/LineProcess/GetProcessListByEmployeeID`

};

const getAllOrders = () => {
    return Bu.fetch(API.getAllOrders, {
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
    return Bu.fetch(API.getLineList, {
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
    return Bu.fetch(API.getOrderDetail, {
        method: 'post',
        postData: {
            optDescription: "string",
            optUser: "string",
            roId: 2
        }
    });
};

const getProcessListByTechId = () => {
    const { techId } = Bu.st.getTechInfo();
    return Bu.fetch(API.getProcessListByTechId, {
        method: 'post',
        postData: {
            EmployeeID: techId
        }
    });
};

export {
    getAllOrders,
    getLineList,
    getOrderDetail,
    getProcessListByTechId
}


