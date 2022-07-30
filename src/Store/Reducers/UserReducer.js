import { LOGIN, SIGN_UP } from '../Actions/ActionTypes'

const initialState = {
    users: [
        { id: 1, email: 'user1@gmail.com', password: '123456' },
        { id: 2, email: 'user2@gmail.com', password: '222222' },
        { id: 3, email: 'user3@gmail.com', password: '333333' }
    ]
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return state;
        case SIGN_UP:
            var newState = state.users;
            newState.push({
                id: state.users.length + 1,
                email: action.payload.email,
                password: action.payload.password
            });
            return {
                ...state,
                users: newState
            };
        default:
            return state;
    }
}

export default userReducer;