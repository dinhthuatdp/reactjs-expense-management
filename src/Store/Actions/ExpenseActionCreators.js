import {
    ADD_EXPENSE, GET_DATA, GET_DETAILS, DELETE_EXPENSE,
    UPDATE_EXPENSE
} from './ActionTypes';

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

const deleteExpense = (id) => {
    return {
        type: DELETE_EXPENSE,
        payload: id
    }
}

const updateExpense = (expense) => {
    return {
        type: UPDATE_EXPENSE,
        payload: expense
    }
}

const actionCreators = {
    addExpense,
    getExpenses,
    getExpenseDetails,
    deleteExpense,
    updateExpense
}

export default actionCreators;