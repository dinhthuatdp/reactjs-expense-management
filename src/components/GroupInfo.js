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
        let imagesElement = [];
        if (Array.isArray(this.state.data) &&
            this.state.type === 'image') {
            imagesElement = this.state.data.map(x => {
                return <img key={x} alt='attachment image' className='info-img' src={x} />;
            });
        }
        return (
            <div className='group-info'>
                <div className='text'>{this.state.text}</div>
                {
                    this.state.type === 'image' ?
                        <div className='image-list'>{imagesElement}</div>
                        :
                        <div className='info'>{this.state.data}</div>
                }
            </div>
        );
    }
}

export default GroupInfo;