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
    }
}

export default ExpenseService;