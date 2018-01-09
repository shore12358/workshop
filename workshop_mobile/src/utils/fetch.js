class Toast {
    constructor(type_value) {
        this.$el = document.createElement('div');
        this.$el.id = `toast_${Date.now()}`;
        this.$el.innerHTML = type_value === 1 ? this.getLoadingT() : this.getErrorT();
        this.__locked = false;
    }
    static locked = false;
    static $root = document.getElementsByTagName('body')[0];

    getLoadingT () {
        return `
            <div>loading</div>
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
            this.__locked = Toast.locked = true;
        }
    }
    hideToast () {
        if (this.__locked) {
            const el = document.getElementById(this.$el.id);
            el.style.display = 'none';
            setTimeout(() => { this.destroyToast(el) }, 2000);
            this.__locked = Toast.locked = false;
        }
    }
    destroyToast (el) {
        Toast.$root.removeChild(el);
    }
};


const myFetch = (url, data) => {
    return new Promise((resolve, reject) => {
        const travel_time = 2 * 1000;
        const showLoadingAsync = setTimeout(() => {
            // TODO: show loading...

        }, travel_time);
        const req_obj = {};
        req_obj.method = data.method.toUpperCase() || 'GET';
        req_obj.headers = Object.assign({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }, data.headers);

        if (['POST'].indexOf(req_obj.method) !== -1) {
            req_obj.body = JSON.stringify(data.body);
        }
        fetch(url, req_obj)
            .then(res => {
                try {
                    clearTimeout(showLoadingAsync);
                } catch (e) {

                }
                resolve(res.json())
            })
            .catch(() => {
                // TODO: show network error
                reject();
            })
    })
};

export default myFetch;