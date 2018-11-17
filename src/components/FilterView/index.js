import React, { Component } from "react";

import DatePicker from "react-datepicker";
import ExpenseTable from "./ExpenseTable.js";
import TotalCard from "./TotalCard.js";
import moment from "moment";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

import * as analytics from "./../../analytics/analytics";

class FilterViewPage extends Component {
    constructor(props) {
        super(props);

        // current year's first day
        const thisYear = new Date().getFullYear();
        const start = new Date("1/1/" + thisYear);
        const defaultStart = moment(start.valueOf());

        this.state = {
            fromdate: defaultStart,
            todate: moment(),
            category: "Food",
            expensefrom: "00",
            expenseto: "10000"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFromDateSelect = this.handleFromDateSelect.bind(this);
        this.handleToDateSelect = this.handleToDateSelect.bind(this);
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value.length === 1 ? "00" : e.target.value;
        this.setState(change);
    }

    handleFromDateSelect(fromdate) {
        this.setState({
            fromdate: fromdate
        });
    }

    handleToDateSelect(todate) {
        this.setState({
            todate: todate
        });
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        const datePickerHeader = {
            background: "#887657",
            color: "#fff",
            padding: "15px",
            margin: "0 0 15px 0",
            borderRadius: "5px"
        };

        const leftCol = {
            borderRight: window.screen.width > 720 ? "2px solid rgba(0,0,0,0.2)" : "none"
        };

        const form = {
            padding: window.screen.width > 720 ? "15px 0 0 0" : "15px"
        };

        const pad0 = {
            padding: "0px"
        };

        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#484842"
                    : "#EDF0EF"
                : "#EDF0EF",
            minHeight: "91vh"
        };

        const white = {
            color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
        };

        const inputNightMode = {
            background: "#2c2b2b",
            color: "#a9a0a0",
            border: "1px solid #9b8c8cc7"
        };

        const inputDayMode = { background: "#fff", color: "#495057" };

        if (this.props.settings) {
            return (
                <div className="container-fluid mobileNoPadding" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-4" style={leftCol}>
                            <form onSubmit={this.handleSubmit} style={form}>
                                {/* <div style={datePickerHeader}> Filter out your expenses </div> */}
                                <div className="form-group row">
                                    <div className="col-sm-6" style={pad0}>
                                        <label className="col-sm-12 col-form-label" style={white}>
                                            <span>From Date</span>
                                        </label>
                                        <div className="col-sm-12">
                                            <DatePicker
                                                className={
                                                    "form-control date " +
                                                    (this.props.settings.mode === "night"
                                                        ? "inputNightMode"
                                                        : "inputDayMode")
                                                }
                                                name="fromdate"
                                                selected={this.state.fromdate}
                                                onSelect={this.handleFromDateSelect.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6" style={pad0}>
                                        <label className="col-sm-12 col-form-label" style={white}>
                                            <span>To Date</span>
                                        </label>
                                        <div className="col-sm-12">
                                            <DatePicker
                                                className={
                                                    "form-control date " +
                                                    (this.props.settings.mode === "night"
                                                        ? "inputNightMode"
                                                        : "inputDayMode")
                                                }
                                                name="todate"
                                                selected={this.state.todate}
                                                onSelect={this.handleToDateSelect.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6" style={pad0}>
                                        <label className="col-sm-12 col-xs-6 col-form-label" style={white}>
                                            <span>From Expense</span>
                                        </label>
                                        <div className="col-sm-12 col-xs-6">
                                            <input
                                                className="form-control"
                                                required
                                                type="number"
                                                name="expensefrom"
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.expensefrom}
                                                style={
                                                    this.props.settings.mode === "night" ? inputNightMode : inputDayMode
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6" style={pad0}>
                                        <label className="col-sm-12 col-xs-6 col-form-label" style={white}>
                                            <span>To Expense</span>
                                        </label>
                                        <div className="col-sm-12 col-xs-6">
                                            <input
                                                className="form-control"
                                                required
                                                type="number"
                                                name="expenseto"
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.expenseto}
                                                style={
                                                    this.props.settings.mode === "night" ? inputNightMode : inputDayMode
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-12 col-xs-6 col-form-label" style={white}>
                                        <span>category</span>
                                    </label>
                                    <div className="col-sm-12 col-xs-6">
                                        <select
                                            className="form-control"
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.handleChange.bind(this)}
                                            style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                        >
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
                                settings={this.props.settings}
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
                                settings={this.props.settings}
                            />
                            <ExpenseTable
                                expenses={this.props.expenses}
                                expensefrom={this.state.expensefrom}
                                expenseto={this.state.expenseto}
                                fromdate={this.state.fromdate.format("MM/DD/YYYY")}
                                todate={this.state.todate.format("MM/DD/YYYY")}
                                category={this.state.category}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default FilterViewPage;
