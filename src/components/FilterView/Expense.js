import React from 'react'
import ExpenseRow from '../Common/ExpenseRow'
import moment from 'moment'

import * as utils from '../Util'

const Expense = (props) => {

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let startDate = props.fromdate;
    let endDate = props.todate;
    let expenseFrom = props.expensefrom;
    let expenseTo = props.expenseto;
    let category = props.category;

    if (!expenses || !currentUser) {
        return <tr><td> Loading ... </td></tr>
    }

    if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category) {
        let eachExpense = utils.eachExpense(expenses)
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser)

        console.log("PROPS ", props.expense)

        var start = new Date(startDate);
        var end = new Date(endDate);
        var currentDate = new Date(start);
        var between = [];
        var filteredExpenses = [];

        while (currentDate <= end) {
            between.push(moment(new Date(currentDate)).format("MM/DD/YYYY"));
            //between.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        console.log("Between ",between, eachExpense)

        between.forEach(function (elem) {
            return thisUsersExpenses.filter(function (el) {
                return elem === el.value.date ? filteredExpenses.push(el) : ''
            })
        })

        filteredExpenses = filteredExpenses.filter((elem) => {
            return elem.value.category === category
        }).filter((elem) => {
            return Number(elem.value.expense) >= Number(expenseFrom) && 
                                    Number(elem.value.expense) <= Number(expenseTo)
        })

        console.log("Filtered dates ", filteredExpenses)

        return filteredExpenses.map(function (elem, i) {
            return <ExpenseRow user={props.authUser} expense={elem} num={i} key={i} expenseId={filteredExpenses[i].key} />
        })
    }

}


export default Expense;