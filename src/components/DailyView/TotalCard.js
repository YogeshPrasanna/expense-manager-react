import React from 'react'

const TotalCard = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;

    var totalExpenses = 0;

    if (!expenses) {
        return <div> Loading ... </div>
    }

    if (!currentUser) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser) {
        var eachExpense = Object.keys(expenses).map(function (key) {
            return { key: key, value: expenses[key] };
        });

        var thisUsersExpenses = eachExpense.filter((elem) => elem.value.uid === currentUser.uid && elem.value.date === props.date);

        // Overall Expenses
        if (thisUsersExpenses.length > 1) {
            totalExpenses = thisUsersExpenses.map((elem) => {
                return Number(elem.value.expense)
            }).reduce((prev, cur) => prev + cur)
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