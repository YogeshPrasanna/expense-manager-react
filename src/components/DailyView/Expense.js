import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Expense = (props) => {
  const expenses = props.expenses;
  const currentUser = props.authUser;
  const dateSelected = props.date;

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
    const eachExpense = utils.eachExpense(expenses);
    const thisUsersExpenses = utils.expensesInDate(
      eachExpense,
      currentUser,
      dateSelected
    );

    if (thisUsersExpenses.length) {
      return thisUsersExpenses.map((elem, i) => {
        return (
          <ExpenseRow
            user={props.authUser}
            expense={elem}
            num={i}
            key={i}
            expenseId={thisUsersExpenses[i].key}
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
              You have'nt spent a penny on {props.date}{" "}
            </div>
          </td>
        </tr>
      );
    }
  }
};

export default Expense;
