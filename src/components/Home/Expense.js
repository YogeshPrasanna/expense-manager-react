import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";

const Expense = props => {
    const { expenses, authUser, settings, convertedCurrency } = props;

    if (!expenses || !authUser) {
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

    if (expenses && authUser) {
        // let eachExpense = utils.eachExpense(expenses);
        // let thisUsersExpenses = utils.authUsersExpenses(eachExpense, authUser);

        if (expenses.length) {
            return expenses.map(function(elem, i) {
                return (
                    <ExpenseRow
                        user={authUser}
                        expense={elem}
                        num={i}
                        key={i}
                        expenseId={expenses[i].key}
                        settings={settings}
                        convertedCurrency={convertedCurrency}
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
