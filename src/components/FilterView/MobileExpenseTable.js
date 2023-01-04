import React from "react";
import MobileExpenseRow from "./../Common/MobileExpenseRow";
import Loader from "../Common/Loader";

import * as utils from "../Util";

const MobileExpenseTable = (props) => {
  const expenses = props.expenses;
  const currentUser = props.authUser;
  const startDate = props.fromdate;
  const endDate = props.todate;
  const expenseFrom = props.expensefrom;
  const expenseTo = props.expenseto;
  const category = props.category;

  if (!expenses || !currentUser) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (expenses && currentUser) {
    const eachExpense = utils.eachExpense(expenses);
    const thisUsersExpenses = utils.currentUsersExpenses(
      eachExpense,
      currentUser
    );
    const filteredExpenses = utils.filterExpensesByCriteria(
      startDate,
      endDate,
      category,
      expenseFrom,
      expenseTo,
      thisUsersExpenses
    );

    if (filteredExpenses.length) {
      return filteredExpenses.map(function (elem, i) {
        return (
          <MobileExpenseRow
            user={props.authUser}
            expense={elem}
            num={i}
            key={i}
            expenseId={filteredExpenses[i].key}
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
