import { LOGIN } from '../Actions/ActionTypes'

const initialState = {

}
const userReducer = (state = initialState, action) => {

    console.log(`userReducer :: action :: ${action.type}`)

    switch (action.type) {
        case LOGIN:
            return state;
        default:
            return state;
    }
}

export default userReducer;