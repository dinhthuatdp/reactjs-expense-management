import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';

import store from '../../Store/Store';
import './Login.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators';
import AuthApi from '../../api/authApi';

const LOGIN_BY_FB = 'loginByFacebook';
const LOGIN_BY_GG = 'loginByGoogle';

class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log('check getState userCreated', store.getState().users)
        this.state = {
            username: store.getState().users.userCreated,
            password: '',
            isShowPassword: false
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

    handleLoginClickButton(username, password) {
        console.log('>>>>handleLoginClickButton:::check props ', this.props)

        let user = {
            email: username,
            password: password,
            token: ''
        };

        const login = async () => {
            try {
                const response = await AuthApi.login(user);
                if (response.status &&
                    response.status.statusCode !== 200) {
                    console.log('Login error:', response.message)
                    return;
                }
                user.token = response.data.token;
                const action = userActionCreators.login(user);
                this.props.login(action);
                this.props.navigate('/')
            } catch (error) {
                console.log('Login failed', error);
            }
        }
        login();
    }

    handleLoginSocial(e) {
        if (e.target.id === LOGIN_BY_FB) {
            console.log('handleLoginSocial Facebook')
        } else if (e.target.id === LOGIN_BY_GG) {
            console.log('handleLoginSocial Google plus')
        }
    }

    handleShowHidePassword = (e) => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        const formikProps = {
            initialValues: {
                username: store.getState().users.userCreated,
                password: ''
            },
            validateOnBlur: true,
            validateOnChange: true,
            validationSchema: Yup.object().shape({
                username: Yup.string().email('Email invalid').required('Email is required.'),
                password: Yup.string().required('Please enter password'),
            }),
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                console.log('>>>>check handle submit: ', formValues)
                setSubmitting(true);
                try {
                    this.handleLoginClickButton(formValues.username, formValues.password);
                    resetForm(true);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        return (
            <Formik {...formikProps}>
                {
                    props => (
                        /* <div className='login-wrapper'>
                            
                        </div> */
                        <form className='login-form'
                            onSubmit={props.handleSubmit}>
                            <div className='login-text'>
                                Login
                                <div className='bottom-line'></div>
                            </div>
                            <div className='login-form-inputs'>
                                <div className='input-username'>
                                    <input className='login-input'
                                        type='text'
                                        name='username'
                                        value={props.values.username}
                                        placeholder='Email'
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange} />
                                    <ErrorMessage name='username' >
                                        {errMsg => <span className="error-message">{errMsg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className='login-input input-password'>
                                    {this.state.isShowPassword ?
                                        <i className="icon icon-right fa-solid fa-eye"
                                            onClick={(e) => this.handleShowHidePassword(e)}></i>
                                        : <i className="fa-solid icon-right1 fa-eye-slash"
                                            onClick={(e) => this.handleShowHidePassword(e)}></i>
                                    }
                                    <input className='login-input'
                                        name='password'
                                        value={props.values.password}
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange} />
                                    <ErrorMessage name='password' >
                                        {errMsg => <span className="error-message">{errMsg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={!props.isValid}
                                    className={!props.isValid ? 'disable-button login-button' : 'login-button'}
                                    type='submit'>Login</button>
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
                        </form>
                    )
                }
            </Formik>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);