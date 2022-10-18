import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import './ExpenseDetails.scss';
import GroupInfo from '../../components/GroupInfo';
import GroupEdit from '../../components/GroupEdit';
import ExpenseActionCreators from '../../Store/Actions/ExpenseActionCreators';
import store from '../../Store/Store';
import expenseService from '../../services/expenseService';
import Loading from '../../components/Loading/Loading';
import categoryService from '../../services/categoryService';
import expenseTypeService from '../../services/expenseTypeService';

class ExpenseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            expenseDetails: null,
            categories: [],
            dropdownData: []
        };
    }

    async componentDidMount() {
        await this.loadData(this.props.params.id);
        await this.getCategories();
        await this.getAllExpenseTypes();
        this.setState({
            isEdit: this.props.location.state.isEdit
        })
    }

    getCategories = async () => {
        const response = await categoryService.getAll();
        if (!response) {
            console.log('Get All category error');
            return;
        }
        if (response.status &&
            response.status.statusCode !== 200) {
            console.log('Get All category error:', response.message)
            return;
        }
        if (response.data) {
            let data = [];
            response.data.forEach(x => {
                data.push({
                    value: x.id,
                    displayValue: x.name
                });
            });
            this.setState({
                categories: data
            });
        }
    }
    getAllExpenseTypes = async () => {
        const response = await expenseTypeService.getAll();

        if (!response) {
            console.log('Get All expense type error');
            return;
        }
        if (response.status &&
            response.status.statusCode !== 200) {
            console.log('Get all expense type error:', response.message)
            return;
        }
        if (response.data &&
            response.data.expenseTypes &&
            response.data.expenseTypes.length > 0) {
            let data = [];
            response.data.expenseTypes.forEach(x => {
                data.push({
                    value: x.id,
                    displayValue: x.name
                })
            });
            this.setState({
                dropdownData: data
            });
        }
    }

    loadData = async (id) => {
        // const action = ExpenseActionCreators.getExpenseDetails(id);
        // this.props.expenses(action);
        // this.setState({
        //     expenseDetails: store.getState().expenses.expenseDetails
        // })
        const getExpense = async (id) => {
            const response = await expenseService.get(id);
            this.setState({
                isLoading: false
            });
            if (!response) {
                console.log('Get expense error');
                return;
            }
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Get expense error:', response.message);
                return;
            }
            this.setState({
                expenseDetails: response.data
            });
        }

        await getExpense(id);
    }

    handleOnChangeInputDate = (value) => {
        this.setState({
            expenseDetails: {
                ...this.state.expenseDetails,
                date: value
            }
        });
    }

    handleOnChangeInput = (e, name) => {
        if (name === 'attachments') {
            this.setState({
                expenseDetails: {
                    ...this.state.expenseDetails,
                    attachments: e.target.files
                }
            });
        } else {
            this.setState({
                expenseDetails: {
                    ...this.state.expenseDetails,
                    [name]: e.target.value
                }
            });
        }
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

    handleSaveClick = async (e) => {
        e.preventDefault();
        // const action = ExpenseActionCreators.updateExpense({
        //     id: this.state.expenseDetails.id,
        //     type: this.state.expenseDetails.type,
        //     date: this.state.expenseDetails.date,
        //     cost: this.state.expenseDetails.cost,
        //     description: this.state.expenseDetails.description,
        //     category: this.state.expenseDetails.category,
        //     attachment: this.state.expenseDetails.attachment
        // });
        // this.props.expenses(action);
        const editExpense = async (expense) => {
            var response = await expenseService.edit(expense);

            if (!response) {
                console.log('Edit expense error');
                return;
            }
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Edit expense error:', response.message)
                return;
            }
            console.log('Edit expense success');
        }
        const expense = {
            id: this.state.expenseDetails.id,
            typeID: this.state.expenseDetails.typeID,
            date: this.state.expenseDetails.date,
            cost: this.state.expenseDetails.cost,
            description: this.state.expenseDetails.description,
            categoryID: this.state.expenseDetails.categoryID,
            attachments: this.state.expenseDetails.attachments
        }
        console.log('check expense edit', expense)
        await editExpense(expense);
        await this.loadData(expense.id);
        console.log('check state xxxxx', this.state.expenseDetails)
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    render() {
        let dropdownDataCategories = null;
        let dropdownData = null;
        if (this.state.expenseDetails) {
            dropdownData = {
                data: this.state.expenseDetails.typeID,
                dataList: this.state.dropdownData
            }
            dropdownDataCategories = {
                data: this.state.expenseDetails.categoryID,
                dataList: this.state.categories
                // dataList: [{
                //     value: 'incoming',
                //     displayValue: 'Incoming'
                // },
                // {
                //     value: 'spending',
                //     displayValue: 'Spending'
                // }]
            }
        }
        return (
            <div className='page-content details-page'>
                <div className='details-container'>
                    <div className='details-title'>Expense Details</div>
                    <div className='group-actions'>
                        <button className='btn'
                            onClick={(e) => this.handleBackClick(e)}>back</button>
                        <button className='btn btn-edit'
                            onClick={(e) => this.handleEditClick(e)}>Edit</button>
                    </div>
                    <div className='expense-info'>
                        {
                            this.state.isLoading ? <Loading />
                                : (
                                    this.state.expenseDetails ? (
                                        this.state.isEdit ?
                                            <>
                                                <GroupEdit
                                                    type='dropdown'
                                                    text='Type'
                                                    onChange={(e) => this.handleOnChangeInput(e, 'typeID')}
                                                    data={dropdownData} />
                                                <GroupEdit
                                                    type='date'
                                                    text='Date'
                                                    onChange={(newValue) => this.handleOnChangeInputDate(newValue)}
                                                    data={this.state.expenseDetails.date} />
                                                <GroupEdit
                                                    type='dropdown'
                                                    text='Category'
                                                    onChange={(e) => this.handleOnChangeInput(e, 'categoryID')}
                                                    data={dropdownDataCategories} />
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
                                                    onChange={(e) => this.handleOnChangeInput(e, 'attachments')}
                                                    data={this.state.expenseDetails.attachments} />
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
                                                    data={this.state.expenseDetails.attachments} />
                                            </>
                                    ) : (
                                            <div>No data display</div>
                                        )
                                )
                        }
                    </div>
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