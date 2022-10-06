import { v4 as uuidv4 } from 'uuid';

import {
    ADD_EXPENSE, GET_DATA, GET_DETAILS, DELETE_EXPENSE,
    UPDATE_EXPENSE
} from '../Actions/ActionTypes';

const initialState = {
    expenses: [],
    expenseDetails: null
}

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            let newState = state.expenses;
            // newState.push({
            //     id: newState.length + 1,
            //     ...action.payload
            // });
            console.log('>>>> Check expense reducer ADD_EXPENSE: ', newState);
            return {
                ...state,
                expenses: [...state.expenses, {
                    id: uuidv4(),
                    ...action.payload
                }]
            };
        case GET_DATA:
            console.log('>>>> Check expense reducer GET_DATA: ', state.expenses);
            return state;
        case GET_DETAILS:
            const data = state.expenses.find(x => {
                return x.id === action.payload
            });
            return {
                ...state,
                expenseDetails: data
            };
        case DELETE_EXPENSE:
            const newList = state.expenses.filter(x => x.id !== action.payload);
            console.log('>>>> Check expense reducer DELETE_EXPENSE: ', newList);
            return {
                ...state,
                expenses: newList
            }
        case UPDATE_EXPENSE:
            let idx = state.expenses.findIndex(x => {
                return x.id === action.payload.id
            })
            if (idx < 0) {
                return state;
            }
            let newList1 = state.expenses;
            newList1[idx] = action.payload;

            console.log('>>>> Check expense reducer UPDATE_EXPENSE: ', action.payload);
            return {
                ...state,
                expenses: newList1
            }
        default:
            return state;
    }
}

export default expenseReducer;