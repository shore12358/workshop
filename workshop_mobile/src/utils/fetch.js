class Toast {
    constructor(conf_obj) {
        const { type, animTime } = conf_obj;
        this.$el = document.createElement('div');
        this.$el.id = `toast_${Date.now()}`;
        this.$el.innerHTML = type === 1 ? this.getLoadingT() : this.getErrorT();
        this.__locked__ = false;
        this.type = type;
        this.animTime = type === 2 ? (animTime || 1000) : null;
    }

    getLoadingT () {
        return `
            <div class="f-toast">
              加载中
            </div>
        `
    }
    getErrorT () {
        return `
            <div>network error</div>
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
    return new Promise((resolve, reject) => {
        const travel_time = 2 * 1000;
        const toast_loading = new Toast({ type: 1 }); // loading...
        const showLoadingAsync = setTimeout(() => {
            toast_loading.showToast();
        }, travel_time);

        const req_obj = {};
        req_obj.method = data.method.toUpperCase() || 'GET';
        req_obj.headers = Object.assign({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }, data.headers);

        if (['POST'].indexOf(req_obj.method) !== -1) {
            const _body = {
                apiVersion: '',
                blackBox: '',
                channel: '',
                umengChannel: '',
                postData: data.postData
            };

            req_obj.body = JSON.stringify(_body);

        }
        fetch(url, req_obj)
            .then(res => {
                try {
                    clearTimeout(showLoadingAsync);
                } catch (e) {

                }
                resolve(res.json());
                toast_loading.hideToast();
            })
            .catch(() => {
                const toast_error = new Toast({ type: 2 }); // error
                toast_loading.hideToast();
                toast_error.showToast();
                reject();
            })
    })
};

export default myFetch;