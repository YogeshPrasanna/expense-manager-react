import React from "react";
import { Line } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import moment from "moment";

const LineChartExpenseTimeline = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;
    let settings = props.settings;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear || !settings) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear && settings) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        let totals = {};
        let dayStart = [];
        let dayEnd = [];

        let allDatesInSelectedMonth = utils.getAllTheDatesInAMonth(selectedYear, selectedMonth);
        let TotalInThatDay = allDatesInSelectedMonth.map(date => {
            let expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter(exp => Number(exp.value.date === date));
            totals[date] =
                expensesOnThatDate.map(elem => Number(elem.value.expense)).length >= 1
                    ? expensesOnThatDate.map(elem => Number(elem.value.expense)).reduce((prev, cur) => prev + cur)
                    : 0;
        });

        const today = moment().format("MM/DD/YYYY");

        for (let i = 0; i < moment(allDatesInSelectedMonth[0]).day(); i++) {
            dayStart.push(i);
        }

        for (
            let i = 0;
            i < Math.abs(moment(allDatesInSelectedMonth[allDatesInSelectedMonth.length - 1]).day() - 6);
            i++
        ) {
            dayEnd.push(i);
        }


        const data = {
            labels: Object.keys(totals).map(date => date.substr(3, 2)),
            //type: 'line',
            datasets: [
                {
                    label: "Expense",
                    //fill: false,
                    // lineTension: 0.1,
                    // backgroundColor: "rgba(75,192,192,0.4)",
                    // borderColor: "rgba(75,192,192,1)",
                    // borderCapStyle: "butt",
                    // borderDash: [],
                    // borderDashOffset: 0.0,
                    // borderJoinStyle: "miter",
                    // pointBorderColor: "rgba(75,192,192,1)",
                    // pointBackgroundColor: "#fff",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    // fill: true,
                    data: Object.values(totals),
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgb(0,0,0,0)",
                    //backgroundColor: "rgb(68, 159, 238)",
                    pointBackgroundColor: "rgba(0,0,0,0)",
                    pointBorderColor: "rgba(0,0,0,0)",
                    borderWidth: 4
                }
            ]
        };

        const lineArea = settings.mode === "night" ? { background: window.screen.width > 720 ? "#2C3034" : "#2C3034" } : { background: "#dddddd" };
        const headerColor = settings.mode === "night" ? { color: "rgb(237, 211, 130)" } : { color: "inherit" }
        const mobPad15 = { padding: window.screen.width > 720 ? "0" : "15px" };
        let options = {
            legend: {
                display: false,
                labels: {
                    fontColor: "rgb(247, 162, 120)"
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90,
                        fontColor: "rgb(81, 152, 114)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    scaleLabel: {
                        display: false,
                        labelString: "Normalized/Indexed Data",
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }

        let optionsDesktop = {
            legend: {
                labels: {
                    fontColor: "rgb(247, 162, 120)"
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "rgb(81, 152, 114)",
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "rgb(81, 152, 114)",
                    }
                }]
            }
        }

        return (
            <div>
                <h4 style={{ ...mobPad15, ...headerColor }}>Expense Timeline</h4>
                <div className="col-sm-12 mobileNoPadding" style={lineArea}>
                    {" "}
                    <Line data={data} options={window.screen.width > 720 ? optionsDesktop : options} height={window.screen.width > 720 ? 70 : 150} />
                </div>
            </div>
        );
    }
};

export default LineChartExpenseTimeline;
