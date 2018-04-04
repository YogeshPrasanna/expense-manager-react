import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import ExpenseTable from './ExpenseTable.js'
import TotalCard from './TotalCard.js'
import moment from 'moment';
import GenerateExcel from './GenerateExcel'


class FilterViewPage extends Component {
    constructor(props) {
        super(props)

        // current year's first day
        const thisYear = (new Date()).getFullYear();
        const start = new Date("1/1/" + thisYear);
        const defaultStart = moment(start.valueOf());

        this.state = {
            fromdate: defaultStart,
            todate: moment(),
            category: 'Food',
            expensefrom: '00',
            expenseto: '10000',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFromDateSelect = this.handleFromDateSelect.bind(this);
        this.handleToDateSelect = this.handleToDateSelect.bind(this);
        
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        console.log("changes" , e.target.value)
        change[e.target.name] = e.target.value.length === 1 ? "00" : e.target.value
        this.setState(change)
    }

    handleFromDateSelect(fromdate) {
        this.setState({
            fromdate: fromdate
        })
    }

    handleToDateSelect(todate) {
        this.setState({
            todate: todate
        })
    }
    


    render() {

        console.log(this.state)
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

        const pad0 = {
            "padding" : "0px"
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4" style={leftCol}>
                        <form onSubmit={this.handleSubmit} style={form}>
                            <div style={datePickerHeader}> Filter out your expenses </div>
                            <div className="form-group row">
                                <div className="col-sm-6" style={pad0}>
                                    <label className="col-sm-12 col-form-label">
                                        <span>From Date</span>
                                    </label>
                                    <div className="col-sm-12">
                                        <DatePicker className="form-control date" name="fromdate" selected={this.state.fromdate} onSelect={this.handleFromDateSelect.bind(this)} />
                                    </div>
                                </div>
                                <div className="col-sm-6" style={pad0}>
                                    <label className="col-sm-12 col-form-label">
                                        <span>To Date</span>
                                    </label>
                                    <div className="col-sm-12">
                                        <DatePicker className="form-control date" name="todate" selected={this.state.todate} onSelect={this.handleToDateSelect.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6" style={pad0}>
                                    <label className="col-sm-12 col-xs-6 col-form-label">
                                        <span>From Expense</span>
                                    </label>
                                    <div className="col-sm-12 col-xs-6">
                                        <input className="form-control" required type="number" name="expensefrom" onChange={this.handleChange.bind(this)} value={this.state.expensefrom} />
                                    </div>
                                </div>
                                <div className="col-sm-6" style={pad0}>
                                    <label className="col-sm-12 col-xs-6 col-form-label">
                                        <span>To Expense</span>
                                    </label>
                                    <div className="col-sm-12 col-xs-6">
                                        <input className="form-control" required type="number" name="expenseto" onChange={this.handleChange.bind(this)} value={this.state.expenseto} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-12 col-xs-6 col-form-label">
                                    <span>category</span>
                                </label>
                                <div className="col-sm-12 col-xs-6">
                                    <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                                        <option value="Food">Food</option>
                                        <option value="Automobile">Automobile</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Personal Care">Personal Care</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Gifts & Donations">Gifts & Donations</option>
                                        <option value="Bills & Utilities">Bills & Utilities</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <TotalCard 
                            expenses={this.props.expenses}
                            expensefrom={this.state.expensefrom}
                            expenseto={this.state.expenseto}
                            fromdate={this.state.fromdate.format("MM/DD/YYYY")}
                            todate={this.state.todate.format("MM/DD/YYYY")}
                            category={this.state.category}
                            authUser={this.props.user}  
                        />
                    </div>
                    <div className="col-sm-8">
                        <GenerateExcel
                            expenses={this.props.expenses}
                            expensefrom={this.state.expensefrom}
                            expenseto={this.state.expenseto}
                            fromdate={this.state.fromdate.format("MM/DD/YYYY")}
                            todate={this.state.todate.format("MM/DD/YYYY")}
                            category={this.state.category}
                            authUser={this.props.user}
                        />
                        <ExpenseTable 
                            expenses={this.props.expenses} 
                            expensefrom={this.state.expensefrom} 
                            expenseto={this.state.expenseto} 
                            fromdate={this.state.fromdate.format("MM/DD/YYYY")} 
                            todate={this.state.todate.format("MM/DD/YYYY")} 
                            category={this.state.category} 
                            authUser={this.props.user} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default FilterViewPage