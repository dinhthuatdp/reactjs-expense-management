import React from 'react';

import './Card.scss';

class Card extends React.Component {
    render() {
        const {
            text,
            date,
            actions
        } = this.props;
        return (
            <>
                <div className='card'>
                    <div className='card-group'>
                        <div className='text'>{text}</div>
                        <div className='date'>{date}</div>
                    </div>
                    <div className='actions'>
                        {/* <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete'>Delete</button> */}
                        {actions}
                    </div>
                </div>
            </>
        );
    }
}

export default Card;