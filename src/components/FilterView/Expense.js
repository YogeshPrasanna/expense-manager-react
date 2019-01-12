import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Expense = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let startDate = props.fromdate;
    let endDate = props.todate;
    let expenseFrom = props.expensefrom;
    let expenseTo = props.expenseto;
    let category = props.category;
    let categories = props.categories;

    if (!expenses || !currentUser || !categories) {
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

    if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category && categories) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);
        let filteredExpenses = utils.filterExpensesByCriteria(
            startDate,
            endDate,
            category,
            expenseFrom,
            expenseTo,
            thisUsersExpenses
        );

        if (filteredExpenses.length) {
            return filteredExpenses.map(function(elem, i) {
                return (
                    <ExpenseRow
                        user={props.authUser}
                        expense={elem}
                        num={i}
                        key={i}
                        expenseId={filteredExpenses[i].key}
                        settings={props.settings}
                        convertedCurrency={props.convertedCurrency}
                        categories={props.categories}
                    />
                );
            });
        } else {
            return (
                <tr>
                    <td>
                        <div className="alert alert-info" role="alert">
                            Filter Resulted in no records
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default Expense;
