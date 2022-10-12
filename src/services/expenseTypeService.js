import expenseTypeApi from '../api/expenseTypeApi';

const ExpenseTypeService = {
    getAll: () => {
        const getAllExpenseType = async () => {
            try {
                const response = await expenseTypeApi.getAll();
                return response;
            } catch (error) {
                console.log('Get all expense type failed', error);
                return null;
            }
        }
        return getAllExpenseType();
    }
}

export default ExpenseTypeService;