import axios from 'axios';

axios.interceptors.request.use(function (config) {

    if (config.url !== '/login') {
        config.headers['Authorization'] = localStorage.getItem("AUTH-TOKEN")
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if(response.data.authorised===false){
        localStorage.removeItem("AUTH-TOKEN")
        window.location.href = "http://localhost:3000/login"
    }
    return response;
}, function (error) {

    if(error.response.status===403 || error.response.data.authorised===false){
        localStorage.removeItem("AUTH-TOKEN")
        if(window.location.pathname!=='/login') window.location.href = "http://localhost:3000/login"
    }
    return Promise.reject(error);
});

export default axios;

