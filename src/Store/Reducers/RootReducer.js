import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import expenseReducer from './ExpenseReducer';

const rootReducer = combineReducers({
    users: userReducer,
    expenses: expenseReducer,
})

export default rootReducer;