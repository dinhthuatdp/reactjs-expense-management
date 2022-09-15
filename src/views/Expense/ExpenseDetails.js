import React from 'react';

import AppBar from '../../components/AppBar/AppBar';
import './ExpenseDetails.scss';

class ExpenseDetails extends React.Component {

    render() {
        return (
            <div className='details-page'>
                <AppBar />
                <div>This is Expense details page</div>
            </div>
        );
    }
}

export default ExpenseDetails;