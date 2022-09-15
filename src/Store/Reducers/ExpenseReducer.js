import { ADD_EXPENSE, GET_DATA } from '../Actions/ActionTypes';


const initialState = {
    expenses: [],
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
        default:
            return state;
    }
}

export default expenseReducer;