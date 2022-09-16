import React from 'react';

import './GroupInfo.scss';

class GroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            data: this.props.data
        }
    }
    render() {
        return (
            <div className='group-info'>
                <div className='text'>{this.state.text}</div>
                <div className='info'>{this.state.data}</div>
            </div>
        );
    }
}

export default GroupInfo;