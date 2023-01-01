import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";

import ExpenseTable from "./ExpenseTable.js";
import TotalCard from "./TotalCard";
import CategoryTotalCard from "./CategoryTotalCard";
import MobileExpenseTable from "./MobileExpenseTable";
import DoughnutChart from "./DoughnutChart";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

import * as analytics from "./../../analytics/analytics";

export function parseURLParams(url) {
    let queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {},
        i,
        n,
        v,
        nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

class DailyViewPage extends Component {
    constructor(props) {
        super(props);

        let urlString = window.location.href;
        let urlParams = parseURLParams(urlString);

        this.state = { date: urlParams ? moment(urlParams.date[0]) : moment(), convertedCurrency: null };
    }

    handelDateSelect(date) {
        this.setState({
            date: date
        });
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

            fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${fromcur}_${tocur}&compact=y&apiKey=${process.env.REACT_APP_FREE_CURRENCY_CONVERTER_API_KEY}`)
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
        const datePickerHeader = {
            background: "#887657",
            color: "#fff",
            padding: "15px",
            margin: "0 0 15px 0",
            borderRadius: "5px"
        };

        const form = {
            padding: window.screen.width > 720 ? "15px 0 0 0" : "15px"
        };

        const pad15 = {
            padding: "15px"
        };

        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings ? (this.props.settings.mode === "night" ? "#484842" : "auto") : "auto",
            minHeight: "91vh"
        };

        const nmBgForCharts = {
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#2C3034"
                    : "#EDF0EF"
                : "#EDF0EF",
            padding: "35px",
            margin: "15px 0"
        };

        const rightCol = { paddingLeft: "0" };

        const white = {
            color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
        };

        if (this.props.settings && this.props.cards) {
            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-4 mobileNoPadding">
                            <form onSubmit={this.handleSubmit} style={form}>
                                {/* <div style={datePickerHeader}> View your expenses on a particular date </div> */}
                                <div className="form-group row mobileNoPadding">
                                    <label className="col-2 col-form-label" style={white}>
                                        <span>Date</span>
                                    </label>
                                    <div className="col-10">
                                        <DatePicker
                                            className={
                                                "form-control date " +
                                                (this.props.settings.mode === "night"
                                                    ? "inputNightMode"
                                                    : "inputDayMode")
                                            }
                                            name="date"
                                            selected={this.state.date}
                                            onSelect={this.handelDateSelect.bind(this)}
                                        />
                                    </div>
                                </div>
                            </form>
                            <TotalCard
                                expenses={this.props.expenses}
                                date={this.state.date.format("DD/MM/YYYY")}
                                authUser={this.props.user}
                                settings={this.props.settings}
                                cards={this.props.cards}
                            />
                            <CategoryTotalCard
                                expenses={this.props.expenses}
                                date={this.state.date.format("DD/MM/YYYY")}
                                authUser={this.props.user}
                                cards={this.props.cards}
                                settings={this.props.settings}
                            />
                        </div>
                        <div className="col-sm-8 mobileNoPadding" style={rightCol}>
                            <div
                                className="col-sm-12 mobileNoPadding"
                                style={this.props.settings.mode === "night" ? nmBgForCharts : pad15}
                            >
                                <DoughnutChart
                                    expenses={this.props.expenses}
                                    date={this.state.date.format("DD/MM/YYYY")}
                                    authUser={this.props.user}
                                    settings={this.props.settings}
                                />
                            </div>
                            <GenerateExcel
                                expenses={this.props.expenses}
                                date={this.state.date.format("DD/MM/YYYY")}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                            {this.state.convertedCurrency ? (
                                window.screen.width > 720 ? (
                                    <ExpenseTable
                                        expenses={this.props.expenses}
                                        date={this.state.date.format("DD/MM/YYYY")}
                                        authUser={this.props.user}
                                        settings={this.props.settings}
                                        convertedCurrency={this.state.convertedCurrency}
                                    />
                                ) : (
                                        <MobileExpenseTable
                                            expenses={this.props.expenses}
                                            authUser={this.props.user}
                                            date={this.state.date.format("DD/MM/YYYY")}
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

export default DailyViewPage;
