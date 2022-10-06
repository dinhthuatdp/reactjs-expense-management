import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_AUTH;
const AuthApi = {
    login: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        const url = '/Authenticate/login';
        return axiosClient.post(url, params);
    },

    register: (params) => {
        console.log('check register params,', params)
        const url = '/Authenticate/register';
        return axiosClient.post(url, params);
    }
}

export default AuthApi;