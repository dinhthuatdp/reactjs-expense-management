import React from 'react';

import './RowGroup.scss';

class RowGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let headers;
        let data;
        if (this.props.headers) {
            headers = this.props.headers.map(x => {
                return <span key={x}>{x}</span>;
            })
        }
        if (this.props.data) {
            data = this.props.data.map(x => {
                return <span key={x}>{x}</span>
            });
        }
        return (
            <>
                <div className='content'>
                    <div className='content-title' style={{ "--border-bottom": this.props.borderColor }}>
                        {this.props.title}
                    </div>
                    <div className='content-list'>
                        <div className='content-header'>
                            {headers}
                        </div>
                        <div className='content-row'>
                            {data}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RowGroup;