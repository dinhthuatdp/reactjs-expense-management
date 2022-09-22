import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
        this.setState({
            isEdit: this.props.location.state.isEdit
        })
    }

    loadData = (id) => {
        const action = ExpenseActionCreators.getExpenseDetails(id);
        this.props.expenses(action);
        this.setState({
            expenseDetails: store.getState().expenses.expenseDetails
        })
    }

    handleOnChangeInputDate = (value) => {
        console.log('handleOnChangeInputDate', ' value', value)

        this.setState({
            expenseDetails: {
                ...this.state.expenseDetails,
                date: value
            }
        });
    }

    handleOnChangeInput = (e, name) => {
        this.setState({
            expenseDetails: {
                ...this.state.expenseDetails,
                [name]: e.target.value
            }
        });
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
        const action = ExpenseActionCreators.updateExpense({
            id: this.state.expenseDetails.id,
            type: this.state.expenseDetails.type,
            date: this.state.expenseDetails.date,
            cost: this.state.expenseDetails.cost,
            description: this.state.expenseDetails.description,
            category: this.state.expenseDetails.category,
            attachment: this.state.expenseDetails.attachment
        });
        this.props.expenses(action);
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    render() {
        let dropdownData = null;
        if (this.state.expenseDetails) {
            dropdownData = {
                data: this.state.expenseDetails.type,
                dataList: ['incoming', 'spending']
            }
        }
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
                                        type='dropdown'
                                        text='Type'
                                        onChange={(e) => this.handleOnChangeInput(e, 'type')}
                                        data={dropdownData} />
                                    <GroupEdit
                                        type='date'
                                        text='Date'
                                        onChange={(newValue) => this.handleOnChangeInputDate(newValue)}
                                        data={this.state.expenseDetails.date} />
                                    <GroupEdit
                                        type='text'
                                        text='Category'
                                        onChange={(e) => this.handleOnChangeInput(e, 'category')}
                                        data={this.state.expenseDetails.category} />
                                    <GroupEdit
                                        type='text'
                                        text='Cost'
                                        onChange={(e) => this.handleOnChangeInput(e, 'cost')}
                                        data={this.state.expenseDetails.cost} />
                                    <GroupEdit
                                        type='textarea'
                                        text='Description'
                                        onChange={(e) => this.handleOnChangeInput(e, 'description')}
                                        data={this.state.expenseDetails.description} />
                                    <GroupEdit
                                        type='file'
                                        text='Attachment'
                                        onChange={(e) => this.handleOnChangeInput(e, 'attachment')}
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
                                        text='Type'
                                        data={this.state.expenseDetails.type} />
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
                                        type='image'
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
    let location = useLocation();
    return <ExpenseDetails {...props} navigate={navigate} params={params} location={location} />
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