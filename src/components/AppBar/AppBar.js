import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useNavigate,
    Navigate
} from "react-router-dom";
import { withTranslation } from 'react-i18next'

import './AppBar.scss';
import userActionCreators from '../../Store/Actions/UserActionCreators';
import { parseJwt } from '../../helpers/jwt-helper';
import i18n from '../../i18n';

class AppBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avatarText: localStorage.getItem('email')?.substring(0, 1),
            email: localStorage.getItem('email'),
            lang: 'vi'
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
    }

    onChangeLang = (e) => {
        this.setState({
            lang: e.target.value
        });
        i18n.changeLanguage(e.target.value);
    }

    render() {
        let isLogout = false;
        const { t } = this.props;
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
                        <Link className='app-bar-menu-item' to="/">{t('appBar.menuHome')}</Link>
                        <div className='app-bar-menu-item menu-management'>{t('appBar.menuManagement')}
                            <ul className='sub-menu'>
                                <Link className='sub-menu-item' to="/categories">{t('appBar.menuManagement.categories')}</Link>
                                <Link className='sub-menu-item' to="/expenses">{t('appBar.menuManagement.expenses')}</Link>
                            </ul>
                        </div>
                        <Link className='app-bar-menu-item' to="/about">{t('appBar.menuAbout')}</Link>
                        <select
                            className='app-bar-menu-item item-select'
                            value={this.state.lang}
                            onChange={(e) => this.onChangeLang(e)}>
                            <option className='item-option' value='vi'>{t('appBar.menuLang.vietnamese')}</option>
                            <option className='item-option' value='en'>{t('appBar.menuLang.english')}</option>
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['common'])(WithNavigate));