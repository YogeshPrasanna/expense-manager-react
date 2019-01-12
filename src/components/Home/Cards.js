import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import Trianglify from "trianglify";

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
    let categories = props.categories;
    if (!expenses && !currentUser && !categories) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && categories) {
        const eachExpense = utils.eachExpense(expenses);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        let eachCategories = utils.eachCategory(categories);
        let thisUsersCategories = utils.currentUsersCategories(eachCategories, currentUser);

        const thisUsersExpensesThisMonth = utils.currentMonthExpenses(eachExpense, currentUser);
        const thisUsersExpensesToday = utils.expensesToday(eachExpense, currentUser);
        const thisUsersExpensesThisWeek = utils.expensesThisWeek(eachExpense, currentUser);
        const thisUsersExpensesThisYear = utils.expensesinCurrentYear(eachExpense, currentUser);

        // Overall Expenses
        if (thisUsersExpenses.length >= 1) {
            totalExpenses = utils.totalExpense(thisUsersExpenses);
        } else if (thisUsersExpenses.length === 1) {
            totalExpenses = thisUsersExpenses[0].value.expense;
        } else {
            totalExpenses = 0;
        }

        // This month expenses
        if (thisUsersExpensesThisMonth.length >= 1) {
            totalExpensesThisMonth = utils.totalExpense(thisUsersExpensesThisMonth);
        } else if (thisUsersExpensesThisMonth.length === 1) {
            totalExpensesThisMonth = thisUsersExpensesThisMonth[0].value.expense;
        } else {
            totalExpensesThisMonth = 0;
        }

        // Today's expenses
        if (thisUsersExpensesToday.length >= 1) {
            totalExpensesToday = utils.totalExpense(thisUsersExpensesToday);
        } else if (thisUsersExpensesToday.length === 1) {
            totalExpensesToday = thisUsersExpensesToday[0].value.expense;
        } else {
            totalExpensesToday = 0;
        }

        // This weeks expenses
        if (thisUsersExpensesThisWeek.length >= 1) {
            totalExpensesThisWeek = utils.totalExpense(thisUsersExpensesThisWeek);
        } else if (thisUsersExpensesThisWeek.length === 1) {
            totalExpensesThisWeek = thisUsersExpensesThisWeek[0].value.expense;
        } else {
            totalExpensesThisWeek = 0;
        }

        // This years expenses
        if (thisUsersExpensesThisYear.length >= 1) {
            totalExpensesThisYear = utils.totalExpense(thisUsersExpensesThisYear);
        } else if (thisUsersExpensesThisWeek.length === 1) {
            totalExpensesThisYear = thisUsersExpensesThisYear[0].value.expense;
        } else {
            totalExpensesThisYear = 0;
        }

        // most spent category
        mostSpentCategory = utils.mostSpentCategory(thisUsersExpenses,thisUsersCategories);
        mostSpentDay = utils.mostSpentDay(thisUsersExpenses).mostSpentDay;
        leastSpentDay = utils.mostSpentDay(thisUsersExpenses).leastSpentDay;
    }

    //mostSpentCategory
    if (props.settings && props.cards) {
        // var patternconfig = {
        //     height: 300,
        //     width: 300,
        //     // palette: Trianglify.colorbrewer,
        //     cell_size: 250
        // };
        // var pattern = Trianglify({
        //     ...patternconfig
        // });
        // var pattern2 = Trianglify({ ...patternconfig });
        // var pattern3 = Trianglify({ ...patternconfig });
        // var pattern4 = Trianglify({ ...patternconfig });
        // var pattern5 = Trianglify({ ...patternconfig });
        // var pattern6 = Trianglify({ ...patternconfig });
        // var pattern7 = Trianglify({ ...patternconfig });
        // var pattern8 = Trianglify({ ...patternconfig });

        // const card8 = { backgroundImage: `url(${pattern8.png()})` };
        // const card7 = { backgroundImage: `url(${pattern7.png()})` };
        // const card6 = { backgroundImage: `url(${pattern6.png()})` };
        // const card5 = { backgroundImage: `url(${pattern5.png()})` };
        // const card4 = { backgroundImage: `url(${pattern4.png()})` };
        // const card3 = { backgroundImage: `url(${pattern3.png()})` };
        // const card2 = { backgroundImage: `url(${pattern2.png()})` };
        // const card1 = { backgroundImage: `url(${pattern.png()})` };
        if (window.screen.width > 720) {
            return (
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card1" style={props.cards.card1}>
                            <div className="card-block">
                                <h3 className="card-title">Overall Spent</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpenses.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card2" style={props.cards.card2}>
                            <div className="card-block">
                                <h3 className="card-title">This Year</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisYear.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card3" style={props.cards.card3}>
                            <div className="card-block">
                                <h3 className="card-title">
                                    This Month{" "}
                                    <i
                                        className={
                                            totalExpensesThisMonth > props.settings.monthLimit
                                                ? "fa fa-warning warning-color"
                                                : ""
                                        }
                                        aria-hidden="true"
                                    />{" "}
                                </h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisMonth.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                                <p className="limitText">
                                    {totalExpensesThisMonth > props.settings.monthLimit ? (
                                        <span>
                                            Monthly <br /> Limit <br /> exceeded{" "}
                                        </span>
                                    ) : (
                                            ""
                                        )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card4" style={props.cards.card4}>
                            <div className="card-block">
                                <h3 className="card-title">This Week</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisWeek.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card5" style={props.cards.card5}>
                            <div className="card-block">
                                <h3 className="card-title">Today</h3>
                                <p className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesToday.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card6" style={props.cards.card6}>
                            <div className="card-block">
                                <h3 className="card-title">Most Spent on</h3>
                                <p className="card-text">
                                    &nbsp;
                                    {mostSpentCategory}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card7" style={props.cards.card7}>
                            <div className="card-block">
                                <h3 className="card-title">Most Spent day</h3>
                                <p className="card-text">
                                    &nbsp;
                                    {mostSpentDay}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card8" style={props.cards.card8}>
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
                <div class="mobileNoPadding">
                    <div class="slider">
                        {/* <a href="#slide-1">1</a>
                        <a href="#slide-2">2</a>
                        <a href="#slide-3">3</a>
                        <a href="#slide-4">4</a> */}

                        <div class="slides">
                            <div id="slide-1">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card1 mobileNoPadding" style={props.cards.card1}>
                                        <div className="card-block">
                                            <h3 className="card-title">Overall Spent</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpenses.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-2">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card5 mobileNoPadding" style={props.cards.card5}>
                                        <div className="card-block">
                                            <h3 className="card-title">This Year</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisYear.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-3">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card2 mobileNoPadding" style={props.cards.card2}>
                                        <div className="card-block">
                                            <h3 className="card-title">
                                                This Month{" "}
                                                <i
                                                    className={
                                                        totalExpensesThisMonth > props.settings.monthLimit
                                                            ? "fa fa-warning warning-color"
                                                            : ""
                                                    }
                                                    aria-hidden="true"
                                                />{" "}
                                            </h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisMonth
                                                    .toString()
                                                    .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                            <p className="limitText">
                                                {totalExpensesThisMonth > props.settings.monthLimit ? (
                                                    <span>
                                                        Monthly <br /> Limit <br /> exceeded{" "}
                                                    </span>
                                                ) : (
                                                        ""
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-4">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card4 mobileNoPadding" style={props.cards.card4}>
                                        <div className="card-block">
                                            <h3 className="card-title">This Week</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisWeek.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-5">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card3 mobileNoPadding" style={props.cards.card3}>
                                        <div className="card-block">
                                            <h3 className="card-title">Today</h3>
                                            <p className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(props.settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesToday.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-6">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card6 mobileNoPadding" style={props.cards.card6}>
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
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card7 mobileNoPadding" style={props.cards.card7}>
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
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card8 mobileNoPadding" style={props.cards.card8}>
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
