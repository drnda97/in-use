import Cookies from 'universal-cookie';
import Repository, { apiUrl } from '../repository/Repository';

const cookies = new Cookies();
let refresh_token = cookies.get('refresh_token');
let token = cookies.get('token');
let ogTokenDate = new Date();
let ogRefreshTokenDate = new Date();

export const getRefreshToken = () => {
    if (refresh_token) {
        return cookies.get('refresh_token');
    } else {
        return null;
    }
};

export const getTokenData = () => {
    if (!token || !refresh_token) {
        return null;
    }
    let base64Url = token ? token.split('.')[1] : refresh_token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export const getDataFromToken = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export const removeCookies = () => {
    cookies.remove('token', { path: '/', domain: window.location.hostname });
    cookies.remove('refresh_token', { path: '/', domain: window.location.hostname });
};

export const setCookies = (newToken, newRefreshToken) => {
    // ogTokenDate.setTime(ogTokenDate.getTime() + 2 * 60 * 1000);
    // ogRefreshTokenDate.setTime(ogRefreshTokenDate.getTime() + 60 * 60 * 1000);
    ogTokenDate.setTime(getDataFromToken(newToken).exp * 1000);
    ogRefreshTokenDate.setTime(getDataFromToken(newRefreshToken).exp * 1000);

    cookies.set('token', `${newToken}`, { path: '/', domain: window.location.hostname, expires: ogTokenDate });
    cookies.set('refresh_token', `${newRefreshToken}`, {
        path: '/',
        domain: window.location.hostname,
        expires: ogRefreshTokenDate,
    });
    window.location = "/"
};
export const tokenWillExpireIn = () => {
    if (!token) return null;
    const tokenData = getTokenData();
    const now = new Date();
    const exp = new Date(tokenData.exp * 1000);
    return exp.getTime() - now.getTime() - 100000;
};

export const setTimer = () => {
    setTimeout(() => {
        getNewToken();
    }, tokenWillExpireIn());
};

export const getNewToken = async () => {
    if (!refresh_token) return null;
    const response = await Repository.post(`${apiUrl}/user/reset-token`, {refresh_token: refresh_token});
    if (response.status === 200) {
        setCookies(response.data?.token, response.data?.refresh_token);
    }
};
