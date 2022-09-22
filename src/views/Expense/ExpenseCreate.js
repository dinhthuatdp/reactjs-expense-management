import React from 'react';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as moment from 'moment';

import './ExpenseCreate.scss';
import expenseActionCreators from '../../Store/Actions/ExpenseActionCreators';


class ExpenseCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            date: '',
            cost: '',
            description: '',
            category: '',
            attachment: ''
        }
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
        const formikProps = {
            initialValues: {
                type: 'spending',
                date: moment().utc().format('yyyy-MM-DD'),
                cost: '',
                description: '',
                category: '',
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
        }
        return (
            <Formik {...formikProps} >
                {props => (
                    <>
                        <form className='create-form'
                            onSubmit={props.handleSubmit}>
                            <div className='title'>
                                Add Expense
                            </div>
                            <div className='input'>
                                <div className='type-input'>Type</div>
                                <select
                                    name='type'
                                    value='spending'
                                    onChange={props.handleChange}>
                                    <option value='incoming'>Incoming</option>
                                    <option value='spending'>Spending</option>
                                </select>
                            </div>
                            <div className='date-input input'>
                                <div className='lbl-date'>Date</div>
                                <input type='date' placeholder='yyyy-MM-dd'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='date'
                                    value={props.values.date} />
                            </div>
                            <div className='cost-input input'>
                                <input type='text'
                                    placeholder='Enter cost'
                                    name='cost'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cost} />
                                <ErrorMessage name='cost' >
                                    {errMsg => <span className="error-message">{errMsg}</span>}
                                </ErrorMessage>
                            </div>
                            <div className='description-input input'>
                                <input type='text' placeholder='Enter description'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='description'
                                    value={props.values.description} />
                            </div>
                            <div className='category-input input'>
                                <input type='text' placeholder='Enter category'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name='category'
                                    value={props.values.category} />
                            </div>
                            <div className='attachment-input input'>
                                <input type='file' placeholder='Enter attachment'
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCreate);