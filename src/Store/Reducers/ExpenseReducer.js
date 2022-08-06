import { ADD_EXPENSE } from '../Actions/ActionTypes';


const initialState = {
    expenses: [],
}

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            let newState = state.expenses;
            newState.push({
                id: newState.length + 1,
                ...action.payload
            });
            console.log('>>>> Check expense reducer ADD_EXPENSE: ', newState);
            return {
                ...state,
                expenses: newState
            };
        default:
            return state;
    }
}

export default expenseReducer;