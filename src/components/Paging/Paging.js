import React from 'react';

import './Paging.scss';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: this.props.pageSize,
            totalPages: this.props.totalPages,
            pageNumber: this.props.pageNumber
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pageSize !== this.props.pageSize) {
            this.setState({
                pageSize: this.props.pageSize,
                pageNumber: this.props.pageNumber,
                totalPages: this.props.totalPages
            })
        }
    }

    handleOnClick = (e, pageNumber) => {
        if (this.state.pageNumber !== pageNumber) {
            this.props.loadData(pageNumber, this.state.pageSize);
            this.setState({
                pageNumber: pageNumber
            });
        }
    }

    handleFirstOnClick = (e) => {
        this.props.loadData(1, this.state.pageSize);
        this.setState({
            pageNumber: 1
        });
    }

    handleLastOnClick = (e) => {
        this.props.loadData(this.state.totalPages, this.state.pageSize);
        this.setState({
            pageNumber: this.state.totalPages
        });
    }

    handleNextOrPrevOnClick = (e, number) => {
        if (number === 1) {
            if (this.state.pageNumber < this.state.totalPages) {
                this.props.loadData(this.state.pageNumber + number, this.state.pageSize);
                this.setState({
                    pageNumber: this.state.pageNumber + number
                });
            }
        } else if (number === -1) {
            if (this.state.pageNumber > 1) {
                this.props.loadData(this.state.pageNumber + number, this.state.pageSize);
                this.setState({
                    pageNumber: this.state.pageNumber + number
                });
            }
        }
    }

    handleOnChangePageSize = (e) => {
        this.setState({
            pageSize: e.target.value
        });
    }
    handleKeyPressPageSize = (e) => {
        if (e.key === "Enter") {
            console.log('check enter:', e.target.value)
            this.props.loadData(this.state.pageNumber, this.state.pageSize);
        }
    }

    render() {
        const {
            totalPages,
            pageNumber,
        } = this.state;

        let hasPaging = true;
        if (!totalPages ||
            totalPages == 0) {
            hasPaging = false;
        }
        let pageElements = [];
        let pageLeft = [];
        let pageRight = [];
        let classActive = '';
        if (totalPages > 6) {
            for (let i = 1; i <= 3; i++) {
                if (i === pageNumber) {
                    classActive = 'page-active';
                } else {
                    classActive = '';
                }
                pageLeft.push(<li onClick={(e) => this.handleOnClick(e, i)} className={classActive} key={i}>{i}</li>);
                pageRight.push(<li onClick={(e) => this.handleOnClick(e, i)} className={classActive} key={totalPages - (i - 1)}>{totalPages - (i - 1)}</li>);
            }
            pageElements = [...pageLeft, '...', ...pageRight.reverse()];
        }
        else {
            for (let i = 1; i <= totalPages; i++) {
                if (i === pageNumber) {
                    classActive = 'page-active';
                } else {
                    classActive = '';
                }
                pageElements.push(<li onClick={(e) => this.handleOnClick(e, i)} key={i} className={classActive}>{i}</li>);
            }
        }
        return (
            <>
                {
                    hasPaging ?
                        (
                            <div className='paging'>
                                <div className='paging-top'>
                                    <ul className='paging-list'>
                                        <li onClick={(e) => this.handleFirstOnClick(e)}><i className="fa-solid fa-angles-left"></i></li>
                                        <li onClick={(e) => this.handleNextOrPrevOnClick(e, -1)}><i className="fa-solid fa-angle-left"></i></li>
                                        {pageElements}
                                        <li onClick={(e) => this.handleNextOrPrevOnClick(e, 1)}><i className="fa-solid fa-angle-right"></i></li>
                                        <li onClick={(e) => this.handleLastOnClick(e)}><i className="fa-solid fa-angles-right"></i></li>
                                    </ul>
                                    <div className='page-size'>
                                        <input value={this.state.pageSize}
                                            onChange={(e) => this.handleOnChangePageSize(e)}
                                            onKeyPress={(e) => this.handleKeyPressPageSize(e)} />
                                    </div>
                                </div>
                                {
                                    this.props.children
                                }
                                <div className='paging-bottom'>
                                    <ul className='paging-list'>
                                        <li onClick={(e) => this.handleFirstOnClick(e)}><i className="fa-solid fa-angles-left"></i></li>
                                        <li onClick={(e) => this.handleNextOrPrevOnClick(e, -1)}><i className="fa-solid fa-angle-left"></i></li>
                                        {pageElements}
                                        <li onClick={(e) => this.handleNextOrPrevOnClick(e, 1)}><i className="fa-solid fa-angle-right"></i></li>
                                        <li onClick={(e) => this.handleLastOnClick(e)}><i className="fa-solid fa-angles-right"></i></li>
                                    </ul>
                                    <div className='page-size'>
                                        <input value={this.state.pageSize}
                                            onChange={(e) => this.handleOnChangePageSize(e)}
                                            onKeyPress={(e) => this.handleKeyPressPageSize(e)} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            this.props.children
                        )
                }
            </>
        );
    }
}

export default Paging;