import {decode} from 'jsonwebtoken';
import axios from "./axios-instance.util";

export const isAuthenticated = async function () {
    // Check if there is a valid accessToken in local storage.
    const accessToken = localStorage.getItem('access-token');
    if (accessToken && !isExpired(accessToken)) {
        return Promise.resolve(true);
    }

    // Attempt to retrieve a new access token via the refresh token (if one exists).
    const refreshToken = localStorage.getItem('refresh-token');
    if (refreshToken && !isExpired(refreshToken)) {
        return await axios.post('/auth/token', {
            "refresh-token": refreshToken
        })
            .then(res => {
                if (res.status === 200) {
                    const accessToken = res.data.access_token;

                    localStorage.setItem("access-token", accessToken);
                    return true;
                }
            }).catch(err => {
                return false;
            }
        );
    }

    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');

    return Promise.resolve(false);
};

function isExpired(token) {
    const decoded = decode(token);
    return Date.now() > decoded.exp * 1000;
}

export const handleLogin = function (data) {
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
};

export const handleLogout = function () {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
};

function retrieveToken(tokenKey) {
    const token = localStorage.getItem(tokenKey);
    if (token && !isExpired(token)) {
        return token;
    } else {
        return '';
    }
}

// Returns valid access token
export const retrieveAccessToken = function () {
    return retrieveToken('access-token');
};

// Returns valid refresh token
export const retrieveRefreshToken = function () {
    return retrieveToken('refresh-token');
};

export const isAdmin = function() {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
        const decoded = decode(accessToken);
        return decoded.isAdmin;
    }
    return false
};

export const getUserName = function() {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
        const decoded = decode(accessToken);
        return decoded.username;
    }
    return false
};
