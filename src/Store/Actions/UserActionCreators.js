import { LOGIN, SIGN_UP } from './ActionTypes';

const login = (user) => ({
    type: LOGIN,
    payload: {
        username: user.username,
        password: user.password
    }
})

const signUp = (email, password, confirmPassword) => ({
    type: SIGN_UP,
    payload: {
        email,
        password,
        confirmPassword
    }
})

const userCreators = {
    login,
    signUp
}

export default userCreators;