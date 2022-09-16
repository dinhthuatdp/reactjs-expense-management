import React from 'react';

import BasicDatePicker from './BasicDatePicker';
import './GroupEdit.scss';

class GroupEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            data: this.props.data,
            type: this.props.type
        }
    }
    onChangeInput = (e) => {
        e.preventDefault();
        this.setState({
            data: e.target.value
        });
    }
    render() {
        let inputElement;
        if (this.state.type === 'date') {
            inputElement = <BasicDatePicker
                value={this.state.data}
                text={this.state.text} />
        } else if (this.state.type === 'textarea') {
            inputElement = <textarea value={this.state.data}
                onChange={(e) => this.onChangeInput(e)} />;
        } else {
            inputElement = <input type={this.state.type}
                value={this.state.data}
                onChange={(e) => this.onChangeInput(e)} />;
        }
        return (
            <div className='group-edit'>
                <div className='text'>{this.state.text}</div>
                {inputElement}
            </div>
        );
    }
}

export default GroupEdit;