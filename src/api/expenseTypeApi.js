import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_EXPENSE;
const url = '/expenseTypes';

const ExpenseTypeApi = {
    getAll: () => {
        axiosClient.defaults.baseURL = baseUrl;
        return axiosClient.get(url);
    }
}

export default ExpenseTypeApi;