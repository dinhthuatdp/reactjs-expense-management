import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import './Home.scss';
import RowGroup from '../../components/Groups/RowGroup';
import { hasPermission } from '../../helpers/jwt-helper';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false
        }
    }

    handleOnClick = (e) => {
        this.props.navigate('/expenses');
    }

    componentDidMount() {
        this.setState({
            hasPermission: hasPermission(['Admin', 'User'])
        });
    }

    render() {
        const { t } = this.props;
        const headers = [t('label.passAverage'), t('label.thisMonth'), t('label.spentExtra')];
        const top1 = ['$38.5', '$57', '$18.5'];
        const top2 = ['$39.5', '$57', '$17.5'];
        const top3 = ['$49.5', '$57', '$7.5'];

        return (
            <>
                <div className='page-content home-page'>
                    <div className='spent'>
                        <div className='spent-title'>
                            {t('label.yourSpent')}
                        </div>
                        <div className='spent-data'>
                            <div className='left'>
                                <div className='left-value'>$15</div>
                                <div className='left-text'>{t('label.soFarThisMonth')}</div>
                            </div>
                            <div className='right'>
                                <div className='info'>$15 <span>{t('label.today')}</span></div>
                                <div className='info'>$5 <span>{t('label.yesterday')}</span></div>
                                <button className='see-more'
                                    onClick={(e) => this.handleOnClick(e)}>{t('label.seeMore')}</button>
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

export default withTranslation(['common', 'text'])(WithNavigate);