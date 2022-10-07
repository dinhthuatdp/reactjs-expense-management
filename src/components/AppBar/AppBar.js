import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useNavigate,
    Navigate
} from "react-router-dom";

import './AppBar.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators';
import { parseJwt, getRoles } from '../../helpers/jwt-helper';

class AppBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avatarText: localStorage.getItem('email')?.substring(0, 1),
            email: localStorage.getItem('email'),
        }
    }

    handleLogoutOnClick = (e) => {
        e.preventDefault();
        const action = userActionCreators.logout();
        this.props.logout(action);
        this.props.navigate('/login');
    }

    handleUserInfoClick = (e) => {
        e.preventDefault();
    }

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem('items'));
    }

    render() {
        let isLogout = false;
        const token = localStorage.getItem('token');
        if (token) {
            const decodedJwt = parseJwt(token)
            if (decodedJwt.exp * 1000 < Date.now()) {
                isLogout = true;
            }
        } else {
            isLogout = true;
        }
        if (isLogout) {
            return <Navigate to='/login' />
        }

        return (
            <div className='app-bar'>
                <div className='app-bar-menu'>
                    <ul className='app-bar-menu-list'>
                        {/* <li className='app-bar-menu-item'><a href='/'>Home</a></li>
                        <li className='app-bar-menu-item'><a href='/about'>About</a></li> */}
                        <Link className='app-bar-menu-item' to="/">Home</Link>
                        {/* <Link className='app-bar-menu-item menu-management' to="/">
                        </Link> */}
                        <div className='app-bar-menu-item menu-management'>Management
                            <ul className='sub-menu'>
                                <Link className='sub-menu-item' to="/categories">Categories</Link>
                                <Link className='sub-menu-item' to="/expenses">Expenses</Link>
                            </ul>
                        </div>
                        <Link className='app-bar-menu-item' to="/about">About</Link>
                    </ul>
                </div>
                <div className='user-info'>
                    <div className='user-avatar'>{this.state.avatarText}</div>
                    <div className='user-name'>{this.state.email}</div>
                    <ul className='sub-menu'>
                        <Link className='sub-menu-item' to="/"
                            onClick={(e) => this.handleUserInfoClick(e)}>User info</Link>
                        <Link className='sub-menu-item' to="/about"
                            onClick={(e) => this.handleLogoutOnClick(e)}>Logout</Link>
                    </ul>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <AppBar {...props} navigate={navigate} />
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (action) => dispatch(action),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);