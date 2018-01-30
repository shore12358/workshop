import bridge from './bridge';

class Storage {
    constructor () {

        // mock token
        this.setToken('some token in dev env');
        this.setTechInfo({ techId: 9, techName: '测试员工姓名', shopId: 38, shopName: '途虎平湖店'});
    }

    setTechInfo (info) {
        this.techInfo = typeof info === 'object' ? info : JSON.parse(info);
        try {
            localStorage.setItem('techInfo', JSON.stringify(this.techInfo));
        } catch (e) {

        }
        if (this.initTechInfoOk) {
            this.initTechInfoOk(this.techInfo);
            this.initTechInfoOk = null;
        }
    }
    getTechInfo () {
        return new Promise ((resolve, reject) => {
            let _techInfo;
            if (this.techInfo) {
                return resolve(this.techInfo);
            } else if (_techInfo = JSON.parse(localStorage.getItem('techInfo'))) {
                return resolve(_techInfo);
            } else {
                this.initTechInfoOk = resolve;

            }
        });
    }
    getTechInfoSync () {
        return this.techInfo ? this.techInfo : JSON.parse(localStorage.getItem('techInfo'));
    }
    fetchTechInfo () {
        bridge.go('getTechnicianInfo', { params: '' }, 'technicianBack');
    }

    setToken (token) {
        console.log('setToken', token, typeof token);
        this.userToken = typeof token === 'string' ? token : token.toString();
        if (this.initTokenOk) {
            this.initTokenOk(this.userToken);
            this.initTokenOk = null;
        }
    }
    getToken () {
        return new Promise ((resolve, reject) => {
            if (this.userToken) {
                console.log('get', this.userToken)
                return resolve(this.userToken);
            }
            this.initTokenOk = resolve;
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

