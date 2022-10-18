import expenseApi from '../api/expenseApi';

const ExpenseService = {
    add: (expense) => {
        const addExpense = async (expense) => {
            try {
                const response = await expenseApi.add(expense);
                return response;
            } catch (error) {
                console.log('Add Expense failed', error);
                return null;
            }
        }
        return addExpense(expense);
    },
    getAll: (params) => {
        const getAllExpenses = async (params) => {
            try {
                const response = await expenseApi.getAll(params);
                return response;
            } catch (error) {
                console.log('Get All Expense failed', error);
                return null;
            }
        }
        return getAllExpenses(params);
    },
    get: (id) => {
        const getExpense = async (id) => {
            try {
                const response = await expenseApi.get(id);
                return response;
            } catch (error) {
                console.log('Get Expense failed', error);
                return null;
            }
        }

        return getExpense(id);
    }
}

export default ExpenseService;