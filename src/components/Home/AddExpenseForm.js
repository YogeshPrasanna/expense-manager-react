import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
// import bootstrap from 'bootstrap';

import * as db from '../../firebase/db'

import 'react-datepicker/dist/react-datepicker.css';
import './styles/form.css'

class AddExpenseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: moment(),
            day: moment().day,
            expense: '',
            category: 'Automobile',
            comments: '',
            uid: this.props.user.uid,
            dataSaved: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        db.doCreateExpense(this.state.uid, $('.date').val(), this.state.expense, this.state.category, this.state.comments, moment($('.date').val()).day())
        // reset form once saved
        this.setState({
            date: moment(),
            day:moment().day,
            expense: '',
            category: 'Automobile',
            comments: '',
            uid: this.props.user.uid,
            dataSaved: true
        })

        // bad practice : need to re render the parent Component
        //window.location.reload()
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handelDateChange(date) {
        this.setState({
            date: date
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-xs-6 col-form-label">
                        <span>Date</span>
                        {/* <input type="text" name="date" onChange={this.handleChange.bind(this)} value={this.state.date} /> */}
                    </label>
                    <div className="col-sm-10 col-xs-6">
                        <DatePicker className="form-control date" name="date" selected={this.state.date} onChange={this.handelDateChange.bind(this)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-xs-6 col-form-label">
                        <span>Expense</span>
                    </label>
                    <div className="col-sm-10 col-xs-6">
                        <input className="form-control" required type="number" name="expense" onChange={this.handleChange.bind(this)} value={this.state.expense} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-xs-6 col-form-label">
                        <span>category</span>
                    </label>
                    <div className="col-sm-10 col-xs-6">
                        <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                            <option value="Food">Food</option>                            
                            <option value="Automobile">Automobile</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Vacation">Vacation</option>
                            <option value="Electronics">Electronics</option>                               
                            <option value="Others">Others</option>                                                                                  
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-xs-6 col-form-label">
                        <span>Comments</span>
                    </label>
                    <div className="col-sm-10 col-xs-6">
                        <textarea className="form-control" type="text" required name="comments" onChange={this.handleChange.bind(this)} value={this.state.comments} />
                    </div>
                </div>

                {this.state.dataSaved ? <span className="bg-success success-msg"> Data saved successfully</span> : <span></span> }
                <button className="btn btn-primary float-right" type="submit" >save</button>
            </form>
        )
    }
}

export default AddExpenseForm;