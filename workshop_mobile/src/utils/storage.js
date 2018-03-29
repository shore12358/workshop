import bridge from './bridge';

class Storage {
    constructor () {

        // mock token
        this.tokenCallback = [];
        this.techInfoCallback = [];
        this.photoListCallback = [];
        // this.setToken('some token in dev env');
        // this.setTechInfo({ techId: 11369, employeeId: 3455, techName: '测试员工姓名', shopId: 38, shopName: '途虎平湖店'});
    }

    setTechInfo (info) {
        let _techInfo = typeof info === 'object' ? info : JSON.parse(info);
        try {
            typeof _techInfo.employeeId === 'string' && (_techInfo.employeeId = Number(_techInfo.employeeId));
        } catch (e) {
            console.warn(new TypeError('unexpected techInfo when setting.'));
        }
        this.techInfo = _techInfo;
        if (this.techInfo && this.techInfoCallback.length) {
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
        this.setTechInfo(null);
        bridge.go('getTechnicianInfo', { params: '' }, 'technicianBack');
    }

    setToken (token) {
        this.userToken = typeof token === 'string' ? token : token.toString();
        if (this.userToken && this.tokenCallback.length) {
            for (let cb of this.tokenCallback) {
                cb(this.userToken);
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
    getTokenSync () {
        return this.userToken;
    }
    fetchToken () {
        this.setToken('');
        bridge.go('getToken', { params: '' }, 'tokenBack');
    }
    setPhotoList (list) {
        let plist = typeof list === 'object' ? list : JSON.parse(list);
        this.photoList = plist;
        if (this.photoList && this.photoListCallback.length) {
            for (let cb of this.photoListCallback) {
                cb(this.photoList)
            }
            this.photoListCallback.length = 0;
        }

    }
    getPhotoList () {
        return new Promise ((resolve, reject) => {
            if (this.photoList) {
                return resolve(this.photoList);
            }
            this.photoListCallback.push(resolve);
        });
    }
    fetchPhotoList (params) {
        this.setPhotoList(null);
        bridge.go('photographInPhoto', typeof params === 'object' ? params : JSON.parse(params), 'photographBackInPhoto');
    }

    setKey (key, val, permanent = 1) {
        try {
            if (val !== undefined) {
                if (permanent) {
                    localStorage.setItem(key, val === null ? null : JSON.stringify(val));
                } else {
                    sessionStorage.setItem(key, val === null ? null : JSON.stringify(val));
                }
            }
        } catch (e) {
            console.warn(`set ${permanent ? 'localStorage' : 'sessionStorage'} key:`, key, 'failed');
        }

    }
    getKey (key, permanent = 1) {
        try {
            if (permanent) {
                return JSON.parse(localStorage.getItem(key));
            } else {
                return JSON.parse(sessionStorage.getItem(key));
            }
        } catch (e) {
            console.warn(`get ${permanent ? 'localStorage' : 'sessionStorage'} key:`, key, 'failed');
            return null;
        }
    }
}

export default new Storage();

