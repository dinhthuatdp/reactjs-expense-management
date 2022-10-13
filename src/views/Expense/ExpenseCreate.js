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

class ExpenseCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            date: '',
            cost: '',
            description: '',
            category: '',
            attachment: '',
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
                category: data[0].value
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
                type: data[0].value
            });
        }
    }
    async componentDidMount() {
        await this.getCategories();
        await this.getAllExpenseTypes();
    }

    handleAddClick = (type, date, cost, description, category, attachment) => {
        let expenseDate = (isNaN(date) && !date) ? moment().utc().format('yyyy-MM-DD') : date;
        let newExpense = {
            type: type,
            date: expenseDate,
            cost: cost,
            description: description,
            category: category,
            attachment: "https://cdn.pixabay.com/photo/2022/09/01/20/41/tomatoes-7426160_1280.jpg"
        }
        const action = expenseActionCreators.addExpense(newExpense);
        this.props.expenses(action);
        this.props.handleCancelClick();
        this.props.loadData();
    }

    render() {
        const { category, categories, type } = this.state;
        const { t } = this.props;
        const formikProps = {
            initialValues: {
                type: type,
                date: moment().utc().format('yyyy-MM-DD'),
                cost: '',
                description: '',
                category: category,
                attachment: ''
            },
            validateOnBlur: true,
            validateOnchange: true,
            validationSchema: Yup.object().shape({
                cost: Yup.number().integer()
                    .nullable(false)
                    .positive()
            }),
            onSubmit: async (formValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                    this.handleAddClick(formValues.type, formValues.date, formValues.cost, formValues.description,
                        formValues.category, formValues.attachment);
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
                                    name='type'
                                    value={this.state.type}
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
                                    name='category'
                                    value={props.values.category}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <div className='attachment-input input'>
                                <input type='file' placeholder={t('label.chooseAttachment')}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='attachment'
                                    value={props.values.attachment}
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