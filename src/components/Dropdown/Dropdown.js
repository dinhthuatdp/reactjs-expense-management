import React from 'react';

import './Dropdown.scss';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            list: this.props.list
        }
    }

    handleOnChange = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.onChange(e);
    }

    render() {
        let optionsElement = [];
        if (this.state.list && this.state.list.length > 0) {
            optionsElement = this.state.list.map(x => {
                return <option key={x.value} value={x.value}>{x.displayValue}</option>;
            })
        }
        return (
            <>
                {
                    (this.state.list && this.state.list.length > 0) && (
                        <select value={this.state.value}
                            name={this.props.name}
                            onChange={(e) => this.handleOnChange(e)}
                            className='select'>
                            {optionsElement}
                        </select>
                    )
                }
            </>
        );
    }
}

export default Dropdown;