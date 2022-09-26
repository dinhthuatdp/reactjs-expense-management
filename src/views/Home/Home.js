import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {

    handleOnClick = (e) => {
        this.props.navigate('/expenses');
    }

    render() {
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
                        <div className='content'>
                            <div className='content-title'>Groceries</div>
                            <div className='content-list'>
                                <div className='content-header'>
                                    <span>Pass average</span>
                                    <span>This month</span>
                                    <span>Spent Extra</span>
                                </div>
                                <div className='content-row'>
                                    <span>$38.5</span>
                                    <span className='col-active'>$57</span>
                                    <span>$18.5</span>
                                </div>
                            </div>
                        </div>
                        <div className='content'>
                            <div className='content-title' style={{ "--border-bottom": '#009900' }}>Commute</div>
                            <div className='content-list'>
                                <div className='content-header'>
                                    <span>Pass average</span>
                                    <span>This month</span>
                                    <span>Spent Extra</span>
                                </div>
                                <div className='content-row'>
                                    <span>$38.5</span>
                                    <span className='col-active'>$57</span>
                                    <span>$18.5</span>
                                </div>
                            </div>
                        </div>
                        <div className='content'>
                            <div className='content-title' style={{ "--border-bottom": '#3333ff' }} >Eating Out</div>
                            <div className='content-list'>
                                <div className='content-header'>
                                    <span>Pass average</span>
                                    <span>This month</span>
                                    <span>Spent Extra</span>
                                </div>
                                <div className='content-row'>
                                    <span>$38.5</span>
                                    <span className='col-active'>$57</span>
                                    <span>$18.5</span>
                                </div>
                            </div>
                        </div>
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