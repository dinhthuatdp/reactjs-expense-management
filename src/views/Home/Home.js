import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import './Home.scss';
import AppBar from '../../components/AppBar/AppBar';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const initialData = [
            { id: 1, category: 'Snow', price: '10$', date: '02/12/2021', itemName: 'item 1' },
            { id: 2, category: 'Lannister', price: '204$', date: '03/12/2022', itemName: 'item 11' },
            { id: 3, category: 'Lannister', price: '20$', date: '04/02/2022', itemName: 'item 12' },
            { id: 4, category: 'Stark', price: '30$', date: '02/09/2021', itemName: 'item 21' },
            { id: 5, category: 'Targaryen', price: '300$', date: '12/12/2021', itemName: 'item 41' },
            { id: 6, category: 'Melisandre', price: '10$', date: '11/02/2022', itemName: 'item 15' },
            { id: 7, category: 'Clifford', price: '1$', date: '12/12/2019', itemName: 'item 14' },
            { id: 8, category: 'Frances', price: '99$', date: '06/12/2022', itemName: 'item 41' },
            { id: 9, category: 'Roxie', price: '45$', date: '07/12/2020', itemName: 'item 61' },
        ];
        this.state = {
            searchValue: '',
            dataList: initialData,
            initialData: initialData
        }
    }

    handleSearch = (e) => {
        if (this.state.searchValue) {
            const searchResult = this.state.dataList.filter(item => item.category.toLocaleLowerCase()
                .includes(this.state.searchValue.toLocaleLowerCase()))

            console.log('>>>> check handle search click: ', this.state.dataList)
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

    render() {

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'category', headerName: 'Category', width: 130 },
            { field: 'price', headerName: 'Price', width: 130 },
            {
                field: 'date',
                headerName: 'Date',
                type: 'dateTime',
                width: 180,
                valueGetter: ({ value }) => value && new Date(value),
            },
            {
                field: 'itemName',
                headerName: 'Item Name',
                // description: 'This column has a value getter and is not sortable.',
                sortable: true,
                width: 160,
            },
        ];

        const rows = this.state.dataList;

        return (
            <div className='home-page'>
                <AppBar />
                <div className='home-containers'>
                    <div className='home-title'>
                        Personal Expense Manager
                    </div>
                    <div className='actions-form'>
                        <div className='actions-left'>
                            <Button className='btn-add' variant="contained">Add Expense</Button>
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

export default Home;