import { LOGIN, SIGN_UP, LOGOUT } from '../Actions/ActionTypes'

const initialState = {
    userCreated: ''
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('UserReducer LOGIN check action: ', action.payload);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            return state;
        case SIGN_UP:
            console.log('UserReducer SIGN_UP check action: ', action.payload);
            return {
                ...state,
                userCreated: action.payload.email
            };
        case LOGOUT:
            console.log('UserReducer LOGOUT check action: ', action.payload);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            return state;
        default:
            return state;
    }
}

export default userReducer;