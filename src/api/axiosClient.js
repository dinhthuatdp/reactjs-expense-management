import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token.
    // console.log('check axios config handle token', config)
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response &&
        response.data) {
        return response.data;
    }
}, (error) => {
    // Handle error.
    throw error;
});

export default axiosClient;