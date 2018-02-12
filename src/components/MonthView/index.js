import React, { Component } from 'react';

import MonthExpenseTable from './MonthExpenseTable'
import TotalCard from './TotalCard'
import CategoryTotalCard from './CategoryTotalCard'
import DoughnutChart from './DoughnutChart'

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

        const Header = {
            "background": "#887657",
            "color": "#fff",
            "padding": "15px",
            "margin": "0 0 15px 0",
            "borderRadius": "5px"
        }

        const pad15 ={
            "padding": "15px"
        }

        const leftCol = {
            "borderRight": "2px solid rgba(0,0,0,0.2)"
        }

        const form = {
            "padding": "15px 0 0 0"
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4" style={leftCol}>
                        <form style={form}>
                            <div style={Header}> View your expenses of a particular month </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-xs-6 col-form-label">
                                    <span>Year</span>
                                </label>
                                <div className="col-sm-9 col-xs-6">
                                    <select className="form-control" name="year" value={this.state.year} onChange={this.handleChange.bind(this)}>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-xs-6 col-form-label">
                                    <span>Month</span>
                                </label>
                                <div className="col-sm-9 col-xs-6">
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
                        <TotalCard expenses={this.props.expenses} authUser={this.props.user} month={this.state.month} year={this.state.year} />                                        
                        <CategoryTotalCard expenses={this.props.expenses} authUser={this.props.user} month={this.state.month} year={this.state.year} />                
                    </div>

                    <div className="col-sm-8">
                        <div className="col-sm-12" style={pad15}>
                            <DoughnutChart expenses={this.props.expenses} authUser={this.props.user} month={this.state.month} year={this.state.year}/>
                        </div>
                        <MonthExpenseTable expenses={this.props.expenses} authUser={this.props.user} month={this.state.month} year={this.state.year} />
                    </div>

                </div>
            </div>
        )
    }
}

export default MonthViewPage;