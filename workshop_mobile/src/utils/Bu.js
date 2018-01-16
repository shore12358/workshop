import fetch from './fetch';
import storage from './storage';

const Bu = {};

Bu.st = storage;
Bu.fetch = fetch;

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