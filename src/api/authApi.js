import axiosClient from './axiosClient';

const AuthApi = {
    login: (params) => {
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