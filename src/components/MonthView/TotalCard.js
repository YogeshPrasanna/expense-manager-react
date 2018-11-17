import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const TotalCard = props => {
    const pad0 = {
        padding: "0"
    };

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;
    let settings = props.settings;

    let totalExpenses = 0;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear || !settings) {
        return (
            <div>
                <Loader />
            </div>
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

        // Overall Expenses
        if (usersExpensesInSelectedMonthAndYear.length > 1) {
            totalExpenses = utils.totalExpense(usersExpensesInSelectedMonthAndYear);
        } else if (usersExpensesInSelectedMonthAndYear.length === 1) {
            totalExpenses = usersExpensesInSelectedMonthAndYear[0].value.expense;
        } else {
            totalExpenses = 0;
        }
    }

    if (settings) {
        return (
            <div className="col-sm-12" style={pad0}>
                <div className="card card1 mobileNoPadding">
                    <div className="card-block">
                        <h3 className="card-title">
                            Total Money Spent <i className="fa fa-money float-right" />
                        </h3>
                        <p className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {totalExpenses}
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="col-sm-12" style={pad0}>
                <div className="card card1 mobileNoPadding">
                    <div className="card-block">
                        <h3 className="card-title">
                            Total Money Spent <i className="fa fa-money float-right" />
                        </h3>
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }
};

export default TotalCard;
