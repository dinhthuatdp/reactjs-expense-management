import React from 'react';
import { withTranslation } from 'react-i18next';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
                list: [],
                newCategory: ''
            }
        }
    }

    componentDidMount() {
        const getCategories = async () => {
            const response = await categoryService.getAll();
            if (!response) {
                console.log('Login error');
                return;
            }
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
            isShowPopup: !this.state.isShowPopup,
            category: {
                ...this.state.category,
                newCategory: ''
            }
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

    handleOnClickAdd = (newCategory) => {
        // e.preventDefault();
        console.log('handleOnClickAdd', newCategory);
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
                        onClick={(e) => this.handleEditOnClick(e, x.id)}>{t('label.edit')}</button>
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
                newCategory: ''
            },
            validateOnBlur: true,
            validateOnchange: true,
            validationSchema: Yup.object().shape({
                newCategory: Yup.string().required()
            }),
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    this.handleOnClickAdd(formValues.newCategory);
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
                            title='Add New Category'>
                            <Formik {...formikProps}>
                                {props => (
                                    <form className='popup-child'
                                        onSubmit={props.handleSubmit}>
                                        <GroupEdit
                                            onChange={props.handleChange}
                                            text='Name'
                                            id='newCategory'
                                            data={props.values.newCategory}
                                            name='newCategory'
                                            onBlur={props.handleBlur}
                                            type='text' />
                                        <ErrorMessage name='newCategory' >
                                            {errMsg => <span className="error-message error-category-new">{errMsg}</span>}
                                        </ErrorMessage>
                                        <div className='popup-actions'>
                                            <button
                                                type='submit'
                                                disabled={!props.isValid}
                                                className={!props.isValid ? 'disable-button btn' : 'btn'}
                                            >{t('label.add')}</button>
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