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
        axiosClient.defaults.baseURL = baseUrl;
        const url = `/categories/${params.id}`;
        return axiosClient.put(url, { name: params.name });
    },
    delete: (params) => {
        axiosClient.defaults.baseURL = baseUrl;
        const url = `/categories/${params}`;
        return axiosClient.delete(url, { id: params });
    }
}

export default CategoryApi;