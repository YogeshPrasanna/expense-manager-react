import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";

const Expense = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;

    if (!expenses || !currentUser) {
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

    if (expenses && currentUser) {
        // let eachExpense = utils.eachExpense(expenses);
        // let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        if (expenses.length) {
            return expenses.map(function(elem, i) {
                return (
                    <ExpenseRow
                        user={props.authUser}
                        expense={elem}
                        num={i}
                        key={i}
                        expenseId={expenses[i].key}
                        settings={props.settings}
                        convertedCurrency={props.convertedCurrency}
                    />
                );
            });
        } else {
            return (
                <tr>
                    <td>
                        <div className="alert alert-info" role="alert">
                            Start logging your expenses to see your expenses here , add an expense by clicking on the +
                            Button on the bottom right corner of this page
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default Expense;
