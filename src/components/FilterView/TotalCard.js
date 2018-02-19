import React from 'react'
import * as utils from '../Util'

const TotalCard = (props) => {

    const pad0 = {
        "padding": "0"
    }

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let startDate = props.fromdate;
    let endDate = props.todate;
    let expenseFrom = props.expensefrom;
    let expenseTo = props.expenseto;
    let category = props.category;

    let totalExpenses = 0;

    if (!expenses || !currentUser) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category) {
        let eachExpense = utils.eachExpense(expenses)
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser)
        let filteredExpenses = utils.filterExpensesByCriteria(startDate, endDate, category, expenseFrom, expenseTo, thisUsersExpenses)


        // Overall Expenses
        if (filteredExpenses.length > 1) {
            totalExpenses = utils.totalExpense(filteredExpenses)
        } else if (filteredExpenses.length === 1) {
            totalExpenses = filteredExpenses[0].value.expense
        } else {
            totalExpenses = 0
        }
    }

    return (
        <div className="col-sm-12" style={pad0}>
            <div className="card card1">
                <div className="card-block">
                    <h3 className="card-title">Total<i className="fa fa-money float-right"></i></h3>
                    <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpenses}</p>
                </div>
            </div>
        </div>
    )
}

export default TotalCard