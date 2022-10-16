import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_EXPENSE;
const url = '/categories';

const CategoryApi = {
    getAll: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.get(url, { params });
    },
    add: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.post(url, { name: params });
    },
    edit: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.put(`${url}/${params.id}`, { name: params.name });
    },
    delete: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.delete(`${url}/${params}`, { id: params });
    }
}

export default CategoryApi;