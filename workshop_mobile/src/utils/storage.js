import bridge from './bridge';

class Storage {
    constructor () {

        // mock token
        this.tokenCallback = [];
        this.techInfoCallback = [];
        this.photoListCallback = [];
        // this.setToken('eyJhbGciOiJSUzI1NiIsImtpZCI6IjkxM0ZBOEY1MTgzQzYwMkUwQjQxMjdFMEY0Q0JFOUQ1NjE1QjNERTIiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1MjMzNTc0NDgsImV4cCI6MTUyMzM2MTA0OCwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MudHVodS53b3JrIiwiYXVkIjpbImh0dHBzOi8vYWNjZXNzLnR1aHUud29yay9yZXNvdXJjZXMiLCJzaXRlX3NhcGkiLCJzaXRlX3Nob3BhcGkiLCJzaXRlX3dvcmtzaG9wYXBpIl0sImNsaWVudF9pZCI6InNhcGkudHVodS5jbiIsInN1YiI6IjA4ZDU2Yzc2NGNiMmMxNjg1N2MzNTEwNzY3NDJkNWVkIiwiYXV0aF90aW1lIjoxNTIzMzU3NDQ4LCJpZHAiOiJTaG9wIiwiaWQiOjkwNiwibmFtZSI6IumAlOiZjuWFu-i9puW3peWcuuW6lyjku5npnJ7lsI_lkagpIiwiZW1haWwiOiJkbTAwMDM4Iiwic2NvcGUiOlsic2l0ZV9zYXBpIiwic2l0ZV9zaG9wYXBpIiwic2l0ZV93b3Jrc2hvcGFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJTaG9wIl19.mWtxLgh8rnZwHqZJvB4lydQIxWaExeh9tLZMmcW7AdgjAXLZbvT4t7901NZSvRHh5q3cqXtU1lhdgynxR9sbX30zH-mIT0icJ3DhRO_-SmYYWtNOKOytRpHCtoWLMYYYdCghOT8qjr7-_O5ANEiCLOL69BKbISmmVlxx_-v6jbkVp1Isp53O9Ejx0n_aP_O9pfupriUlH464r7G4YGV8Otkm9-HF-X-uWSTWK7FVj_veIkFYKtxan7tfc2FYWlSP1t7AI6lOT8BAJNO-YgJFyCzC-dKfQHriHmlq_0e0plmZ5vG3mMhwGvrcz8fpY5TupEmSIqUK_ttRKB_jrRJ3ng');
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

