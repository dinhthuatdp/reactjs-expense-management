import React from 'react';

import './Popup.scss';

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let display;
        if (this.props.isShow) {
            display = {
                'display': 'flex'
            }
        } else {
            display = {
                'display': 'none'
            }
        }
        return (
            <>
                <div className='popup-wrapper' style={{ ...display }}>
                    <div className='popup-title'>{this.props.title}</div>
                    <div className='popup-content'>
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}

export default Popup;