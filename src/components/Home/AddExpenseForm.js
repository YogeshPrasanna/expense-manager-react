import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
// import bootstrap from 'bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/form.css'

class AddExpenseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: moment(),
            expense: '',
            category: 'grapefruit',
            comments: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
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
                    <label className="col-2 col-form-label">
                        <span>Date</span>
                        {/* <input type="text" name="date" onChange={this.handleChange.bind(this)} value={this.state.date} /> */}
                    </label>
                    <div className="col-10">
                        <DatePicker className="form-control" name="date" selected={this.state.date} onChange={this.handelDateChange.bind(this)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">
                        <span>Expense</span>
                    </label>
                    <div className="col-10">
                        <input className="form-control" type="text" name="expense" onChange={this.handleChange.bind(this)} value={this.state.expense} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">
                        <span>category</span>
                    </label>
                    <div className="col-10">
                        <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">
                        <span>Comments</span>
                    </label>
                    <div className="col-10">
                        <input className="form-control" type="text" name="comments" onChange={this.handleChange.bind(this)} value={this.state.comments} />
                    </div>
                </div>

                <button className="btn btn-primary float-right" type="submit" >save</button>
            </form>
        )
    }
}

export default AddExpenseForm;