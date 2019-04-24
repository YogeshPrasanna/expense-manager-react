import React, { Component } from "react";

import MonthExpenseTable from "./MonthExpenseTable";
import TotalCard from "./TotalCard";
import CategoryTotalCard from "./CategoryTotalCard";
import DoughnutChart from "./DoughnutChart";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";
import LineChartExpenseTimeline from "./LineChartTimeline";
import MonthLimitWarning from "./MonthLimitWarning";
import MobileExpenseTable from "./MobileExpenseTable";

import * as utils from "../Util";
import * as analytics from "./../../analytics/analytics";
import DailyTotalCalender from "./DailyTotalCalender";

class MonthViewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear().toString(),
            month: new Date().getMonth().toString(),
            convertedCurrency: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleLeftArrowCalender() {
        if (this.state.month === "0") {
            this.setState({
                month: "11",
                year: (Number(this.state.year) - 1).toString()
            });
        } else {
            this.setState({
                month: (Number(this.state.month) - 1).toString()
            });
        }
    }

    handleRightArrowCalender() {
        if (this.state.month === "11") {
            this.setState({
                year: (Number(this.state.year) + 1).toString(),
                month: "0"
            });
        } else {
            this.setState({
                month: (Number(this.state.month) + 1).toString()
            });
        }
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();

        // if travel mode then convert currency else set to 1
        if (this.props.settings && this.props.settings.travelMode === "on") {
            function returnCur(cur) {
                switch (cur) {
                    case "Indian Rupees":
                        return "INR";
                    case "US Dollars":
                        return "USD";
                    case "Pounds":
                        return "EUR";
                    case "Euro":
                        return "EUR";
                    case "Yen":
                        return "YER";
                    default:
                        return "INR";
                }
            }

            const fromcur = returnCur(this.props.settings.fromCurrency);
            const tocur = returnCur(this.props.settings.currency);

            fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${fromcur}_${tocur}&compact=y`)
                .then(resp => resp.json()) // Transform the data into json
                .then(data => {
                    this.setState({
                        convertedCurrency: Object.values(data)[0].val
                    });
                })
                .catch(() => {
                    alert("Some Problem with the currency converter api. Values will Fallback to default currency");
                    this.setState({ convertedCurrency: 1 });
                });
        } else {
            this.setState({ convertedCurrency: 1 });
        }
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

        const form = {
            padding: "15px 0 0 0"
        };

        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings ? (this.props.settings.mode === "night" ? "#484842" : "auto") : "auto",
            minHeight: "91vh"
        };

        const nmBgForCharts = {
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#ddd"
                    : "#EDF0EF"
                : "#EDF0EF",
            padding: "15px",
            margin: "15px 0"
        };

        const white = {
            color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
        };

        const monthDropdown = {
            display: "inline-block",
            width: window.screen.width > 760 ? "60%" : "50%",
            padding: "0",
            border: "0"
        };

        const yearDropdown = {
            display: "inline-block",
            width: "35%",
            padding: "0",
            border: "0"
        };

        const leftIcon = {
            display: "inline-block",
            padding: "0",
            border: "3px solid rgb(51, 55, 69)",
            borderTop: "4px solid rgb(51, 55, 69)",
            fontSize: "25px",
            width: window.screen.width > 760 ? "100%" : "7.5%",
            background: "#333745",
            color: "#DC965A",
            textAlign: "center",
            cursor: "pointer"
        };

        const rightIcon = {
            display: "inline-block",
            padding: "0",
            fontSize: "25px",
            textAlign: "center",
            width: window.screen.width > 760 ? "100%" : "7.5%",
            border: "3px solid rgb(51, 55, 69)",
            borderTop: "4px solid rgb(51, 55, 69)",
            borderRight: "none",
            background: "#333745",
            color: "#DC965A",
            cursor: "pointer"
        };

        const monthField = {
            background: "#333745",
            border: "1px solid #333745",
            color: "#EDD382",
            width: "100%",
            fontSize: "25px",
            letterSpacing: "1px",
            padding: "6px",
            borderRadius: "0"
        };

        const dateField = {
            fontSize: "25px",
            letterSpacing: "2px",
            borderRadius: "0",
            padding: "6px",
            width: "100%",
            border: "1px solid #333745",
            background: "#333745",
            color: "#C8E9A0"
        };

        const rightCol = {
            paddingLeft: "0"
        };

        const inputNightMode = {
            color: "#495057",
            border: "1px solid #fff",
            height: "auto"
        };

        const inputDayMode = {
            background: "#fff",
            color: "#495057",
            border: "1px solid #fff",
            height: "auto"
        };

        if (this.props.settings && this.props.cards) {
            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-4 mobileNoPadding">
                            <form style={form} className="mobileNoPadding">
                                {/* <div style={Header}> View your expenses of a particular month </div> */}

                                <div
                                    className="col-md-1 col-xs-1"
                                    style={leftIcon}
                                    onClick={this.handleLeftArrowCalender.bind(this)}
                                    id="leftArrowIcon"
                                >
                                    <i className="fa fa-caret-left" />
                                </div>
                                <div className="col-md-7 col-xs-5" style={monthDropdown}>
                                    <select
                                        name="month"
                                        value={this.state.month}
                                        onChange={this.handleChange.bind(this)}
                                        style={{
                                            ...(this.props.settings.mode === "night" ? inputNightMode : inputDayMode),
                                            ...monthField
                                        }}
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
                                <div className="col-md-3 col-xs-5" style={yearDropdown}>
                                    <select
                                        name="year"
                                        value={this.state.year}
                                        onChange={this.handleChange.bind(this)}
                                        style={{
                                            ...(this.props.settings.mode === "night" ? inputNightMode : inputDayMode),
                                            ...dateField
                                        }}
                                    >
                                        {utils.yearsGenereator().map((elem, i) => (
                                            <option value={elem} key={i}>{elem}</option>
                                        ))}
                                    </select>
                                </div>
                                <div
                                    className="col-md-1 col-xs-1"
                                    style={rightIcon}
                                    onClick={this.handleRightArrowCalender.bind(this)}
                                    id="rightArrowIcon"
                                >
                                    <i className="fa fa-caret-right" />
                                </div>
                            </form>

                            <DailyTotalCalender
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                            />

                            <MonthLimitWarning
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                            />

                            <TotalCard
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                settings={this.props.settings}
                                cards={this.props.cards}
                            />
                            <CategoryTotalCard
                                expenses={this.props.expenses}
                                authUser={this.props.user}
                                month={this.state.month}
                                year={this.state.year}
                                cards={this.props.cards}
                            />
                        </div>

                        <div className="col-sm-8 mobileNoPadding" style={rightCol}>
                            <div
                                style={this.props.settings.mode === "night" ? nmBgForCharts : pad15}
                                className="mobileNoPadding"
                            >
                                <LineChartExpenseTimeline
                                    expenses={this.props.expenses}
                                    authUser={this.props.user}
                                    month={this.state.month}
                                    year={this.state.year}
                                    settings={this.props.settings}
                                />
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

                            {this.state.convertedCurrency ? (
                                window.screen.width > 720 ? (
                                    <MonthExpenseTable
                                        expenses={this.props.expenses}
                                        authUser={this.props.user}
                                        month={this.state.month}
                                        year={this.state.year}
                                        settings={this.props.settings}
                                        convertedCurrency={this.state.convertedCurrency}
                                    />
                                ) : (
                                        <MobileExpenseTable
                                            expenses={this.props.expenses}
                                            authUser={this.props.user}
                                            month={this.state.month}
                                            year={this.state.year}
                                            settings={this.props.settings}
                                            convertedCurrency={this.state.convertedCurrency}
                                        />
                                    )
                            ) : (
                                    <Loader />
                                )}
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
