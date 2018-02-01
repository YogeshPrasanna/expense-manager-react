import React from 'react'
import moment from 'moment'

const Cards = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;
    var totalExpenses = 0;
    var totalExpensesThisMonth = 0;
    var totalExpensesToday = 0;
    var totalExpensesThisWeek = 0;

    if (!expenses) {
        return <tr><td> Loading ... </td></tr>
    }

    if (!currentUser) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser) {
        var eachExpense = Object.keys(expenses).map(function (key) {
            return { key: key, value: expenses[key] };
        });

        var thisUsersExpenses = eachExpense.filter((elem) => elem.value.uid === currentUser.uid);
        var thisUsersExpensesThisMonth = eachExpense.filter((elem) => elem.value.uid === currentUser.uid && new Date(elem.value.date).getMonth() === new Date().getMonth())
        var thisUsersExpensesToday = thisUsersExpensesThisMonth.filter((elem) => new Date(elem.value.date).getDate() === new Date().getDate())          
        var thisUsersExpensesThisWeek = eachExpense.filter((elem) => elem.value.uid === currentUser.uid && (moment(elem.value.date , 'MM/DD/YYYY').week() === moment(moment(new Date()) , 'MM/DD/YYYY').week()))

        console.log("This users expenses this week : ", thisUsersExpensesThisWeek)


        if (thisUsersExpenses.length > 1) {
            totalExpenses = thisUsersExpenses.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
        } else if (thisUsersExpenses.length === 1) {
            totalExpenses = thisUsersExpenses[0].value.expense
        }else{
            totalExpenses = 0
        }

        if (thisUsersExpensesThisMonth.length > 1){
            totalExpensesThisMonth = thisUsersExpensesThisMonth.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
        } else if (thisUsersExpensesThisMonth.length === 1) {
            totalExpensesThisMonth = thisUsersExpensesThisMonth[0].value.expense            
        }else{
            totalExpensesThisMonth = 0
        }

        console.log("Today ", thisUsersExpensesToday)

        if(thisUsersExpensesToday.length > 1){
            totalExpensesToday = thisUsersExpensesToday.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
        } else if (thisUsersExpensesToday.length === 1){
            totalExpensesToday = thisUsersExpensesToday[0].value.expense
        } else {
            totalExpensesToday = 0
        }

        if (thisUsersExpensesThisWeek.length > 1) {
            totalExpensesThisWeek = thisUsersExpensesThisWeek.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
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
                <div className="card card3">
                    <div className="card-block">
                        <h3 className="card-title">Today</h3>
                        <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> {totalExpensesToday}</p>
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
        </div>
    )
}

export default Cards