import axios from 'axios';
import {retrieveAccessToken, retrieveRefreshToken, handleLogout} from './authentication.util';
import {history} from '../App';

const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 1000
    // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
    config => {
        const token = retrieveAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        return config;
    },
    error => {
        Promise.reject(error)
    }
);

instance.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    const refreshToken = retrieveRefreshToken();

    if (error.response.status === 401 && originalRequest.url.endsWith('/token')) {
        handleLogout();
        history.push('/login');
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
        originalRequest._retry = true;
        return instance.post('/auth/token', {
            "refresh-token": refreshToken
        })
            .then(res => {
                if (res.status === 200) {
                    const accessToken = res.data.access_token;

                    localStorage.setItem("access-token", accessToken);
                    originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                    return instance(originalRequest);
                } else {
                    return Promise.reject(error);
                }
            }).catch(err => {

                handleLogout();
                history.push('/login');
                return Promise.reject(err);
            });
    }

    handleLogout();
    history.push('/login');
    return Promise.reject(error);
});

export default instance;