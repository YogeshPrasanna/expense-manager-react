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

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
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
            var expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter(exp => Number(exp.value.date === date));
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

        console.log("Totals :", totals);

        const data = {
            labels: Object.keys(totals).map(date => date.substr(3, 2)),
            datasets: [
                {
                    label: "Expense",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    fill: true,
                    data: Object.values(totals)
                }
            ]
        };

        const lineArea = { background: "#DDDDDD" };

        return (
            <div>
                <h4>Expense Timeline</h4>
                <div className="col-sm-12" style={lineArea}>
                    {" "}
                    <Line data={data} height={window.screen.width > 720 ? 70 : 250} />
                </div>
            </div>
        );
    }
};

export default LineChartExpenseTimeline;
