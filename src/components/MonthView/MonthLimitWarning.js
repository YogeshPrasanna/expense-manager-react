import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const MonthLimitWarning = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;
    let settings = props.settings;

    let totalExpenses = 0;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear || !settings) {
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

        // Overall Expenses
        if (usersExpensesInSelectedMonthAndYear.length > 1) {
            totalExpenses = utils.totalExpense(usersExpensesInSelectedMonthAndYear);
        } else if (usersExpensesInSelectedMonthAndYear.length === 1) {
            totalExpenses = usersExpensesInSelectedMonthAndYear[0].value.expense;
        } else {
            totalExpenses = 0;
        }

        if (settings) {
            console.log("total expenses : ", totalExpenses, settings.monthLimit);
            if (totalExpenses > settings.monthLimit) {
                return (
                    <div class="alert alert-warning mobileNoMargin" role="alert">
                        <i className="fa fa-warning fa-2x warning-color icon-size-monthly-warning" aria-hidden="true" />
                        You've exceeded your monthly limit
                    </div>
                );
            } else {
                return (
                    <div class="alert alert-success mobileNoMargin" role="alert">
                        <i className="fa fa-check fa-2x success-color icon-size-monthly-warning" aria-hidden="true" />
                        Yay You're still under the Montly Limit
                    </div>
                );
            }
        }
    }
};

export default MonthLimitWarning;
