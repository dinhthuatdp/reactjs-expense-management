import React from 'react';
import { Link } from "react-router-dom";

import './AppBar.scss';

class AppBar extends React.Component {

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
                    <div className='user-avatar'>T</div>
                    <div className='user-name'>Thuat</div>
                </div>
            </div>
        );
    }
}

export default AppBar;