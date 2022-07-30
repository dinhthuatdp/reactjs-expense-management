import React from 'react';

import './AppBar.scss';

class AppBar extends React.Component {

    render() {
        return (
            <div className='app-bar'>
                <div className='app-bar-menu'>
                    <ul className='app-bar-menu-list'>
                        <li className='app-bar-menu-item'><a href='#'>Home</a></li>
                        <li className='app-bar-menu-item'><a href='#'>About</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AppBar;