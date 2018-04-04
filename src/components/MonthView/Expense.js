import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Expense = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        return usersExpensesInSelectedMonthAndYear.map(function(elem, i) {
            return (
                <ExpenseRow
                    user={props.authUser}
                    expense={elem}
                    num={i}
                    key={i}
                    expenseId={usersExpensesInSelectedMonthAndYear[i].key}
                />
            );
        });
    }
};

export default Expense;
