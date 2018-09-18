import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import moment from 'moment'

const DailyTotalCalender = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;



    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
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

        let totals = {}

        let allDatesInSelectedMonth = utils.getAllTheDatesInAMonth(selectedYear, selectedMonth)
        let TotalInThatDay = allDatesInSelectedMonth.map((date) => {
            var expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter((exp) => Number(exp.value.date === date))
            totals[date] = expensesOnThatDate.map((elem) => Number(elem.value.expense)).length >= 1 ? expensesOnThatDate.map((elem) => Number(elem.value.expense)).reduce((prev, cur) => prev + cur) : 0
        })
        console.log("expenses in selected month and year  : ", usersExpensesInSelectedMonthAndYear, selectedMonth, selectedYear, allDatesInSelectedMonth, totals)

        const listStyle = {
            "backgroundColor": "white",
            "padding": "5px",
            "margin": "5px",
            "display": "inline-block",
            "width": "100px"
        }

        const ulStyle = {
            "padding": "12px",
            "background": "cadetblue",
            "marginTop": "15px",
            "borderLeft": "10px solid #d6a447",
            "borderRadius": "4px",
        }

        var printHtml = Object.keys(totals).map((elem, i) => {
            return (
                <li key={elem} style={listStyle}>{allDatesInSelectedMonth[i]} <br /> {totals[elem]} </li>
            )
        })

        if (usersExpensesInSelectedMonthAndYear.length >= 1) {
            return (
                <div>
                    <ul style={ulStyle}>{printHtml}</ul>
                </div>
            );
        } else {
            return (

                <div className="alert alert-info" role="alert">
                    You have'nt spent a penny on the selected month
                </div>

            );
        }
    }
};

export default DailyTotalCalender;
