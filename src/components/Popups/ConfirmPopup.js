import React from 'react';

import './ConfirmPopup.scss';

class ConfirmPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: this.props.isShow
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isShow !== this.props.isShow) {

            this.setState({
                isShow: this.props.isShow
            });
        }
    }

    handleOnClickCancel = (e) => {
        e.preventDefault();
        this.setState({ isShow: false });
        if (this.props.onCancel) {
            this.props.onCancel(e);
        }
    }

    handleOnClickOK = (e) => {
        e.preventDefault();
        this.setState({ isShow: false });
        if (this.props.onOk) {
            this.props.onOk(e);
        }
    }

    render() {
        const displayClass = this.state.isShow ?
            'confirm-wrapper confirm-popup-display'
            : 'confirm-wrapper confirm-popup-none';
        return (
            <>
                <div className={displayClass}>
                    <div className='confirm-popup'>
                        <div className='confirm-header'>
                            <div className='confirm-title'>This is Popup title</div>
                        </div>
                        <div className='confirm-actions'>
                            <button className='btn'
                                onClick={(e) => this.handleOnClickOK(e)}>OK</button>
                            <button onClick={(e) => this.handleOnClickCancel(e)} className='btn btn-cancel'>Cancel</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ConfirmPopup;