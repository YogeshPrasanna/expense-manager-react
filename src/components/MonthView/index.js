import React, { Component } from "react";

import MonthExpenseTable from "./MonthExpenseTable";
import TotalCard from "./TotalCard";
import CategoryTotalCard from "./CategoryTotalCard";
import DoughnutChart from "./DoughnutChart";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

import * as analytics from "./../../analytics/analytics";
import DailyTotalCalender from "./DailyTotalCalender";

class MonthViewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear().toString(),
            month: new Date().getMonth().toString()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        const Header = {
            background: "#887657",
            color: "#fff",
            padding: "15px",
            margin: "0 0 15px 0",
            borderRadius: "5px"
        };

        const pad15 = {
            padding: "15px"
        };

        const leftCol = {
            borderRight: "2px solid rgba(0,0,0,0.2)"
        };

        const form = {
            padding: "15px 0 0 0"
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

        const nmBgForCharts = {
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#ddd"
                    : "#EDF0EF"
                : "#EDF0EF",
            padding: "35px",
            margin: "15px 0"
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
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-4" style={leftCol}>
                            <form style={form}>
                                <div style={Header}> View your expenses of a particular month </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-xs-6 col-form-label" style={white}>
                                        <span>Year</span>
                                    </label>
                                    <div className="col-sm-9 col-xs-6">
                                        <select
                                            className="form-control"
                                            name="year"
                                            value={this.state.year}
                                            onChange={this.handleChange.bind(this)}
                                            style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                        >
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-xs-6 col-form-label" style={white}>
                                        <span>Month</span>
                                    </label>
                                    <div className="col-sm-9 col-xs-6">
                                        <select
                                            className="form-control"
                                            name="month"
                                            value={this.state.month}
                                            onChange={this.handleChange.bind(this)}
                                            style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                        >
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
                            <TotalCard
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                            />
                            <CategoryTotalCard
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                            />
                            <DailyTotalCalender
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                            />
                        </div>

                        <div className="col-sm-8">
                            <div
                                className="col-sm-12"
                                style={this.props.settings.mode === "night" ? nmBgForCharts : pad15}
                            >
                                <DoughnutChart
                                    expenses={this.props.expenses}
                                    authUser={this.props.user}
                                    month={this.state.month}
                                    year={this.state.year}
                                />
                            </div>
                            <GenerateExcel
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                            />
                            <MonthExpenseTable
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
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

export default MonthViewPage;
