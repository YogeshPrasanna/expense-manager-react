import React from "react";
import MobileExpenseRow from "../Common/MobileExpenseRow";
import Loader from "../Common/Loader";

import * as utils from "../Util";

const MobileExpenseTable = (props) => {
  const expenses = props.expenses;
  const currentUser = props.authUser;
  const dateSelected = props.date;

  if (!expenses || !currentUser || !dateSelected) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (expenses && currentUser && dateSelected) {
    const eachExpense = utils.eachExpense(expenses);
    const usersExpensesInDate = utils.expensesInDate(
      eachExpense,
      currentUser,
      dateSelected
    );

    if (usersExpensesInDate.length) {
      return usersExpensesInDate.map(function (elem, i) {
        return (
          <MobileExpenseRow
            user={props.authUser}
            expense={elem}
            num={i}
            key={i}
            expenseId={usersExpensesInDate[i].key}
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
