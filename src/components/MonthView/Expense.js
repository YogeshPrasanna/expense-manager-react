import React from 'react'
import ExpenseRow from '../Common/ExpenseRow'

const Expense = (props) => {

    var expenses = props.expenses;
    var currentUser = props.authUser;
    var selectedMonth = props.month;
    var selectedYear = props.year

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        var eachExpense = Object.keys(expenses).map(function (key) {
            return { key: key, value: expenses[key] };
        });

        var usersExpensesInSelectedMonthAndYear = eachExpense.filter((elem) => elem.value.uid === currentUser.uid).filter((elem) => new Date(elem.value.date).getFullYear().toString() === selectedYear).filter((elem) => new Date(elem.value.date).getMonth().toString() === selectedMonth);

        return usersExpensesInSelectedMonthAndYear.map(function (elem, i) {
            return <ExpenseRow expense={elem} num={i} key={i} expenseId={usersExpensesInSelectedMonthAndYear[i].key} />
        })
    }
}

export default Expense;