import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import * as utils from "../Util";

class BarChartAllMonths extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear().toString()
        };
    }

    render() {
        let expenses = this.props.expenses;
        let currentUser = this.props.authUser;
        let selectedYear = this.state.year;

        if (!expenses || !currentUser) {
            return <span />;
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
                        borderColor: "transparent",
                        backgroundColor: "rgb(0,0,0,0.15)",
                        pointBackgroundColor: "rgba(0,0,0,0)",
                        pointBorderColor: "rgba(0,0,0,0)",
                        borderWidth: 4
                    }
                ]
            };

            const barArea = {
                background: "rgba(0,0,0,0)",
                position: "absolute",
                top: "15px",
                right: "15px"
            };

            const options = {
                scales: {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false
                        }
                    ]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            };

            return (
                <div style={barArea}>
                    <Line
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
