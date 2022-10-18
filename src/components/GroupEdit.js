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
            let imageElements = [];
            if (Array.isArray(this.props.data)) {
                imageElements = this.props.data.map(x => {
                    return <img className='file-img' key={x} src={x} />;
                })
            }
            inputElement = <><input type={this.props.type}
                multiple
                onChange={(e) => this.onChangeInput(e)} />
                {
                    Array.isArray(this.props.data) ? (<div className='file-img-list'>{imageElements}</div>)
                        : (<img className='file-img' src={this.props.data} />)
                }

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