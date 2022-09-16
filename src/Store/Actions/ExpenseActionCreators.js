import { ADD_EXPENSE, GET_DATA, GET_DETAILS } from './ActionTypes';

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

const getExpenseDetails = (id) => {
    return {
        type: GET_DETAILS,
        payload: id
    }
}

const actionCreators = {
    addExpense,
    getExpenses,
    getExpenseDetails
}

export default actionCreators;