import { ADD_EXPENSE } from './ActionTypes';

const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        payload: expense
    }
}

export default {
    addExpense
}