import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import ExpenseTable from './ExpenseTable.js'

class DailyViewPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: moment()
        }

    }

    handelDateSelect(date) {
        this.setState({
            date: date
        })
    }

    render() {
        return (
            <div className="col-8">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-2 col-form-label">
                            <span>Date</span>
                        </label>
                        <div className="col-10">
                            <DatePicker className="form-control date" name="date" selected={this.state.date} onSelect={this.handelDateSelect.bind(this)} />
                        </div>
                    </div>
                </form>
                <ExpenseTable expenses={this.props.expenses} date={this.state.date.format("MM/DD/YYYY")} authUser={this.props.user} />
            </div>
        )
    }
}

export default DailyViewPage