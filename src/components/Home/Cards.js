import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Cards = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let totalExpenses = 0;
    let totalExpensesThisMonth = 0;
    let totalExpensesToday = 0;
    let totalExpensesThisWeek = 0;
    let totalExpensesThisYear = 0;
    let mostSpentCategory = "-";
    let mostSpentDay = "-";
    let leastSpentDay = "-";

    if (!expenses && !currentUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser) {
        const eachExpense = utils.eachExpense(expenses);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        const thisUsersExpensesThisMonth = utils.currentMonthExpenses(eachExpense, currentUser);
        const thisUsersExpensesToday = utils.expensesToday(eachExpense, currentUser);
        const thisUsersExpensesThisWeek = utils.expensesThisWeek(eachExpense, currentUser);
        const thisUsersExpensesThisYear = utils.expensesinCurrentYear(eachExpense, currentUser);


        // Overall Expenses
        if (thisUsersExpenses.length > 1) {
            totalExpenses = utils.totalExpense(thisUsersExpenses);
        } else if (thisUsersExpenses.length === 1) {
            totalExpenses = thisUsersExpenses[0].value.expense;
        } else {
            totalExpenses = 0;
        }

        // This month expenses
        if (thisUsersExpensesThisMonth.length > 1) {
            totalExpensesThisMonth = utils.totalExpense(thisUsersExpensesThisMonth);
        } else if (thisUsersExpensesThisMonth.length === 1) {
            totalExpensesThisMonth = thisUsersExpensesThisMonth[0].value.expense;
        } else {
            totalExpensesThisMonth = 0;
        }

        // Today's expenses
        if (thisUsersExpensesToday.length > 1) {
            totalExpensesToday = utils.totalExpense(thisUsersExpensesToday);
        } else if (thisUsersExpensesToday.length === 1) {
            totalExpensesToday = thisUsersExpensesToday[0].value.expense;
        } else {
            totalExpensesToday = 0;
        }

        // This weeks expenses
        if (thisUsersExpensesThisWeek.length > 1) {
            totalExpensesThisWeek = utils.totalExpense(thisUsersExpensesThisWeek);
        } else if (thisUsersExpensesThisWeek.length === 1) {
            totalExpensesThisWeek = thisUsersExpensesThisWeek[0].value.expense;
        } else {
            totalExpensesThisWeek = 0;
        }

        // This years expenses
        if (thisUsersExpensesThisYear.length > 1) {
            totalExpensesThisYear = utils.totalExpense(thisUsersExpensesThisYear);
        } else if (thisUsersExpensesThisWeek.length === 1) {
            totalExpensesThisYear = thisUsersExpensesThisYear[0].value.expense;
        } else {
            totalExpensesThisYear = 0;
        }

        // most spent category
        mostSpentCategory = utils.mostSpentCategory(thisUsersExpenses);
        mostSpentDay = utils.mostSpentDay(thisUsersExpenses).mostSpentDay;
        leastSpentDay = utils.mostSpentDay(thisUsersExpenses).leastSpentDay;
    }


    //mostSpentCategory
    if (props.settings) {
        if (window.screen.width > 720) {
            return (
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card1">
                            <div className="card-block">
                                <h3 className="card-title">Overall Spent</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpenses}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card5">
                            <div className="card-block">
                                <h3 className="card-title">This Year</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisYear}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card2">
                            <div className="card-block">
                                <h3 className="card-title">This Month</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisMonth}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card4">
                            <div className="card-block">
                                <h3 className="card-title">This Week</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisWeek}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card3">
                            <div className="card-block">
                                <h3 className="card-title">Today</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesToday}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card6">
                            <div className="card-block">
                                <h3 className="card-title">Most Spent on</h3>
                                <p className="card-text">
                                    &nbsp;
                                    {mostSpentCategory}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card7">
                            <div className="card-block">
                                <h3 className="card-title">Most Spent day</h3>
                                <p className="card-text">
                                    &nbsp;
                                    {mostSpentDay}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="card card8">
                            <div className="card-block">
                                <h3 className="card-title">Least Spent day</h3>
                                <p className="card-text">
                                    &nbsp;
                                    {leastSpentDay}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>

                    <div class="slider">
                        {/* <a href="#slide-1">1</a>
                        <a href="#slide-2">2</a>
                        <a href="#slide-3">3</a>
                        <a href="#slide-4">4</a> */}

                        <div class="slides">
                            <div id="slide-1">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card1">
                                        <div className="card-block">
                                            <h3 className="card-title">Overall Spent</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpenses}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-2">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card5">
                                        <div className="card-block">
                                            <h3 className="card-title">This Year</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisYear}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-3">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card2">
                                        <div className="card-block">
                                            <h3 className="card-title">This Month</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisMonth}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-4">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card4">
                                        <div className="card-block">
                                            <h3 className="card-title">This Week</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisWeek}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-5">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card3">
                                        <div className="card-block">
                                            <h3 className="card-title">Today</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesToday}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-6">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card6">
                                        <div className="card-block">
                                            <h3 className="card-title">Most Spent on</h3>
                                            <p className="card-text">
                                                &nbsp;
                                                {mostSpentCategory}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-7">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card7">
                                        <div className="card-block">
                                            <h3 className="card-title">Most Spent day</h3>
                                            <p className="card-text">
                                                &nbsp;
                                                {mostSpentDay}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-8">
                                <div className="col-sm-6 col-md-6 col-lg-3 nopadding">
                                    <div className="card card8">
                                        <div className="card-block">
                                            <h3 className="card-title">Least Spent day</h3>
                                            <p className="card-text">
                                                &nbsp;
                                                {leastSpentDay}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card card1">
                        <div className="card-block">
                            <h3 className="card-title">Overall Spent</h3>
                            <Loader />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card card5">
                        <div className="card-block">
                            <h3 className="card-title">This Year</h3>
                            <Loader />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card card2">
                        <div className="card-block">
                            <h3 className="card-title">This Month</h3>
                            <Loader />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card card4">
                        <div className="card-block">
                            <h3 className="card-title">This Week</h3>
                            <Loader />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card card3">
                        <div className="card-block">
                            <h3 className="card-title">Today</h3>
                            <Loader />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Cards;
