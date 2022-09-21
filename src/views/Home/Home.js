import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import {
    useNavigate
} from 'react-router-dom';

import './Home.scss';
import ExpenseCreate from '../Expense/ExpenseCreate';
import store from '../../Store/Store';
import ExpenseCard from '../../components/Card/ExpenseCard';
import expenseActionCreators from '../../Store/Actions/ExpenseActionCreators';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            dataList: [],
            isShow: false
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
        this.setState({ dataList: store.getState().expenses.expenses });
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
        console.log('check id', id)
        const action = expenseActionCreators.deleteExpense(id);
        this.props.expenses(action);
        this.loadData();
    }

    render() {

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'type', headerName: 'Type', width: 120 },
            {
                field: 'category',
                headerName: 'Category',
                // description: 'This column has a value getter and is not sortable.',
                sortable: true,
                width: 160,
            },
            { field: 'cost', headerName: 'Cost', width: 130 },
            {
                field: 'date',
                headerName: 'Date',
                type: 'dateTime',
                width: 180,
                valueGetter: ({ value }) => value && new Date(value),
            },
            {
                field: 'description',
                headerName: 'Description',
                // description: 'This column has a value getter and is not sortable.',
                sortable: true,
                width: 160,
            },
        ];
        let rows = this.state.dataList;
        if (!rows) {
            rows = [];
        }

        function noRowsOverlay() {
            return (
                <Stack height="100%" alignItems="center" justifyContent="center">
                    No Data
                </Stack>
            );
        }

        const elements = this.state.dataList.map(x => {
            return <ExpenseCard
                {...this.props}
                deleteOnClick={(e) => this.deleteOnClick(e, x.id)}
                editOnClick={(e) => this.editOnClick(e, x.id)}
                viewOnClick={(e) => this.viewOnClick(e, x.id)}
                key={x.id}
                data={x} />
        })

        return (
            <div className='page-content home-page'>
                {
                    this.state.isShow && (<ExpenseCreate
                        loadData={this.loadData}
                        handleCancelClick={this.handleAddExpense} />)
                }
                <div className='home-containers'>
                    <div className='home-title'>
                        Personal Expense Manager
                    </div>
                    <div className='actions-form'>
                        <div className='actions-left'>
                            <Button className='btn-add' variant="contained"
                                onClick={(e) => this.handleAddExpense(e)}>Add Expense</Button>
                        </div>
                        <div className='action-right'>
                            <input
                                value={this.state.searchValue}
                                onChange={(e) => this.handleSearchChange(e)}
                                onKeyPress={(e) => this.handleSearchKeyPress(e)}
                                className='input-search'
                                placeholder='Search'
                            />
                            <button className='btn-create btn-search'
                                onClick={(e) => this.handleSearch(e)}>Search</button>
                        </div>
                    </div>
                    <div className='data'>
                        {/* <DataGrid
                            components={{ NoRowsOverlay: noRowsOverlay }}
                            className='data-grid'
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onCellClick={this.handleCellClick}
                        /> */}
                        {
                            elements
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
    return <Home {...props} navigate={nav} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);