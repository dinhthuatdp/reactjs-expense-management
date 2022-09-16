import { ADD_EXPENSE, GET_DATA, GET_DETAILS } from '../Actions/ActionTypes';


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
                    id: newState.length + 1,
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
        default:
            return state;
    }
}

export default expenseReducer;