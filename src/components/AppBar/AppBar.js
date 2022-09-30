import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useNavigate
} from "react-router-dom";

import './AppBar.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators';

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
        console.log('xxx', this.props)
        this.props.logout(action);
        this.props.navigate('/login');
    }

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem('items'));
    }

    render() {
        return (
            <div className='app-bar'>
                <div className='app-bar-menu'>
                    <ul className='app-bar-menu-list'>
                        {/* <li className='app-bar-menu-item'><a href='/'>Home</a></li>
                        <li className='app-bar-menu-item'><a href='/about'>About</a></li> */}
                        <Link className='app-bar-menu-item' to="/">Home</Link>
                        <Link className='app-bar-menu-item' to="/about">About</Link>
                    </ul>
                </div>
                <div className='user-info'>
                    <div className='user-avatar'>{this.state.avatarText}</div>
                    <div className='user-name'>{this.state.email}</div>
                    <ul className='user-menu'>
                        <Link className='user-menu-item' to="/">User info</Link>
                        <Link className='user-menu-item' to="/about"
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