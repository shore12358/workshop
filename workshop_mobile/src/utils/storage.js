import bridge from './bridge';

class Storage {
    constructor () {

        // mock token
        this.tokenCallback = [];
        this.techInfoCallback = [];
        // this.setToken('some token in dev env');
        // this.setTechInfo({ techId: 9, techName: '测试员工姓名', shopId: 38, shopName: '途虎平湖店'});
    }

    setTechInfo (info) {
        this.techInfo = typeof info === 'object' ? info : JSON.parse(info);
        if (this.techInfoCallback.length) {
            for (let cb of this.techInfoCallback) {
                cb(this.techInfo)
            }
            this.techInfoCallback.length = 0;
        }
    }
    getTechInfo () {
        return new Promise ((resolve, reject) => {
            if (this.techInfo) {
                return resolve(this.techInfo);
            }
            this.techInfoCallback.push(resolve);
        });
    }
    getTechInfoSync () {
        return this.techInfo ? this.techInfo : '';
    }
    fetchTechInfo () {
        bridge.go('getTechnicianInfo', { params: '' }, 'technicianBack');
    }

    setToken (token) {
        this.userToken = typeof token === 'string' ? token : token.toString();
        if (this.tokenCallback.length) {
            for (let cb of this.tokenCallback) {
                cb(this.userToken)
            }
            this.tokenCallback.length = 0;
        }
    }
    getToken () {
        return new Promise ((resolve, reject) => {
            if (this.userToken) {
                return resolve(this.userToken);
            }
            this.tokenCallback.push(resolve);
        });

    }
    fetchToken () {
        bridge.go('getToken', { params: '' }, 'tokenBack');
    }

    setKey (key, val) {
        try {
            if (val !== undefined) {
                localStorage.setItem(key, JSON.stringify(val));
            }
        } catch (e) {

        }

    }
    getKey (key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return undefined;
        }
    }
}

export default new Storage();

