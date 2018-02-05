import '../static/WebViewJavascriptBridge';
import fetch from './fetch';
import storage from './storage';
import { setHeadline } from './utils';

const Bu = {};

Bu.st = storage;
Bu.fetch = fetch;
Bu.setHeadline = setHeadline;

// window.technicianBack = data => {
//     Bu.st.setTechInfo(data);
// };
//
// window.tokenBack = data => {
//     Bu.st.setToken(data);
// };
//
// Bu.st.fetchTechInfo();
// Bu.st.fetchToken();

window.Bu = Bu;