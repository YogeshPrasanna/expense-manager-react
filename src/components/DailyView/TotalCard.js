import React from 'react'
import * as utils from '../Util'

const TotalCard = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;
    var selectedDate = props.date;

    var totalExpenses = 0;

    if (!expenses || !currentUser) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser) {
        var eachExpense = utils.eachExpense(expenses);
        var thisUsersExpenses = utils.expensesInDate(eachExpense,currentUser,selectedDate)

        // Overall Expenses
        if (thisUsersExpenses.length > 1) {
            totalExpenses = utils.totalExpense(thisUsersExpenses)
        } else if (thisUsersExpenses.length === 1) {
            totalExpenses = thisUsersExpenses[0].value.expense
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