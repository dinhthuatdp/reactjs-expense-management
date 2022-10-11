import React from 'react';
import { withTranslation } from 'react-i18next';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import categoryService from '../../services/categoryService';
import './CategoryList.scss';
import Popup from '../../components/Popups/Popup';
import GroupEdit from '../../components/GroupEdit';
import Card from '../../components/Card/Card';

const addTitle = 'Add New Category';
const editTitle = 'Edit Category';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupTitle: addTitle,
            isShowPopup: false,
            category: {
                list: [],
                categoryName: ''
            }
        }
    }

    getCategories = async () => {
        const response = await categoryService.getAll();
        if (!response) {
            console.log('getCategories error');
            return;
        }
        if (response.status &&
            response.status.statusCode !== 200) {
            console.log('getCategories error:', response.message)
            return;
        }
        this.setState({
            category: {
                list: response.data
            }
        });
    }

    componentDidMount() {

        this.getCategories();
    }

    updatePopupTitle = (title) => {
        this.setState({
            popupTitle: title
        });
    }

    openPopupHandler = (e) => {
        this.setState({
            popupTitle: addTitle,
            isShowPopup: !this.state.isShowPopup,
            category: {
                ...this.state.category,
                categoryName: '',
                categoryEditId: null
            }
        });
    }

    cancelOnClick = (e) => {
        this.setState({
            isShowPopup: false
        });
    }

    handleEditOnClick = (e, id, name) => {
        e.preventDefault();
        this.setState({
            popupTitle: editTitle,
            isShowPopup: !this.state.isShowPopup,
            category: {
                ...this.state.category,
                categoryName: name,
                categoryEditId: id
            }
        });

    }

    handleDeleteOnClick = (e, id) => {
        e.preventDefault();
        const deleteCategory = async (id) => {
            const response = await categoryService.delete(id);
            if (!response) {
                console.log('Delete error');
                return;
            }
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Delete error:', response.message)
                return;
            }
            // reload.
            this.getCategories();
        }
        deleteCategory(id);
    }

    handleOnClickAddOrEdit = (categoryName) => {
        // e.preventDefault();
        const editId = this.state.category.categoryEditId;
        if (editId) {
            const editCategory = async (id, name) => {
                const response = await categoryService.edit(id, name);
                if (!response) {
                    console.log('Edit error');
                    return;
                }
                if (response.status &&
                    response.status.statusCode !== 200) {
                    console.log('Edit error:', response.message)
                    return;
                }
                // reload.
                this.getCategories();
            }
            editCategory(editId, categoryName);
        } else { // Add new
            const addCategory = async (categoryName) => {
                const response = await categoryService.add(categoryName);

                if (response &&
                    response.data &&
                    response.data.success) {
                    // reload.
                    this.getCategories();
                }
            }
            addCategory(categoryName);
        }
        this.setState({
            isShowPopup: false,
        });
    }

    render() {
        const { t } = this.props;
        let elements = [];
        let actionElements = <></>;
        if (this.state.category.list) {
            elements = this.state.category.list.map(x => {
                actionElements = <>
                    <button className='btn btn-edit'
                        onClick={(e) => this.handleEditOnClick(e, x.id, x.name)}>{t('label.edit')}</button>
                    <button className='btn btn-delete'
                        onClick={(e) => this.handleDeleteOnClick(e, x.id)}>{t('label.delete')}</button>
                </>
                return <Card key={x.id}
                    actions={actionElements}
                    text={x.name} />;
            });
        }
        const formikProps = {
            initialValues: {
                categoryName: this.state.category.categoryName ?? ''
            },
            validateOnBlur: true,
            validateOnchange: true,
            validationSchema: Yup.object().shape({
                categoryName: Yup.string().required()
            }),
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    this.handleOnClickAddOrEdit(formValues.categoryName);
                    resetForm(true);
                } catch (e) {
                    console.error(e);
                }
            },
            enableReinitialize: true,
        }
        return (
            <>
                <div className='page-content'>
                    <div className='page-wrapper'>
                        <Popup isShow={this.state.isShowPopup}
                            title={this.state.popupTitle}>
                            <Formik {...formikProps}>
                                {props => (
                                    <form className='popup-child'
                                        onSubmit={props.handleSubmit}>
                                        <GroupEdit
                                            onChange={props.handleChange}
                                            text='Name'
                                            id='categoryName'
                                            data={props.values.categoryName}
                                            name='categoryName'
                                            onBlur={props.handleBlur}
                                            type='text' />
                                        <ErrorMessage name='categoryName' >
                                            {errMsg => <span className="error-message error-category-new">{errMsg}</span>}
                                        </ErrorMessage>
                                        <div className='popup-actions'>
                                            <button
                                                type='submit'
                                                disabled={!props.isValid}
                                                className={!props.isValid ? 'disable-button btn' : 'btn'}
                                            >{t('label.save')}</button>
                                            <button className='btn btn-cancel'
                                                type='button'
                                                onClick={(e) => this.cancelOnClick(e)}>{t('label.cancel')}</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </Popup>
                        <div className='page-title'>{t('label.category')}</div>
                        <div className='actions'>
                            <button className='btn'
                                onClick={(e) => this.openPopupHandler(e)}>{t('label.add')}</button>
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

export default withTranslation(['common'])(CategoryList);