import React from "react";
import MobileExpenseRow from "../Common/MobileExpenseRow";
import Loader from "../Common/Loader";

import * as utils from "../Util";

const MobileExpenseTable = props => {
    const expenses = props.expenses;
    const currentUser = props.authUser;
    const selectedMonth = props.month;
    const selectedYear = props.year;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        const eachExpense = utils.eachExpense(expenses);
        const usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        if (usersExpensesInSelectedMonthAndYear.length) {
            return usersExpensesInSelectedMonthAndYear.map(function (elem, i) {
                return (
                    <MobileExpenseRow
                        user={props.authUser}
                        expense={elem}
                        num={i}
                        key={i}
                        expenseId={usersExpensesInSelectedMonthAndYear[i].key}
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
                            You have'nt spent a penny on the selected month
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default MobileExpenseTable;
