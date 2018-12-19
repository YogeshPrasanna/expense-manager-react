import React from "react";
import * as utils from "../Util";
import Loader from "../Common/Loader";
const TotalCard = props => {
    const pad0 = {
        padding: "0"
    };

    let expenses = props.expenses;
    let currentUser = props.authUser;
    let startDate = props.fromdate;
    let endDate = props.todate;
    let expenseFrom = props.expensefrom;
    let expenseTo = props.expenseto;
    let category = props.category;
    let settings = props.settings;
    let cards = props.cards;

    let totalExpenses = 0;

    if (!expenses || !currentUser || !settings) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category && cards) {
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

        // Overall Expenses
        if (filteredExpenses.length > 1) {
            totalExpenses = utils.totalExpense(filteredExpenses);
        } else if (filteredExpenses.length === 1) {
            totalExpenses = filteredExpenses[0].value.expense;
        } else {
            totalExpenses = 0;
        }
    }

    if (settings) {
        return (
            <div className="col-sm-12" style={pad0}>
                <div className="card card1 mobileNoPadding" style={cards.card1}>
                    <div className="card-block">
                        <h3 className="card-title">
                            Total
                            <i className="fa fa-money float-right" />
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
                <div className="card card1 mobileNoPadding" style={cards.card1}>
                    <div className="card-block">
                        <h3 className="card-title">
                            Total
                            <i className="fa fa-money float-right" />
                        </h3>
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }
};

export default TotalCard;
