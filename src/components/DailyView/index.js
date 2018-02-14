import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import ExpenseTable from './ExpenseTable.js'
import TotalCard from './TotalCard'
import CategoryTotalCard from './CategoryTotalCard'
import DoughnutChart from './DoughnutChart'


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

        const datePickerHeader = {
            "background": "#887657",
            "color": "#fff",
            "padding": "15px",
            "margin": "0 0 15px 0",
            "borderRadius": "5px"
        }

        const leftCol = {
            "borderRight": "2px solid rgba(0,0,0,0.2)"
        }

        const form = {
            "padding": "15px 0 0 0"
        }

        const pad15 = {
            "padding": "15px"
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4" style={leftCol}>
                        <form onSubmit={this.handleSubmit} style={form}>
                            <div style={datePickerHeader}> View your expenses on a particular date </div>
                            <div className="form-group row">
                                <label className="col-2 col-form-label">
                                    <span>Date</span>
                                </label>
                                <div className="col-10">
                                    <DatePicker className="form-control date" name="date" selected={this.state.date} onSelect={this.handelDateSelect.bind(this)} />
                                </div>
                            </div>
                        </form>
                        <TotalCard expenses={this.props.expenses} date={this.state.date.format("MM/DD/YYYY")} authUser={this.props.user} />                
                        <CategoryTotalCard expenses={this.props.expenses} date={this.state.date.format("MM/DD/YYYY")} authUser={this.props.user} />                                        
                    </div>
                    <div className="col-sm-8">
                        <div className="col-sm-12" style={pad15}>
                            <DoughnutChart expenses={this.props.expenses} date={this.state.date.format("MM/DD/YYYY")} authUser={this.props.user} />
                        </div>
                        <ExpenseTable expenses={this.props.expenses} date={this.state.date.format("MM/DD/YYYY")} authUser={this.props.user} />
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyViewPage