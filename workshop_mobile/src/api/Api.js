const __PRO__ = 'PRODUCTION';
const TEST_SERVER_JAVA = 'https://workshopapi.tuhu.work';
const TEST_SERVER_NET = 'https://shopapi.tuhu.work';
let PRO_SERVER;
let server_net, server_java;

// if (process.env.NODE_ENV === __PRO__) {
//
// } else {
    server_net = TEST_SERVER_NET;
    server_java = TEST_SERVER_JAVA;
// }

const API = {
    getAllOrders: `${server_java}/rest/workshop/ro/getIndex`,
    getOrderDetail: `${server_java}/rest/workshop/ro/getRoDetail`,
    getLineList: `${server_net}/api/LineProcess/GetLineProcessList`,
    getProcessListByTechId: `${server_net}/api/LineProcess/GetProcessListByEmployeeID`,
    getTechListByProcessId: `${server_net}/api/TechnicianGroup/GetTechnicianListByProcessID`,
    processStartUp: `${server_java}/rest/workshop/ro/startProcess`,
    processCompleted: `${server_java}/rest/workshop/ro/completeProcess`,
    queryItemMasters: `${server_java}/rest/workshop/item/queryItemMasters`,
    pauseProcess: `${server_java}/rest/workshop/ro/pauseProcess`
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

const getOrderDetail = (id) => {
    return Bu.fetch(API.getOrderDetail, {
        method: 'post',
        postData: {
            optDescription: "string",
            optUser: "string",
            roId: id
        }
    });
};

const getProcessListByTechId = () => {
    return Bu.st.getTechInfo()
        .then(techInfo => {
            const { techId } = techInfo;
            console.log('tech', JSON.stringify(techInfo))
            return Bu.fetch(API.getProcessListByTechId, {
                method: 'post',
                postData: {
                    EmployeeID: techId
                }
            });
    });

};

const getTechListByProcessId = (pId) => {
    return Bu.fetch(API.getTechListByProcessId, {
        method: 'post',
        postData: {
            ShopID: 38,
            ProcessID: pId
        }
    });
};

const processStartUp = (postData) => {
    return Bu.fetch(API.processStartUp, {
        method: 'post',
        postData
    });
};

const processCompleted = (postData) => {
    return Bu.fetch(API.processCompleted, {
        method: 'post',
        postData
    });
};

/**
 * @param itemType {Number}: 1 for rework reason 2 for interrupt reason 3 for car color
 *
 */
const queryItemMasters = itemType => {
    return Bu.fetch(API.queryItemMasters, {
        method: 'post',
        postData: {
            itemType
        }
    })
};

const pauseProcess = (postData) => {
    return Bu.fetch(API.pauseProcess, {
        method: 'post',
        postData
    })
};
export {
    getAllOrders,
    getLineList,
    getOrderDetail,
    getProcessListByTechId,
    getTechListByProcessId,
    processStartUp,
    processCompleted,
    queryItemMasters,
    pauseProcess
}


