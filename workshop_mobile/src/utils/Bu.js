import '../static/WebViewJavascriptBridge';
import fetch from './fetch';
import storage from './storage';
import { setHeadline } from './utils';

const Bu = {};

Bu.st = storage;
Bu.fetch = fetch;
Bu.setHeadline = setHeadline;

window.technicianBack = data => {
    Bu.st.setTechInfo(data);
};

window.tokenBack = data => {
    console.log('refresh token from app: ' + data);
    Bu.st.setToken(data);
};

window.photographBackInPhoto = data => {
    console.log('window.photographBack: ' + data);
    Bu.st.setPhotoList(data);
};
Bu.st.fetchTechInfo();
Bu.st.fetchToken();

window.Bu = Bu;