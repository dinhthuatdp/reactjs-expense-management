import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_EXPENSE;
const url = '/expenses';

const ExpenseApi = {
    add: (expense) => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.post(url, expense);
    }
}

export default ExpenseApi;