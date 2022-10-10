import React from 'react';

import BasicDatePicker from './BasicDatePicker';
import './GroupEdit.scss';
import Dropdown from './Dropdown/Dropdown';

class GroupEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeInput = (e) => {
        e.preventDefault();
        this.props.onChange(e);
    }

    onChangeInputDate = (newDate) => {
        this.props.onChange(newDate);
    }

    onChangeDropdownInput = (e) => {
        e.preventDefault();
        this.props.onChange(e);
    }

    render() {
        let inputElement;
        if (this.props.type === 'date') {
            inputElement = <BasicDatePicker
                onChangeDate={(date) => this.onChangeInputDate(date)}
                value={this.props.data}
                text={this.props.text} />
        } else if (this.props.type === 'textarea') {
            inputElement = <textarea className='textarea' value={this.props.data}
                onChange={(e) => this.onChangeInput(e)} />;
        } else if (this.props.type === 'dropdown') {
            inputElement = <Dropdown list={this.props.data.dataList}
                value={this.props.data.data}
                onChange={(e) => this.onChangeDropdownInput(e)} />
        } else if (this.props.type === 'file') {
            inputElement = <><input type={this.props.type}
                onChange={(e) => this.onChangeInput(e)} />
                <img className='file-img' src={this.props.data} />
            </>;
        } else {
            inputElement = <input className='text-input' type={this.props.type}
                value={this.props.data}
                id={this.props.id}
                onChange={(e) => this.onChangeInput(e)} />;
        }
        return (
            <div className='group-edit'>
                <div className='text'>{this.props.text}</div>
                {inputElement}
            </div>
        );
    }
}

export default GroupEdit;