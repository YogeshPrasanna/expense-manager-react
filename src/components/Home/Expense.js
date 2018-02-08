import React from 'react'
import ExpenseRow from '../Common/ExpenseRow'

import * as utils from '../Util'

const Expense = (props) => {

        let expenses = props.expenses;
        let currentUser = props.authUser;

        if (!expenses || !currentUser){
            return <tr><td> Loading ... </td></tr>
        }

        if (expenses && currentUser){
            let eachExpense = utils.eachExpense(expenses)
            let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser)

            return thisUsersExpenses.map(function (elem,i) {
                return <ExpenseRow expense={elem} num={i} key={i} expenseId={thisUsersExpenses[i].key}/>
            })
        }

    }


export default Expense;