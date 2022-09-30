import { LOGIN, SIGN_UP } from '../Actions/ActionTypes'

const initialState = {
    userCreated: ''
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('UserReducer LOGIN check action: ', action.payload);
            localStorage.setItem('token', action.payload.token);
            return state;
        case SIGN_UP:
            console.log('UserReducer SIGN_UP check action: ', action.payload);
            return {
                ...state,
                userCreated: action.payload.email
            };
        default:
            return state;
    }
}

export default userReducer;