import React, { Component } from 'react';

import MonthExpenseTable from './MonthExpenseTable'

class MonthViewPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            year: new Date().getFullYear().toString(),
            month: new Date().getMonth().toString()
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <label className="col-1 col-form-label">
                            <span>Year</span>
                        </label>
                        <div className="col-3">
                            <select className="form-control" name="year" value={this.state.year} onChange={this.handleChange.bind(this)}>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-1 col-form-label">
                            <span>Month</span>
                        </label>
                        <div className="col-3">
                            <select className="form-control" name="month" value={this.state.month} onChange={this.handleChange.bind(this)}>
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div className="col-8">
                    <MonthExpenseTable expenses={this.props.expenses} authUser={this.props.user} month={this.state.month} year={this.state.year} />
                </div>

            </div>
        )
    }
}

export default MonthViewPage;