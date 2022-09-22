import React from 'react';

import './GroupInfo.scss';

class GroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            data: this.props.data,
            type: this.props.type
        }
    }
    render() {
        return (
            <div className='group-info'>
                <div className='text'>{this.state.text}</div>
                {
                    this.state.type === 'image' ?
                        <img className='info-img' src={this.state.data} />
                        :
                        <div className='info'>{this.state.data}</div>
                }
            </div>
        );
    }
}

export default GroupInfo;