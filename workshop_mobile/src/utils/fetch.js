const toastTemplate = `
    <div>toast</div>
`;

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