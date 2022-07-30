import { LOGIN } from './ActionTypes';

const login = (user) => ({
    type: LOGIN,
    payload: {
        username: user.username,
        password: user.password
    }
})

export default {
    login
}