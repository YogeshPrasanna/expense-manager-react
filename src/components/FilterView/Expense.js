import React from "react";
import ExpenseRow from "../Common/ExpenseRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Expense = (props) => {
  const expenses = props.expenses;
  const currentUser = props.authUser;
  const startDate = props.fromdate;
  const endDate = props.todate;
  const expenseFrom = props.expensefrom;
  const expenseTo = props.expenseto;
  const category = props.category;

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

  if (
    expenses &&
    currentUser &&
    startDate &&
    endDate &&
    expenseFrom &&
    expenseTo &&
    category
  ) {
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
          <ExpenseRow
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
              Filter Resulted in no records
            </div>
          </td>
        </tr>
      );
    }
  }
};

export default Expense;
