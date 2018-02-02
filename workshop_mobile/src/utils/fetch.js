class Toast {
    constructor(conf_obj) {
        const { type, animTime, text } = conf_obj;
        this.__locked__ = false;
        this.type = type;
        this.text = text || '加载中';
        this.animTime = type === 2 ? (animTime || 1000) : null;
        this.$el = document.createElement('div');
        this.$el.id = `toast_${Date.now()}`;
        this.$el.innerHTML = type === 1 ? this.getLoadingT() : this.getErrorT();
    }
    getLoadingT () {
        return `
            <div class="f-toast">
              ${this.text}
              <img src="https://img3.tuhu.org/PeccancyCheXingYi/9b1a/bb4e/04d21e7280b2370b33fa88bc_w200_h200.png@100Q.png" class="f-loading-icon"></img>
            </div>
        `
    }
    getErrorT () {
        return `
            <div class="f-toast f-network-error">
              网络异常
            </div>
        `
    }
    showToast () {
        if (!Toast.locked) {
            Toast.$root.appendChild(this.$el);
            this.__locked__ = Toast.locked = true;
            if (this.type === 2) {
                setTimeout(() => { this.hideToast() }, this.animTime);
            }
        }
    }
    hideToast () {
        if (this.__locked__) {
            const el = document.getElementById(this.$el.id);
            el.style.display = 'none';
            setTimeout(() => { this.destroyToast(el) }, 2000);
            this.__locked__ = Toast.locked = false;
        }
    }
    destroyToast (el) {
        Toast.$root.removeChild(el);
    }

}
Toast.locked = false;
Toast.$root = document.getElementsByTagName('body')[0];


const myFetch = (url, data) => {
    return Bu.st.getToken()
        .then(token => {
            return new Promise((resolve, reject) => {
                const opts = {};
                if ('options' in data) {
                    const { options } = data;
                    opts.showToast = options.showToast;
                    opts.toastText = options.toastText;
                }

                if (opts.showToast !== false) {
                    var travel_time = 2 * 1000;
                    var toast_loading = new Toast({ type: 1, text: opts.toastText }); // loading...
                    var showLoadingAsync = setTimeout(() => {
                        toast_loading.showToast();
                    }, travel_time);
                }

                const req_obj = {};
                req_obj.method = data.method.toUpperCase() || 'GET';
                req_obj.headers = Object.assign({
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, data.headers);

                if (['POST'].indexOf(req_obj.method) !== -1) {
                    const _body = {
                        apiVersion: '',
                        blackBox: '',
                        channel: 'platemetal_h5',
                        umengChannel: '',
                        postData: data.postData
                    };

                    req_obj.body = JSON.stringify(_body);

                }
                fetch(url, req_obj)
                    .then(res => {
                        if (opts.showToast !== false) {
                            try {
                                clearTimeout(showLoadingAsync);
                            } catch (e) {

                            }
                            toast_loading.hideToast();
                        }
                        switch (res.status) {
                            case 401:
                                Bu.st.fetchToken();
                                myFetch(url, data)
                                    .then(res => {
                                        resolve(res);
                                    })
                                    .catch(() => {
                                        reject();
                                    });
                                break;
                            case 200:
                                resolve(res.json());
                                break;
                            default:

                        }
                    })
                    .catch(() => {
                        const toast_error = new Toast({ type: 2 }); // error
                        if (opts.showToast !== false) {
                            try {
                                clearTimeout(showLoadingAsync);
                            } catch (e) {

                            }
                            toast_loading.hideToast();
                        }
                        toast_error.showToast();
                        reject();
                    })
            })
        })

};

export default myFetch;