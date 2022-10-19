import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import './Home.scss';
import RowGroup from '../../components/Groups/RowGroup';
import { hasPermission } from '../../helpers/jwt-helper';
import expenseService from '../../services/expenseService';
import Loading from '../../components/Loading/Loading';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            isLoading: true,
            commonList: [],
            yourSpent: {}
        };
    }

    handleOnClick = (e) => {
        this.props.navigate('/expenses');
    }

    async componentDidMount() {
        this.setState({
            hasPermission: hasPermission(['Admin', 'User'])
        });
        await this.getSnapshot();
    }

    getSnapshot = async () => {
        const response = await expenseService.getSnapshot();

        this.setState({
            isLoading: false
        });
        if (!response) {
            console.log('Get snapshot expense error');
            return;
        }
        if (response.status &&
            response.status.statusCode !== 200) {
            console.log('Get snapshot error:', response.message);
            return;
        }
        this.setState({
            commonList: response.data.commonData,
            yourSpent: {
                soFarThisMonth: response.data.soFarThisMonth,
                today: response.data.today,
                yesterday: response.data.yesterday,
            }
        });
    }

    render() {
        const { t } = this.props;
        const headers = [t('label.passAverage'), t('label.thisMonth'), t('label.spentExtra')];
        const {
            soFarThisMonth,
            today,
            yesterday } = this.state.yourSpent;
        return (
            <>
                <div className='page-content home-page'>
                    {
                        this.state.isLoading ? <Loading />
                            : (
                                <>
                                    <div className='spent'>
                                        <div className='spent-title'>
                                            {t('label.yourSpent')}
                                        </div>
                                        <div className='spent-data'>
                                            <div className='left'>
                                                <div className='left-value'>${soFarThisMonth}</div>
                                                <div className='left-text'>{t('label.soFarThisMonth')}</div>
                                            </div>
                                            <div className='right'>
                                                <div className='info'>${today} <span>{t('label.today')}</span></div>
                                                <div className='info'>${yesterday} <span>{t('label.yesterday')}</span></div>
                                                <button className='see-more'
                                                    onClick={(e) => this.handleOnClick(e)}>{t('label.seeMore')}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='list-data'>
                                        {
                                            this.state.commonList && (
                                                this.state.commonList.map(x => {
                                                    return <RowGroup
                                                        title={x.categoryName}
                                                        headers={headers}
                                                        data={[x.passAverage, x.thisMonth, x.spentExtra]} />;
                                                })

                                            )
                                        }
                                    </div>
                                </>)
                    }
                </div>
            </>
        );
    }
}


function WithNavigate(props) {
    let nav = useNavigate();
    return <Home {...props} navigate={nav} />;
}

export default withTranslation(['common', 'text'])(WithNavigate);