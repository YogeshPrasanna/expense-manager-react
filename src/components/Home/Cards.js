import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import Trianglify from "trianglify";
import LineChartExpenseTimeline from "./LineChartTimeline";
import BarChartAllMonths from "./BarChartAllMonths";

import moment from "moment";

const Cards = props => {
    const { expenses, authUser, cards, settings } = props;

    let totalExpenses = 0;
    let totalExpensesThisMonth = 0;
    let totalExpensesToday = 0;
    let totalExpensesThisWeek = 0;
    let totalExpensesThisYear = 0;
    let mostSpentCategory = "-";
    let mostSpentDay = "-";
    let leastSpentDay = "-";

    const cardStyleDesktop = {
        "color": "white",
        "mixBlendMode": "difference"
    }

    const cardStyleMobile = {
        "color": "#2C3034",
    }

    if (!expenses && !authUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && authUser) {
        const eachExpense = utils.eachExpense(expenses);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, authUser);

        const thisUsersExpensesThisMonth = utils.currentMonthExpenses(eachExpense, authUser);
        const thisUsersExpensesToday = utils.expensesInDate(
            eachExpense,
            authUser,
            moment(new Date()).format("DD/MM/YYYY")
        );
        const thisUsersExpensesThisWeek = utils.expensesThisWeek(eachExpense, authUser);
        const thisUsersExpensesThisYear = utils.expensesinCurrentYear(eachExpense, authUser);

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
        mostSpentCategory = utils.mostSpentCategory(thisUsersExpenses);
        mostSpentDay = utils.mostSpentDay(thisUsersExpenses).mostSpentDay;
        leastSpentDay = utils.mostSpentDay(thisUsersExpenses).leastSpentDay;
    }

    //mostSpentCategory
    if (settings && cards) {
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
                <div className="row mobileNoPadding">
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card1 mobileNoPadding" style={cards.card1}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">Overall Spent</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpenses.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card2" style={cards.card2}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">This Year</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisYear.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                        {window.screen.width > 1024 ? (
                            <BarChartAllMonths expenses={expenses} authUser={authUser} />
                        ) : (
                                <span />
                            )}
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card3" style={cards.card3}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">
                                    This Month{" "}
                                    <i
                                        className={
                                            totalExpensesThisMonth > settings.monthLimit
                                                ? "fa fa-warning warning-color"
                                                : ""
                                        }
                                        aria-hidden="true"
                                    />{" "}
                                </h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisMonth.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                                <p className="limitText">
                                    {totalExpensesThisMonth > settings.monthLimit ? (
                                        <span>
                                            Monthly <br /> Limit <br /> Exceeded{" "}
                                        </span>
                                    ) : (
                                            ""
                                        )}
                                </p>
                            </div>
                        </div>
                        <div>
                            {window.screen.width > 1024 ? (
                                <LineChartExpenseTimeline expenses={expenses} authUser={authUser} settings={settings} />
                            ) : (
                                    <span />
                                )}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card4" style={cards.card4}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">This Week</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesThisWeek.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card5" style={cards.card5}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">Today</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    <i
                                        className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                        aria-hidden="true"
                                    />{" "}
                                    {totalExpensesToday.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card6" style={cards.card6}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">Most Spent On</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    &nbsp;
                                    {settings.editedCategories[mostSpentCategory] ? settings.editedCategories[mostSpentCategory] : mostSpentCategory}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card7" style={cards.card7}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">Most Spent Day</h3>
                                <p style={cardStyleDesktop} className="card-text">
                                    &nbsp;
                                    {mostSpentDay}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card card8" style={cards.card8}>
                            <div className="card-block">
                                <h3 style={cardStyleDesktop} className="card-title">Least Spent Day</h3>
                                <p style={cardStyleDesktop} className="card-text">
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
                <div className="mobileNoPadding">
                    <div className="slider">
                        {/* <a href="#slide-1">1</a>
                        <a href="#slide-2">2</a>
                        <a href="#slide-3">3</a>
                        <a href="#slide-4">4</a> */}

                        <div className="slides">
                            <div id="slide-1">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card1 mobileNoPadding" style={cards.card1}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">Overall Spent</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
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
                                    <div className="card card5 mobileNoPadding" style={cards.card5}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">This Year</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
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
                                    <div className="card card2 mobileNoPadding" style={cards.card2}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">
                                                This Month{" "}
                                                <i
                                                    className={
                                                        totalExpensesThisMonth > settings.monthLimit
                                                            ? "fa fa-warning warning-color"
                                                            : ""
                                                    }
                                                    aria-hidden="true"
                                                />{" "}
                                            </h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
                                                    aria-hidden="true"
                                                />{" "}
                                                {totalExpensesThisMonth
                                                    .toString()
                                                    .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                            </p>
                                            <p className="limitText">
                                                {totalExpensesThisMonth > settings.monthLimit ? (
                                                    <span>
                                                        Monthly <br /> Limit <br /> Exceeded{" "}
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
                                    <div className="card card4 mobileNoPadding" style={cards.card4}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">This Week</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
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
                                    <div className="card card3 mobileNoPadding" style={cards.card3}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">Today</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                <i
                                                    className={`fa ${utils.setCurrencyIcon(settings.currency)}`}
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
                                    <div className="card card6 mobileNoPadding" style={cards.card6}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">Most Spent On</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                &nbsp;
                                                {mostSpentCategory}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-7">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card7 mobileNoPadding" style={cards.card7}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">Most Spent Day</h3>
                                            <p style={cardStyleMobile} className="card-text">
                                                &nbsp;
                                                {mostSpentDay}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="slide-8">
                                <div className="col-sm-6 col-md-4 col-lg-3 nopadding mobileNoPadding">
                                    <div className="card card8 mobileNoPadding" style={cards.card8}>
                                        <div className="card-block">
                                            <h3 style={cardStyleMobile} className="card-title">Least Spent Day</h3>
                                            <p style={cardStyleMobile} className="card-text">
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
