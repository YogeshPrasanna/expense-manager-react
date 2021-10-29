import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const TotalCard = props => {
    const pad0 = {
        padding: "0"
    };

    const cardStyleDesktop = {
        "color": "white",
        "mixBlendMode": "difference"
    }

    const cardStyleMobile = {
        "color": "#2C3034",
    }

    const expenses = props.expenses;
    const currentUser = props.authUser;
    const selectedMonth = props.month;
    const selectedYear = props.year;
    const settings = props.settings;
    const cards = props.cards;

    let totalExpenses = 0;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear || !settings) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear && cards) {
        const eachExpense = utils.eachExpense(expenses);
        const usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
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
                <div className="card card1 mobileNoPadding" style={cards.card1}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title">
                            Total Money Spent <i className="fa fa-money float-right" />
                        </h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {totalExpenses.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
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
