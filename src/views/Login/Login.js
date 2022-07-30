import React from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

import './Login.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators'

const LOGIN_BY_FB = 'loginByFacebook';
const LOGIN_BY_GG = 'loginByGoogle';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleOnchangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    handleOnchangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleLoginClickButton(e) {
        console.log(this.props)
        const action = userActionCreators.login({
            username: this.state.username,
            password: this.state.password
        });
        this.props.login(action);
    }

    handleLoginSocial(e) {
        if (e.target.id === LOGIN_BY_FB) {
            console.log('handleLoginSocial Facebook')
        } else if (e.target.id === LOGIN_BY_GG) {
            console.log('handleLoginSocial Google plus')
        }
    }

    render() {
        return (
            <div className='login-form'>
                <div className='login-text'>
                    Login
                    <div className='bottom-line'></div>
                </div>
                <div className='login-form-inputs'>
                    <div className='input-username'>
                        <input className='login-input'
                            type='text'
                            placeholder='Username'
                            onChange={(e) => this.handleOnchangeUsername(e)} />
                    </div>
                    <div className='login-input input-password'>
                        <input className='login-input'
                            type='password'
                            placeholder='Password'
                            onChange={(e) => this.handleOnchangePassword(e)} />
                    </div>
                </div>
                <div>
                    <button className='login-button'
                        onClick={(e) => this.handleLoginClickButton(e)}>Login</button>
                    <div className='forgot-password'>
                        Forgot your password?
                    </div>
                </div>
                <div className='social-login'>
                    <div className='social-text'>
                        or Connect With Social Media
                    </div>
                    <div
                        id='loginByFacebook'
                        onClick={(e) => this.handleLoginSocial(e)}
                        className='login-button social-login-fb'>
                        <i className="fa-brands fa-facebook-f"></i>
                        <span>Sign in With Facebook</span>
                    </div>
                    <div
                        id='loginByGoogle'
                        onClick={(e) => this.handleLoginSocial(e)}
                        className='login-button social-login-gp'>
                        <i className="fa-brands fa-google-plus-g"></i>
                        <span>Sign in With Google</span>
                    </div>
                </div>
                <div className='sign-up'>
                    {/* <a href='#'>Sign up</a> */}
                    <Link to='/sign-up'>Sign up</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (action) => dispatch(action),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);