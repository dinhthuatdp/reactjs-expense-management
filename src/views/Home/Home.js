import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.scss';
import RowGroup from '../../components/Groups/RowGroup';

class Home extends React.Component {

    handleOnClick = (e) => {
        this.props.navigate('/expenses');
    }

    render() {
        const headers = ['Pass average', 'This month', 'Spent Extra'];
        const top1 = ['$38.5', '$57', '$18.5'];
        const top2 = ['$39.5', '$57', '$17.5'];
        const top3 = ['$49.5', '$57', '$7.5'];
        return (
            <>
                <div className='page-content home-page'>
                    <div className='spent'>
                        <div className='spent-title'>
                            You're Spent
                        </div>
                        <div className='spent-data'>
                            <div className='left'>
                                <div className='left-value'>$15</div>
                                <div className='left-text'>so far this month</div>
                            </div>
                            <div className='right'>
                                <div className='info'>$15 <span>today</span></div>
                                <div className='info'>$5 <span>yesterday</span></div>
                                <button className='see-more'
                                    onClick={(e) => this.handleOnClick(e)}>See more</button>
                            </div>
                        </div>
                    </div>
                    <div className='list-data'>
                        <RowGroup
                            title='Groceries'
                            headers={headers}
                            data={top1} />
                        <RowGroup
                            borderColor='#009900'
                            title='Commute'
                            headers={headers}
                            data={top2} />
                        <RowGroup
                            borderColor='#3333ff'
                            title='Eating Out'
                            headers={headers}
                            data={top3} />
                    </div>
                </div>
            </>
        );
    }
}


function WithNavigate(props) {
    let nav = useNavigate();
    return <Home {...props} navigate={nav} />;
}

export default WithNavigate;