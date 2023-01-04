import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const MonthLimitWarning = (props) => {
  const expenses = props.expenses;
  const currentUser = props.authUser;
  const selectedMonth = props.month;
  const selectedYear = props.year;
  const settings = props.settings;

  let totalExpenses = 0;

  if (
    !expenses ||
    !currentUser ||
    !selectedMonth ||
    !selectedYear ||
    !settings
  ) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (expenses && currentUser && selectedMonth && selectedYear) {
    const eachExpense = utils.eachExpense(expenses);
    const usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
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
      if (totalExpenses > settings.monthLimit) {
        return (
          <div className="alert alert-warning mobileNoMargin" role="alert">
            <i
              className="fa fa-warning fa-2x warning-color icon-size-monthly-warning"
              aria-hidden="true"
            />
            You've exceeded your monthly limit
          </div>
        );
      } else {
        return (
          <div className="alert alert-success mobileNoMargin" role="alert">
            <i
              className="fa fa-check fa-2x success-color icon-size-monthly-warning"
              aria-hidden="true"
            />
            Yay You're still under the Montly Limit
          </div>
        );
      }
    }
  }
};

export default MonthLimitWarning;
