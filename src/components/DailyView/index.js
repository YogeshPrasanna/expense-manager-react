import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";

import ExpenseTable from "./ExpenseTable.js";
import TotalCard from "./TotalCard";
import CategoryTotalCard from "./CategoryTotalCard";
import DoughnutChart from "./DoughnutChart";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

class DailyViewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment()
        };
    }

    handelDateSelect(date) {
        this.setState({
            date: date
        });
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
            borderRight: "2px solid rgba(0,0,0,0.2)"
        };

        const form = {
            padding: "15px 0 0 0"
        };

        const pad15 = {
            padding: "15px"
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
            padding: "35px"
        };

        const white = {
            color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
        };

        if (this.props.settings) {
            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-4" style={leftCol}>
                            <form onSubmit={this.handleSubmit} style={form}>
                                <div style={datePickerHeader}> View your expenses on a particular date </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label" style={white}>
                                        <span>Date</span>
                                    </label>
                                    <div className="col-10">
                                        <DatePicker
                                            className="form-control date"
                                            name="date"
                                            selected={this.state.date}
                                            onSelect={this.handelDateSelect.bind(this)}
                                        />
                                    </div>
                                </div>
                            </form>
                            <TotalCard
                                expenses={this.props.expenses}
                                date={this.state.date.format("MM/DD/YYYY")}
                                authUser={this.props.user}
                            />
                            <CategoryTotalCard
                                expenses={this.props.expenses}
                                date={this.state.date.format("MM/DD/YYYY")}
                                authUser={this.props.user}
                            />
                        </div>
                        <div className="col-sm-8">
                            <div
                                className="col-sm-12"
                                style={this.props.settings.mode === "night" ? nmBgForCharts : pad15}
                            >
                                <DoughnutChart
                                    expenses={this.props.expenses}
                                    date={this.state.date.format("MM/DD/YYYY")}
                                    authUser={this.props.user}
                                />
                            </div>
                            <GenerateExcel
                                expenses={this.props.expenses}
                                date={this.state.date.format("MM/DD/YYYY")}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                            <ExpenseTable
                                expenses={this.props.expenses}
                                date={this.state.date.format("MM/DD/YYYY")}
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

export default DailyViewPage;
