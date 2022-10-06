import React from 'react';

import BasicDatePicker from './BasicDatePicker';
import './GroupEdit.scss';
import Dropdown from './Dropdown/Dropdown';

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
        this.props.onChange(e);
    }
    onChangeInputDate = (newDate) => {
        this.setState({
            data: newDate
        });
        this.props.onChange(newDate);
    }
    onChangeDropdownInput = (e) => {
        e.preventDefault();
        this.setState({
            data: {
                ...this.state.data,
                data: e.target.value
            }
        });
        this.props.onChange(e);
    }
    render() {
        let inputElement;
        if (this.state.type === 'date') {
            inputElement = <BasicDatePicker
                onChangeDate={(date) => this.onChangeInputDate(date)}
                value={this.state.data}
                text={this.state.text} />
        } else if (this.state.type === 'textarea') {
            inputElement = <textarea className='textarea' value={this.state.data}
                onChange={(e) => this.onChangeInput(e)} />;
        } else if (this.state.type === 'dropdown') {
            inputElement = <Dropdown list={this.state.data.dataList}
                value={this.state.data.data}
                onChange={(e) => this.onChangeDropdownInput(e)} />
        } else if (this.state.type === 'file') {
            inputElement = <><input type={this.state.type}
                onChange={(e) => this.onChangeInput(e)} />
                <img className='file-img' src={this.state.data} />
            </>;
        } else {
            inputElement = <input className='text-input' type={this.state.type}
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