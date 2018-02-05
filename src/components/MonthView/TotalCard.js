import React from 'react'

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
        var eachExpense = Object.keys(expenses).map(function (key) {
            return { key: key, value: expenses[key] };
        });

        var usersExpensesInSelectedMonthAndYear = eachExpense.filter((elem) => elem.value.uid === currentUser.uid).filter((elem) => new Date(elem.value.date).getFullYear().toString() === selectedYear).filter((elem) => new Date(elem.value.date).getMonth().toString() === selectedMonth);

        // Overall Expenses
        if (usersExpensesInSelectedMonthAndYear.length > 1) {
            totalExpenses = usersExpensesInSelectedMonthAndYear.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
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