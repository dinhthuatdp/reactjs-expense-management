import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';

import './Home.scss';
import AppBar from '../../components/AppBar/AppBar';
import ExpenseCreate from '../Expense/ExpenseCreate';
import expenseActionCreators from '../../Store/Actions/ExpenseActionCreators';
import store from '../../Store/Store';

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
        if (this.state.searchValue) {
            const searchResult = this.state.dataList.filter(item => item.category.toLocaleLowerCase()
                .includes(this.state.searchValue.toLocaleLowerCase()))

            this.setState({
                dataList: searchResult
            })
        } else {
            this.setState({
                dataList: this.state.initialData
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

    loadData = () => {
        this.setState({ dataList: store.getState().expenses.expenses });
    }

    render() {

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
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
        const rows = this.state.dataList;

        function noRowsOverlay() {
            return (
                <Stack height="100%" alignItems="center" justifyContent="center">
                    No Data
                </Stack>
            );
        }

        return (
            <div className='home-page'>
                {
                    this.state.isShow && (<ExpenseCreate
                        loadData={this.loadData}
                        handleCancelClick={this.handleAddExpense} />)
                }
                <AppBar />
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
                        <DataGrid
                            components={{ NoRowsOverlay: noRowsOverlay }}
                            className='data-grid'
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);