import { ADD_EXPENSE, GET_DATA } from './ActionTypes';

const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        payload: expense
    }
}

const getExpenses = () => {
    return {
        type: GET_DATA
    }
}

export default {
    addExpense,
    getExpenses
}