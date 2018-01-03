const orders = [
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

    }
];
const lineList = [
	{
		displayName: '标准产线',
        lineId: 0,
		processCollection: [
            {
                processId: 0,
                text: '等待施工车辆'
            },
            {
                processId: 1,
                text: '钣金与拆装'
            },
            {
                processId: 2,
                text: '原子灰／中涂'
            },
		]
	},
    {
        displayName: '快修产线',
        lineId: 1,
        processCollection: [
            {
                processId: 3,
                text: '等待施工车辆'
            },
            {
                processId: 4,
                text: '钣金与拆装'
            }
        ]
    },
];

// const __PRO__ = 'PRODUCTION';
// const TEST_SERVER = 'http://172.16.20.50:84';
// let DEV_SERVER;
// let server;
//
// server = process.env.NODE_ENV === __PRO__ ? DEV_SERVER : TEST_SERVER;

const API = {
    getAllOrders: `/rest/workshop/ro/workshop_getIndex`
};

const getAllOrders = () => {

    return fetch(API.getAllOrders, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            shopId: 0
        })
    })
        .then(res => res.json())

};

const getLineList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(lineList), 100);
    })
};

export {
    getAllOrders,
    getLineList
}


