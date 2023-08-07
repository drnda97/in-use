import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

const domain = 'http://aws-api.brandschecker.com:8080/trademark_check';
export const apiUrl = `${domain}/api/v1`;

const customHeaders = {
    Accept: 'application/json',
    Authorization: 'Basic Y2hlY2tlcjpjaDNjazNyMjAyMg==',
};

if (token) {
    Object.assign(customHeaders, { 'jwt-token': token });
}

const axiosInstance = axios.create({
    apiUrl,
    headers: customHeaders
});

export const setupInterceptors = (router, store) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        async function (error) {
            return interceptErrorResponse(error, router, store);
        }
    );
    axiosInstance.interceptors.request.use(
        (config) => {
            setCancelationToken(config, store);
            return config;
        },
        async function (error) {
            return Promise.reject(error);
        }
    );
};

const interceptErrorResponse = (error, router, store) => {
    if (error?.response?.status === 403) {
        router.push('/login');

        error.status = 403;
        error.message = 'You are not authorized. Please login';
    }

    return Promise.reject(error);
};

export default axiosInstance;

// Helpers

export const serializeQuery = (query) => {
    const paramsQuery = Object.keys(query)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');

    return `?${paramsQuery}`;
};

const setCancelationToken = (config, store) => {
    const source = axios.CancelToken.source();

    if (config) {
        config.cancelToken = source.token;
    } else {
        config = { cancelToken: source.token };
    }

    if (config.dependentOn) {
        dispatchSource(config.dependentOn, source, store);
    }
};

const dispatchSource = (dependentOn, source, store) => {
    switch (dependentOn) {
        case 'Language':
            console.warn('here i am');
            break;
        default:
            break;
    }
};
