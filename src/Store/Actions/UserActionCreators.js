import { LOGIN, SIGN_UP } from './ActionTypes';

const login = (user) => ({
    type: LOGIN,
    payload: {
        email: user.email,
        password: user.password,
        token: user.token
    }
})

const signUp = (username, email, password, confirmPassword) => ({
    type: SIGN_UP,
    payload: {
        username,
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