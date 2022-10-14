import axiosClient from './axiosClient';

const baseUrl = process.env.REACT_APP_API_URL_EXPENSE;
const url = '/expenses';

const ExpenseApi = {
    add: (expense) => {
        axiosClient.defaults.baseURL = baseUrl;
        const formData = new FormData();
        Object.entries(expense).forEach(([key, value]) => {
            if (key === 'attachments') {
                for (var index = 0; index < value.length; index++) {
                    formData.append(key, value[index]);
                }
            } else {
                formData.append(key, value);
            }
        });
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        return axiosClient.post(url, formData, headers);
    }
}

export default ExpenseApi;