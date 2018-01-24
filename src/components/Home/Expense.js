import React , { Component } from 'react'
import * as db from '../../firebase/db'
import ExpenseRow from './ExpenseRow'

const Expense = (props) => {

        var expenses = props.expenses;
        var currentUser = props.authUser;

        if(!expenses){
            return <div> Loading ... </div>
        }

        if (!currentUser) {
            return <div> Loading ... </div>
        }

        if (expenses && currentUser){
            var eachExpense = Object.keys(expenses).map(function (key) {
                return { key: key, value: expenses[key] };
            });

            var thisUsersExpenses = eachExpense.filter((elem) => elem.value.uid === currentUser.uid);

            var tableString = thisUsersExpenses.map((elem, i) => {
                return `<tr id=${thisUsersExpenses[i].key}><td>${thisUsersExpenses[i].value.date}</td></tr>`
            })

            return thisUsersExpenses.map(function (elem) {
                return <ExpenseRow expense={elem} />
            })
        }

    }


export default Expense;