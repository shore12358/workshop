import bridge from './bridge';

class Storage {
    constructor () {

        // mock token
        this.setToken('some token in dev env');
        this.setTechInfo({ techId: 9, techName: '测试员工姓名'});
    }

    setTechInfo (info) {
        this.techInfo = typeof info === 'object' ? info : JSON.parse(info);
        try {
            localStorage.setItem('techInfo', JSON.stringify(this.techInfo));
        } catch (e) {

        }
    }
    getTechInfo () {
        return this.techInfo ? this.techInfo : JSON.parse(localStorage.getItem('techInfo'));
    }
    fetchTechInfo () {
        bridge.go('getTechnicianInfo', { params: '' }, 'technicianBack');
    }

    setToken (token) {
        this.userToken = typeof token === 'string' ? token : token.toString();
        if (this.initTokenOk) {
            this.initTokenOk(this.userToken);
            this.initTokenOk = null;
        }
    }
    getToken () {
        return new Promise ((resolve, reject) => {
            if (this.userToken) {
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

