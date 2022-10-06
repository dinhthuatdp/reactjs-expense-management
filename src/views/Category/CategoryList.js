import React from 'react';

import categoryService from '../../services/categoryService';
import './CategoryList.scss';
import Popup from '../../components/Popups/Popup';
import GroupEdit from '../../components/GroupEdit';
import Card from '../../components/Card/Card';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPopup: false,
            category: {
                list: []
            }
        }
    }

    componentDidMount() {
        const getCategories = async () => {
            const response = await categoryService.getAll();
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Login error:', response.message)
                return;
            }
            this.setState({
                category: {
                    list: response.data
                }
            });
        }
        getCategories();
    }

    openPopupHandler = (e) => {
        this.setState({
            isShowPopup: !this.state.isShowPopup
        });
    }

    cancelOnClick = (e) => {
        this.setState({
            isShowPopup: false
        });
    }

    handleEditOnClick = (e, id) => {
        e.preventDefault();
        console.log('handleEditOnClick clicked', id);
    }

    handleDeleteOnClick = (e, id) => {
        e.preventDefault();
        console.log('handleDeleteOnClick clicked', id);
    }

    render() {
        let elements = [];
        let actionElements = <></>;
        if (this.state.category.list) {
            elements = this.state.category.list.map(x => {
                actionElements = <>
                    <button className='btn btn-edit'
                        onClick={(e) => this.handleEditOnClick(e, x.id)}>Edit</button>
                    <button className='btn btn-delete'
                        onClick={(e) => this.handleDeleteOnClick(e, x.id)}>Delete</button>
                </>
                return <Card key={x.id}
                    actions={actionElements}
                    text={x.name} />;
            });
        }

        return (
            <>
                <div className='page-content'>
                    <div className='page-wrapper'>
                        <Popup isShow={this.state.isShowPopup}
                            title='Add New Category'>
                            <div className='popup-child'>
                                <GroupEdit
                                    text='Name'
                                    type='text' />
                                <div className='popup-actions'>
                                    <button className='btn'>Add</button>
                                    <button className='btn btn-cancel'
                                        onClick={(e) => this.cancelOnClick(e)}>Cancel</button>
                                </div>
                            </div>
                        </Popup>
                        <div className='page-title'>Category</div>
                        <div className='actions'>
                            <button className='btn'
                                onClick={(e) => this.openPopupHandler(e)}>Add New</button>
                        </div>
                        <div className='list'>
                            {elements}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CategoryList;