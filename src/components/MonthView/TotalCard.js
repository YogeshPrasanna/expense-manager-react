import React from 'react'

import * as utils from '../Util'

const TotalCard = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;
    var selectedMonth = props.month;
    var selectedYear = props.year;

    var totalExpenses = 0;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        var eachExpense = utils.eachExpense(expenses);
        var usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(eachExpense, currentUser, selectedMonth, selectedYear);

        // Overall Expenses
        if (usersExpensesInSelectedMonthAndYear.length > 1) {
            totalExpenses = utils.totalExpense(usersExpensesInSelectedMonthAndYear);
        } else if (usersExpensesInSelectedMonthAndYear.length === 1) {
            totalExpenses = usersExpensesInSelectedMonthAndYear[0].value.expense
        } else {
            totalExpenses = 0
        }

    }

    return (
        <div className="col-sm-12">
            <div className="card card1">
                <div className="card-block">
                    <h3 className="card-title">Total Money Spent </h3>
                    <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpenses}</p>
                </div>
            </div>
        </div>
    )
}

export default TotalCard