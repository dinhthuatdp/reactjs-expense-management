import React from 'react';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import {
    useNavigate
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import './ExpenseList.scss';
import ExpenseCreate from '../Expense/ExpenseCreate';
import store from '../../Store/Store';
import ExpenseCard from '../../components/Card/ExpenseCard';
import expenseActionCreators from '../../Store/Actions/ExpenseActionCreators';
import expenseService from '../../services/expenseService';
import Loading from '../../components/Loading/Loading';

class ExpenseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            dataList: [],
            isShow: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadData();
    }

    handleSearch = (e) => {
        if (!this.state.dataList) {
            return;
        }
        if (this.state.searchValue) {
            const searchResult = this.state.dataList.filter(item => item.category.toLocaleLowerCase()
                .includes(this.state.searchValue.toLocaleLowerCase()))

            this.setState({
                dataList: searchResult
            })
        } else {
            this.setState({
                dataList: store.getState().expenses.expenses
            })
        }
    }

    handleSearchChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleSearch(e);
        }
    }

    handleAddExpense = (e) => {
        this.setState({
            isShow: !this.state.isShow
        });
    }

    handleCellClick = (params) => {
        this.props.navigate(`/expense/${params.id}`);
    }

    loadData = () => {
        // this.setState({ dataList: store.getState().expenses.expenses });
        const getAllExpense = async (params) => {
            const response = await expenseService.getAll(params);
            this.setState({
                isLoading: false
            });
            if (!response) {
                console.log('Get all expense error');
                return;
            }
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Get all expense error:', response.message)
                return;
            }
            this.setState({
                dataList: response.data.expenses
            })
        }
        getAllExpense(undefined);
    }

    editOnClick = (id) => {
        this.props.navigate(`/expense/${id}`, {
            state: {
                isEdit: true
            }
        });
    }

    viewOnClick = (id) => {
        this.props.navigate(`/expense/${id}`, {
            state: {
                isEdit: false
            }
        });
    }

    deleteOnClick = (id) => {
        const action = expenseActionCreators.deleteExpense(id);
        this.props.expenses(action);
        this.loadData();
    }

    render() {
        const elements = this.state.dataList.map(x => {
            return <ExpenseCard
                {...this.props}
                deleteOnClick={(e) => this.deleteOnClick(e, x.id)}
                editOnClick={(e) => this.editOnClick(e, x.id)}
                viewOnClick={(e) => this.viewOnClick(e, x.id)}
                key={x.id}
                data={x} />
        });
        const { t } = this.props;

        return (
            <div className='page-content'>
                {
                    this.state.isShow &&
                    (<ExpenseCreate
                        loadData={this.loadData}
                        handleCancelClick={this.handleAddExpense} />)
                }
                <div className='expenses-containers'>
                    <div className='expenses-title'>
                        {t('label.personalExpenseManagement')}
                    </div>
                    <div className='actions-form'>
                        <div className='actions-left'>
                            <Button className='btn-add' variant="contained"
                                onClick={(e) => this.handleAddExpense(e)}>{t('label.add')}</Button>
                        </div>
                        <div className='action-right'>
                            <input
                                value={this.state.searchValue}
                                onChange={(e) => this.handleSearchChange(e)}
                                onKeyPress={(e) => this.handleSearchKeyPress(e)}
                                className='input-search'
                                placeholder={t('label.search')}
                            />
                            <button className='btn-create btn-search'
                                onClick={(e) => this.handleSearch(e)}>{t('label.search')}</button>
                        </div>
                    </div>
                    <div className='data'>
                        {
                            this.state.isLoading ? (<Loading />)
                                : elements
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        expenses: (action) => dispatch(action)
    }
}

function WithNavigate(props) {
    let nav = useNavigate();
    return <ExpenseList {...props} navigate={nav} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['common'])(WithNavigate));