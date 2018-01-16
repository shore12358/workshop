const bridge = (() => {
    const { userAgent } = navigator;
    let deviceType;
    if (/android/i.test(userAgent)) {
        deviceType = 1;
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        deviceType = 2;
    } else {
        deviceType = 0;
    }
    const getDeviceType = () => deviceType;
    /*
     * @param nativeFn {string}
     * @param params {object}
     * @param cb {string}
     */
    const go = (nativeFn, params, cb) => {
        switch (deviceType) {
            case 1:
                window.WebViewJavascriptBridge.callHandler(
                    nativeFn,
                    params,
                    resData => {
                        eval(cb)(resData);
                    }
                );
                break;
            case 2:
                params.callback = cb;
                window.webkit.messageHandlers[nativeFn].postMessage(params);
                break;

            default:

        }
    };
    return {
        getDeviceType,
        go
    }

})();

export default bridge