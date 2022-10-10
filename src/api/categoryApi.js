import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_EXPENSE;
const CategoryApi = {
    getAll: () => {
        axiosClient.defaults.baseURL = baseUrl;
        const url = '/categories';
        return axiosClient.get(url);
    },
    add: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        const url = '/categories';
        return axiosClient.post(url, { name: params });
    },
    edit: (params) => {

    },
    delete: (params) => {

    }
}

export default CategoryApi;