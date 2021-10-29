import React from "react";
import MobileExpenseRow from "../Common/MobileExpenseRow";
import Loader from "../Common/Loader";

import * as utils from "../Util";

const MobileExpenseTable = props => {
    const { expenses, authUser, settings, convertedCurrency } = props;

    if (!expenses || !authUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && authUser) {
        const eachExpense = utils.eachExpense(expenses);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, authUser);

        if (thisUsersExpenses.length) {
            return thisUsersExpenses.map(function (elem, i) {
                return (
                    <MobileExpenseRow
                        user={authUser}
                        expense={elem}
                        num={i}
                        key={i}
                        expenseId={thisUsersExpenses[i].key}
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

export default MobileExpenseTable;
