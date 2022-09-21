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
    onChangeDropdownInput = (e) => {
        e.preventDefault();
        this.setState({
            data: {
                ...this.state.data,
                data: e.target.value
            }
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
        } else if (this.state.type === 'dropdown') {
            let options = null;
            if (this.state.data.dataList) {
                options = this.state.data.dataList.map(x => {
                    return <option key={x} value={x}>{x}</option>;
                });
            }
            inputElement = <select value={this.state.data.data}
                onChange={(e) => this.onChangeDropdownInput(e)}>
                {options}
            </select>
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