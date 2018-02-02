import React from 'react'
import ExpenseRow from '../Common/ExpenseRow'

const Expense = (props) => {

        var expenses = props.expenses;
        var currentUser = props.authUser;

        if(!expenses){
            return <tr><td> Loading ... </td></tr>
        }

        if (!currentUser) {
            return <tr><td> Loading ... </td></tr>
        }

        if (expenses && currentUser){
            var eachExpense = Object.keys(expenses).map(function (key) {
                return { key: key, value: expenses[key] };
            });

            var thisUsersExpenses = eachExpense.filter((elem) => elem.value.uid === currentUser.uid && elem.value.date === props.date);

            return thisUsersExpenses.map(function (elem,i) {
                return <ExpenseRow expense={elem} num={i} key={i} expenseId={thisUsersExpenses[i].key}/>
            })
        }

    }


export default Expense;