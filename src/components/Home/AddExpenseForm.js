import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/form.css'

class AddExpenseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: moment(),
            expense: '',
            category: '',
            comments: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state)
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value            
        this.setState(change)
    }

    handelDateChange(date){
        this.setState({
            date: date
        })
    }

    handleSelect(date){
        this.set
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <span>Date</span>
                    <DatePicker name="date" selected={this.state.date} onChange={this.handelDateChange.bind(this)} />
                    {/* <input type="text" name="date" onChange={this.handleChange.bind(this)} value={this.state.date} /> */}
                </label>

                <label>
                    <span>Expense</span>
                    <input type="text" name="expense" onChange={this.handleChange.bind(this)} value={this.state.expense} />
                </label>

                <label>
                    <span>category</span>
                    <input type="text" name="category" onChange={this.handleChange.bind(this)} value={this.state.category} />
                </label>

                <label>
                    <span>Comments</span>
                    <input type="text" name="comments" onChange={this.handleChange.bind(this)} value={this.state.comments} />
                </label>

                <button type="submit" >save</button>
            </form>
        )
    }
}

export default AddExpenseForm;