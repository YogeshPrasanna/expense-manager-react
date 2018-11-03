import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

class BarChartAllMonths extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear().toString()
        };
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        let expenses = this.props.expenses;
        let currentUser = this.props.authUser;
        let selectedYear = this.state.year;

        if (!expenses || !currentUser) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }

        if (expenses && currentUser) {
            let eachExpense = utils.eachExpense(expenses);
            let allMonthsTotals = utils.totalExpensesInEachMonthOfThisYear(
                expenses,
                eachExpense,
                currentUser,
                selectedYear
            );

            let data = {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
                datasets: [
                    {
                        data: allMonthsTotals,
                        backgroundColor: "rgba(66,133,234,0.8)",
                        borderColor: "rgba(66,133,234,1)",
                        borderWidth: 2,
                        hoverBackgroundColor: "rgba(66,133,234,0.6)",
                        hoverBorderColor: "rgba(66,133,234,1)"
                    }
                ]
            };

            const options = {
                legend: {
                    display: false
                }
            };

            const monthDropdown = {
                display: "block",
                background: "#DDDDDD",
                float: "right",
                color: "#000",
                border: "none",
                padding: "0px 5px 0px 0px"
            };

            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form>
                                <div className="col-sm-12 col-xs-12">
                                    <select
                                        name="year"
                                        style={monthDropdown}
                                        value={this.state.year}
                                        onChange={this.handleChange.bind(this)}
                                    >
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Bar
                        data={data}
                        height={window.screen.width > 720 ? 140 : 250}
                        options={options}
                        responsive={true}
                    />
                </div>
            );
        }
    }
}

export default BarChartAllMonths;
