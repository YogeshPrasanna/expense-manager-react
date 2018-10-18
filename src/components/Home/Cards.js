import React, { Component } from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

class ContentSlider extends Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 0 };
    }
    setActiveItem(index) {
        this.setState({ activeItem: index });
    }
    render() {
        var childrenCount = React.Children.count(this.props.children);
        var newChildren = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, { className: "simple-slider__slider-item" });
        });
        var innerStyle = {
            width: childrenCount * 200 + "px",
            left: this.state.activeItem * 200 * -1 + "px"
        };
        return (
            <div>
                <div className="simple-slider__slider-outer">
                    <div className="simple-slider__slider-inner" style={innerStyle}>
                        {newChildren}
                    </div>
                </div>
                <div className="pager">
                    {this.props.children.map(function (item, index) {
                        return <button onClick={this.setActiveItem.bind(this, index)}>{index}</button>;
                    }, this)}
                </div>
            </div>
        );
    }
}

const Cards = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let totalExpenses = 0;
    let totalExpensesThisMonth = 0;
    let totalExpensesToday = 0;
    let totalExpensesThisWeek = 0;

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
    }

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
                </div>
            );
        } else {
            return (
                <div>
                    {/* <ContentSlider>
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
                    </ContentSlider> */}
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
                            <div id="slide-3">
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
                            <div id="slide-4">
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
