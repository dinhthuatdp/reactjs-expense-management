import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class BasicDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            text: this.props.text
        }
    }

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={this.state.text}
                    value={this.state.value}
                    onChange={(newValue) => {
                        this.setState({
                            value: newValue
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        );
    }
}

export default BasicDatePicker;