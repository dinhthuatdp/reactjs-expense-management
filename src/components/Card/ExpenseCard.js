import React from 'react';

import './ExpenseCard.scss';

class ExpenseCard extends React.Component {

    render() {
        const {
            id,
            type,
            date,
            cost,
            description,
            category,
            attachment
        } = this.props.data;

        return (
            <>
                <div className='card'>
                    {/* <div className='key'>{this.props.key}</div> */}
                    <div className='card-group'>
                        <div className='type'>
                            {type}
                        </div>
                        <div className='date'>
                            {date}
                        </div>
                    </div>
                    <div className='cost card-col'>
                        {cost} $
                    </div>
                    <div className='category card-col'>
                        {category}
                    </div>
                    <div className='desc card-col'>
                        {
                            description
                        }
                    </div>
                    <div className='actions'>
                        <button className='btn-view btn'
                            onClick={(e) => this.props.viewOnClick(id)}>View</button>
                        <button value={id} className='btn-edit btn'
                            onClick={(e) => this.props.editOnClick(id)}>Edit</button>
                        <button className='btn-delete btn'
                            onClick={(e) => this.props.deleteOnClick(id)}>Delete</button>
                    </div>
                </div>
            </>
        );
    }
}

export default ExpenseCard;