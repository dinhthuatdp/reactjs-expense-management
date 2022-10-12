import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_AUTH;
const url = '/Authenticate';

const AuthApi = {
    login: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.post(`${url}/login`, params);
    },

    register: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.post(`${url}/register`, params);
    }
}

export default AuthApi;