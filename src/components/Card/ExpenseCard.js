import React from 'react';
import { withTranslation } from 'react-i18next';

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
        const { t } = this.props;

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
                            onClick={(e) => this.props.viewOnClick(id)}>{t('label.view')}</button>
                        <button value={id} className='btn-edit btn'
                            onClick={(e) => this.props.editOnClick(id)}>{t('label.edit')}</button>
                        <button className='btn-delete btn'
                            onClick={(e) => this.props.deleteOnClick(id)}>{t('label.delete')}</button>
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation(['common'])(ExpenseCard);