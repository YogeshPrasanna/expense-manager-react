import React from 'react'
import moment from 'moment'

import * as utils from '../Util'

const Cards = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;
    var totalExpenses = 0;
    var totalExpensesThisMonth = 0;
    var totalExpensesToday = 0;
    var totalExpensesThisWeek = 0;

    if (!expenses && !currentUser) {
        return <div> Loading ... </div>
    }

    if (expenses && currentUser) {
        const eachExpense = utils.eachExpense(expenses)
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        const thisUsersExpensesThisMonth = utils.currentMonthExpenses(eachExpense, currentUser)
        const thisUsersExpensesToday = utils.expensesToday(eachExpense, currentUser)      
        const thisUsersExpensesThisWeek = utils.expensesThisWeek(eachExpense, currentUser)

        // Overall Expenses
        if (thisUsersExpenses.length > 1) {
            totalExpenses = utils.totalExpense(thisUsersExpenses)
        } else if (thisUsersExpenses.length === 1) {
            totalExpenses = thisUsersExpenses[0].value.expense
        }else{
            totalExpenses = 0
        }

        // This month expenses
        if (thisUsersExpensesThisMonth.length > 1){
            totalExpensesThisMonth = utils.totalExpense(thisUsersExpensesThisMonth)
        } else if (thisUsersExpensesThisMonth.length === 1) {
            totalExpensesThisMonth = thisUsersExpensesThisMonth[0].value.expense            
        }else{
            totalExpensesThisMonth = 0
        }

        // Today's expenses
        if(thisUsersExpensesToday.length > 1){
            totalExpensesToday = utils.totalExpense(thisUsersExpensesToday)
        } else if (thisUsersExpensesToday.length === 1){
            totalExpensesToday = thisUsersExpensesToday[0].value.expense
        } else {
            totalExpensesToday = 0
        }

        // This weeks expenses
        if (thisUsersExpensesThisWeek.length > 1) {
            totalExpensesThisWeek = utils.totalExpense(thisUsersExpensesThisWeek)
        } else if (thisUsersExpensesThisWeek.length === 1) {
            totalExpensesThisWeek = thisUsersExpensesThisWeek[0].value.expense
        } else {
            totalExpensesThisWeek = 0
        }
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="card card1">
                    <div className="card-block">
                        <h3 className="card-title">Overall Money Spent</h3>
                        <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpenses}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card card2">
                    <div className="card-block">
                        <h3 className="card-title">This Month</h3>
                        <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpensesThisMonth}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card card4">
                    <div className="card-block">
                        <h3 className="card-title">This Week</h3>
                        <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpensesThisWeek}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card card3">
                    <div className="card-block">
                        <h3 className="card-title">Today</h3>
                        <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpensesToday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards