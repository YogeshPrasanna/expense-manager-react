import React from 'react'

import * as utils from '../Util'

const TotalCard = (props) => {

    const pad0 = {
        "padding": "0"
    }

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    let totalExpenses = 0;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(eachExpense, currentUser, selectedMonth, selectedYear);

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
        <div className="col-sm-12" style={pad0}>
            <div className="card card1">
                <div className="card-block">
                    <h3 className="card-title">Total Money Spent <i className="fa fa-money float-right"></i></h3>
                    <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpenses}</p>
                </div>
            </div>
        </div>
    )
}

export default TotalCard