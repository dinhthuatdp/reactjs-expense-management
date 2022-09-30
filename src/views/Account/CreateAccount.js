import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import * as Yup from 'yup';

import './CreateAccount.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators';
import { Formik, ErrorMessage } from "formik";
import AuthApi from '../../api/authApi';

const INPUT_EMAIL_ID = 'inputEmailId';
const INPUT_PASSWORD_ID = 'inputPasswordId';
const INPUT_CONFIRM_PASSWORD_ID = 'inputConfirmPasswordId';
const SHOW_PASSWORD_ID = 'showPasswordId';
const SHOW_PASSWORD_CONFIRM_ID = 'showPasswordConfirmId';
const SHOW_PASSWORD_HIDE_ID = 'showPasswordIdHide';
const SHOW_PASSWORD_CONFIRM_HIDE_ID = 'showPasswordConfirmIdHide';


class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isShowPassword: false,
            isShowPasswordConfirm: false
        }
    }

    handleSignup = (username, email, password, confirmPassword) => {
        var userRequest = {
            username,
            email,
            password,
            confirmPassword
        };

        const signUp = async (user) => {
            try {
                const response = await AuthApi.register(user);
                if (response.status &&
                    response.status.statusCode != 200) {
                    console.log('Register error:', response.message)
                    return;
                }

                const action = userActionCreators.signUp(user.username,
                    user.email,
                    user.password,
                    user.confirmPassword);
                this.props.signUp(action);
                this.props.navigate('/login')
            } catch (error) {
                console.log('Register failed', error);
            }
        }
        signUp(userRequest);
    }

    handleShowHidePassword = (e) => {
        console.log(e.target.id)
        if (e.target.id.includes(SHOW_PASSWORD_ID)) {
            this.setState({
                isShowPassword: !this.state.isShowPassword
            })
        } else if (e.target.id.includes(SHOW_PASSWORD_CONFIRM_ID)) {
            this.setState({
                isShowPasswordConfirm: !this.state.isShowPasswordConfirm
            })
        }
    }

    render() {
        const formikProps = {
            initialValues: initialValues,
            validateOnBlur: true,
            validateOnchange: true,
            validationSchema: validationSchema,
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    this.handleSignup(formValues.email, formValues.email, formValues.password, formValues.confirmPassword)
                    resetForm(true);
                } catch (e) {
                    console.error(e);
                }
                console.log('>>>> check users:', this.props.users)
            },
        }

        return (
            <Formik {...formikProps} >
                {props => (
                    <form
                        onSubmit={props.handleSubmit} className='create-acc-form'>
                        <div className='create-acc-text'>
                            Create Account
                        </div>
                        <div className='input-icons input-email'>
                            <i className="icon fa-solid fa-envelope"></i>
                            <input
                                name='email'
                                value={props.values.email}
                                onChange={props.handleChange}
                                id={INPUT_EMAIL_ID}
                                onBlur={props.handleBlur}
                                className='input-field'
                                type='text'
                                placeholder='Enter your email' />
                            <ErrorMessage name='email' >
                                {errMsg => <span className="error-message">{errMsg}</span>}
                            </ErrorMessage>
                        </div>
                        <div className='input-icons input-password'>
                            <i className="icon fa-solid fa-lock"></i>
                            {this.state.isShowPassword ?
                                <i className="icon icon-right fa-solid fa-eye"
                                    id={SHOW_PASSWORD_ID}
                                    onClick={(e) => this.handleShowHidePassword(e)}></i>
                                : <i className="fa-solid icon-right1 fa-eye-slash"
                                    id={SHOW_PASSWORD_HIDE_ID}
                                    onClick={(e) => this.handleShowHidePassword(e)}></i>
                            }
                            <input
                                name='password'
                                onChange={props.handleChange}
                                value={props.values.password}
                                id={INPUT_PASSWORD_ID}
                                onBlur={props.handleBlur}
                                className='input-field'
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                placeholder='Enter your password' />
                            <ErrorMessage name='password' >
                                {errMsg => <span className="error-message">{errMsg}</span>}
                            </ErrorMessage>
                        </div>
                        <div className='input-icons input-password'>
                            <i className="icon fa-solid fa-check"></i>
                            {this.state.isShowPasswordConfirm ?
                                <i className="icon icon-right fa-solid fa-eye"
                                    id={SHOW_PASSWORD_CONFIRM_ID}
                                    onClick={(e) => this.handleShowHidePassword(e)}></i>
                                : <i className="fa-solid icon-right1 fa-eye-slash"
                                    id={SHOW_PASSWORD_CONFIRM_HIDE_ID}
                                    onClick={(e) => this.handleShowHidePassword(e)}></i>
                            }
                            <input
                                name='confirmPassword'
                                value={props.values.confirmPassword}
                                id={INPUT_CONFIRM_PASSWORD_ID}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                className='input-field'
                                type={this.state.isShowPasswordConfirm ? 'text' : 'password'}
                                placeholder='Confirm password' />
                            <ErrorMessage name='confirmPassword' >
                                {errMsg => <span className="error-message">{errMsg}</span>}
                            </ErrorMessage>
                        </div>
                        <button
                            disabled={!props.isValid}
                            className={!props.isValid ? 'disable-button btn-sign-up' : 'btn-sign-up'}
                            type='submit'>Sign up</button>

                        <Link className='cancel' to='/login'>Cancel</Link>
                    </form>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (action) => dispatch(action)
    }
}

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email invalid').required('Email is required.'),
    password: Yup.string().required('Please enter password'),
    confirmPassword: Yup.string()
        .required('Please enter confirm password')
        .when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref('password')],
                'confirm password incorrect'
            )
        })
});

function WithNavigate(props) {
    let navigate = useNavigate();
    return <CreateAccount {...props} navigate={navigate} />
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);