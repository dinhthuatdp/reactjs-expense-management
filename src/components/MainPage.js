import React from 'react';

import AppBar from '../components/AppBar/AppBar';

class MainPage extends React.Component {
    render() {
        return (
            <>
                <AppBar />
                {this.props.children}
            </>
        );
    }
}

export default MainPage;