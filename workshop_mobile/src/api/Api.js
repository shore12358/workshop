// const __ENV__ = 'PRODUCTION';
// const __ENV__ = 'DEVELOPMENT';
const __ENV__ = 'TEST';
const DEV_SERVER_JAVA = 'https://workshopapi.tuhu.work';
// const DEV_SERVER_NET = 'https://shopapi.tuhu.work';
const DEV_SERVER_NET = 'https://shopapi-dev.tuhu.work';
const TEST_SERVER_JAVA = 'https://workshopapiut.tuhu.cn';
// const TEST_SERVER_NET = 'https://shopapiut.tuhu.cn';
const TEST_SERVER_NET = 'https://shopapidevut.tuhu.cn';
const SERVER_JAVA = 'https://workshopapi.tuhu.cn';
const SERVER_NET = 'https://shopapi.tuhu.cn';
let PRO_SERVER;
let server_net, server_java;

switch (__ENV__) {
    case 'PRODUCTION':
        server_net = SERVER_NET;
        server_java = SERVER_JAVA;
        break;

    case 'TEST':
        server_net = TEST_SERVER_NET;
        server_java = TEST_SERVER_JAVA;
        break;

    default:
        server_net = DEV_SERVER_NET;
        server_java = DEV_SERVER_JAVA;

}

const API = {
    getAllOrders: `${server_java}/rest/workshop/ro/getIndex`,
    getOrderDetail: `${server_java}/rest/workshop/ro/getRoDetail`,
    getLineList: `${server_net}/api/LineProcess/GetLineProcessList`,
    getProcessListByTechId: `${server_net}/api/LineProcess/GetProcessListByEmployeeID`,
    getTechListByProcessId: `${server_net}/api/TechnicianGroup/GetTechnicianListByProcessID`,
    processStartUp: `${server_java}/rest/workshop/ro/startProcess`,
    processCompleted: `${server_java}/rest/workshop/ro/completeProcess`,
    queryItemMasters: `${server_java}/rest/workshop/item/queryItemMasters`,
    pauseProcess: `${server_java}/rest/workshop/ro/pauseProcess`,
    getReworkInfo: `${server_java}/rest/workshop/ro/getRoReworkPage`,
    reworkProcess: `${server_java}/rest/workshop/ro/reworkProcess`,
    getUserHeaderImg: `${server_net}/api/TechnicianGroup/GetUserHeaderImg`,
    postProcessPhoto: `${server_java}/rest/workshop/ro/postProcessPartsPhoto`,
    getProcessPhoto: `${server_java}/rest/workshop/ro/queryProcessPartsPhotos`,
    getOrderPhoto: `${server_java}/rest/workshop/ro/getRoPhotoDetail`,
    getPaintsStatus: `${server_java}/rest/workshop/ro/getIndexRoPaintStats`

};

const getAllOrders = () => {
    return Bu.st.getTechInfo()
        .then(techInfo => {
            const { shopId } = techInfo;
            return Bu.fetch(API.getAllOrders, {
                method: 'post',
                postData: {
                    optDescription: "string",
                    optUser: "string",
                    shopId
                },
                options: {
                    // showToast: false,
                    toastText: '更新中'
                }
            })
        });
};

const getLineList = () => {
    return Bu.st.getTechInfo()
        .then(techInfo => {
            const { shopId } = techInfo;
            return Bu.fetch(API.getLineList, {
                method: 'post',
                postData: {
                    ShopID: shopId
                },
                options: {
                    // showToast: false,
                    toastText: '更新中'
                }
            });
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
            const { employeeId } = techInfo;
            return Bu.fetch(API.getProcessListByTechId, {
                method: 'post',
                postData: {
                    EmployeeID: employeeId
                },
                options: {
                    toastText: '更新中'
                }
            });
    });

};

const getTechListByProcessId = (pId) => {
    return Bu.st.getTechInfo()
        .then(techInfo => {
            const { shopId } = techInfo;
            return Bu.fetch(API.getTechListByProcessId, {
                method: 'post',
                postData: {
                    ShopID: shopId,
                    ProcessID: pId
                }
            });
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

const getReworkInfo = (roId, processId) => {
    return Bu.fetch(API.getReworkInfo, {
        method: 'post',
        postData: {
            roId,
            processId,
        }
    })
};

const reworkProcess = postData => {
    return Bu.fetch(API.reworkProcess, {
        method: 'post',
        postData
    })
};

const getUserHeaderImg = (TechnicianId) => {
    return Bu.fetch(API.getUserHeaderImg, {
        method: 'post',
        postData: {
            TechnicianId
        }
    });
};

const postProcessPhoto = (postData) => {
    return Bu.fetch(API.postProcessPhoto, {
        method: 'post',
        postData,
        options: {
            showToast: false,
        }
    });
};

const getProcessPhoto = (roMaintenanceLogId) => {
    return Bu.fetch(API.getProcessPhoto, {
        method: 'post',
        postData: {
            roMaintenanceLogId
        }
    });
};

const getOrderPhoto = (roId) => {
    return Bu.fetch(API.getOrderPhoto, {
        method: 'post',
        postData: {
            roId
        }
    });
};

const getPaintsStatus = () => {
    return Bu.st.getTechInfo()
        .then(techInfo => {
            const { shopId } = techInfo;
            return Bu.fetch(API.getPaintsStatus, {
                method: 'post',
                postData: {
                    shopId
                },
                options: {
                    toastText: '更新中'
                }
            });
        });
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
    pauseProcess,
    getReworkInfo,
    reworkProcess,
    getUserHeaderImg,
    postProcessPhoto,
    getProcessPhoto,
    getOrderPhoto,
    getPaintsStatus
}

