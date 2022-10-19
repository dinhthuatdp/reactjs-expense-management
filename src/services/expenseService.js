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
    },
    edit: (expense) => {
        const editExpense = async (expense) => {
            try {
                const response = await expenseApi.edit(expense);
                return response;
            } catch (error) {
                console.log('Edit Expense failed', error);
                return null;
            }
        }
        return editExpense(expense);
    },
    delete: (id) => {
        const deleteExpense = async (id) => {
            try {
                const response = await expenseApi.delete(id);
                return response;
            } catch (error) {
                console.log('Delete Expense failed', error);
                return null;
            }
        }
        return deleteExpense(id);
    },
    getSnapshot: () => {
        const getSnapshot = async () => {
            try {
                const response = await expenseApi.getSnapshot();
                return response;
            } catch (error) {
                console.log('Get snapshot failed', error);
                return null;
            }
        }
        return getSnapshot();
    }
}

export default ExpenseService;