import React from 'react';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { withTranslation } from 'react-i18next';

import './ExpenseCreate.scss';
import expenseActionCreators from '../../Store/Actions/ExpenseActionCreators';
import Dropdown from '../../components/Dropdown/Dropdown';
import categoryService from '../../services/categoryService';
import expenseTypeService from '../../services/expenseTypeService';
import expenseService from '../../services/expenseService';

class ExpenseCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeID: '',
            cost: 0,
            categoryID: '',
            date: '',
            description: '',
            attachments: [],
            dropdownData: [],
            categories: []
        }
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
                categories: data,
                categoryID: data[0].value
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
                dropdownData: data,
                typeID: data[0].value
            });
        }
    }
    async componentDidMount() {
        await this.getCategories();
        await this.getAllExpenseTypes();
    }

    handleAddClick = (typeID, date, cost, description, categoryID, attachments) => {
        let expenseDate = (isNaN(date) && !date) ? moment().utc().format('yyyy-MM-DD') : date;
        let newExpense = {
            typeID: typeID,
            date: expenseDate,
            cost: cost,
            description: description,
            categoryID: categoryID,
            attachments: attachments
        }
        const addExpense = async (expense) => {
            var response = await expenseService.add(expense);

            if (!response) {
                console.log('Add expense error');
                return;
            }
            if (response.status &&
                response.status.statusCode !== 200) {
                console.log('Add expense error:', response.message)
                return;
            }
            console.log('Add expense success');
        }
        addExpense(newExpense);
        // const action = expenseActionCreators.addExpense(newExpense);
        // this.props.expenses(action);
        this.props.handleCancelClick();
        this.props.loadData();
    }

    render() {
        const { categoryID, categories, typeID } = this.state;
        const { t } = this.props;
        const formikProps = {
            initialValues: {
                typeID: typeID,
                date: moment().utc().format('yyyy-MM-DD'),
                cost: 0,
                description: '',
                categoryID: categoryID,
                attachments: []
            },
            validateOnBlur: true,
            validateOnchange: true,
            validationSchema: Yup.object().shape({
                cost: Yup.number().integer()
                    .nullable(false)
                    .positive(),
                date: Yup.date()
                    .nullable(false)
                    .required()
            }),
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    this.handleAddClick(formValues.typeID, formValues.date, formValues.cost, formValues.description,
                        formValues.categoryID, formValues.attachments);
                    resetForm(true);
                } catch (e) {
                    console.error(e);
                }
            },
            enableReinitialize: true,
        }
        return (
            <Formik {...formikProps} >
                {props => (
                    <>
                        <form className='create-form'
                            onSubmit={props.handleSubmit}>
                            <div className='title'>
                                {t('label.addExpense')}
                            </div>
                            <div className='input'>
                                <div className='type-input'>{t('label.type')}</div>
                                <Dropdown list={this.state.dropdownData}
                                    name='typeID'
                                    value={this.state.typeID}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <div className='date-input input'>
                                <div className='lbl-date'>{t('label.date')}</div>
                                <input type='date' placeholder='yyyy-MM-dd'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='date'
                                    value={props.values.date} />
                                <ErrorMessage name='date' >
                                    {errMsg => <span className="error-message">{errMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className='cost-input input'>
                                <input type='text'
                                    placeholder={t('label.enterCost')}
                                    name='cost'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cost} />
                                <ErrorMessage name='cost' >
                                    {errMsg => <span className="error-message">{errMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className='description-input input'>
                                <input type='text' placeholder={t('label.enterDescription')}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='description'
                                    value={props.values.description} />
                            </div>
                            <div className='category-input input'>
                                <Dropdown list={categories}
                                    name='categoryID'
                                    value={props.values.categoryID}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <div className='attachment-input input'>
                                <input type='file' placeholder={t('label.chooseAttachment')}
                                    multiple
                                    onChange={(e) => {
                                        props.setFieldValue('attachments', e.target.files);
                                    }}
                                    onBlur={props.handleBlur}
                                    name='attachments'
                                    defaultValue={props.values.attachments}
                                />
                            </div>
                            <div className='btns'>
                                <button
                                    disabled={!props.isValid}
                                    className={!props.isValid ? 'disable-button btn-create' : 'btn-create'}
                                    type='submit'>Add</button>
                                <button
                                    type='button'
                                    onClick={(e) => this.props.handleCancelClick()}
                                    className='btn-cancel'
                                >Cancel</button>
                            </div>
                        </form>
                    </>)}
            </Formik>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['common'])(ExpenseCreate));