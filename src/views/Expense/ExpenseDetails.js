import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import './ExpenseDetails.scss';
import GroupInfo from '../../components/GroupInfo';
import GroupEdit from '../../components/GroupEdit';
import ExpenseActionCreators from '../../Store/Actions/ExpenseActionCreators';
import store from '../../Store/Store';

class ExpenseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            expenseDetails: null
        };
    }

    componentDidMount() {
        this.loadData(this.props.params.id);
    }

    loadData = (id) => {
        const action = ExpenseActionCreators.getExpenseDetails(parseInt(id));
        this.props.expenses(action);
        this.setState({
            expenseDetails: store.getState().expenses.expenseDetails
        })
    }

    handleBackClick = (e) => {
        e.preventDefault();
        this.props.navigate(-1);
    }

    handleEditClick = (e) => {
        e.preventDefault();
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleCancelClick = (e) => {
        e.preventDefault();
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleSaveClick = (e) => {
        e.preventDefault();
        // TODO
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    render() {
        return (
            <div className='page-content details-page'>
                <div className='details-container'>
                    <div className='group-actions'>
                        <button className='btn'
                            onClick={(e) => this.handleBackClick(e)}>back</button>
                        <button className='btn btn-edit'
                            onClick={(e) => this.handleEditClick(e)}>Edit</button>
                    </div>
                    {
                        this.state.expenseDetails ? (
                            this.state.isEdit ?
                                <>
                                    <GroupEdit
                                        type='date'
                                        text='Date'
                                        data={this.state.expenseDetails.date} />
                                    <GroupEdit
                                        type='text'
                                        text='Category'
                                        data={this.state.expenseDetails.category} />
                                    <GroupEdit
                                        type='text'
                                        text='Cost'
                                        data={this.state.expenseDetails.cost} />
                                    <GroupEdit
                                        type='textarea'
                                        text='Description'
                                        data={this.state.expenseDetails.description} />
                                    <GroupEdit
                                        type='text'
                                        text='Attachment'
                                        data={this.state.expenseDetails.attachment} />
                                    <div className='edit-actions'>
                                        <button className='btn'
                                            onClick={(e) => this.handleSaveClick(e)}>Save</button>
                                        <button className='btn btn-cancel'
                                            onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
                                    </div>
                                </>
                                : <>
                                    <GroupInfo
                                        text='Date'
                                        data={this.state.expenseDetails.date} />
                                    <GroupInfo
                                        text='Category'
                                        data={this.state.expenseDetails.category} />
                                    <GroupInfo
                                        text='Cost'
                                        data={this.state.expenseDetails.cost} />
                                    <GroupInfo
                                        text='Description'
                                        data={this.state.expenseDetails.description} />
                                    <GroupInfo
                                        text='Attachment'
                                        data={this.state.expenseDetails.attachment} />
                                </>
                        ) : (
                                <div>No data display</div>
                            )
                    }
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams();
    return <ExpenseDetails {...props} navigate={navigate} params={params} />
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        expenses: (action) => dispatch(action),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);