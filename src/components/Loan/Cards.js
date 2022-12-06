import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Cards = props => {
    const loans = props.loans;
    const currentUser = props.authUser;
    const settings = props.settings;
    const cards = props.cards;
    let totalPending = 0;
    let totalSettled = 0;
    let highestTaken = 0;

    const cardStyleDesktop = {
        "color": "#3B0918",
    }

    const cardStyleMobile = {
        "color": "#2C3034",
    }


    if (!loans && !currentUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (loans && currentUser) {
        const eachExpense = utils.eachExpense(loans);
        const thisUsersLoans = utils.currentUsersExpenses(eachExpense, currentUser);

        // You need to get
        totalPending = utils.loanPendingOrSettled(thisUsersLoans, "Pending");

        // You need to give
        totalSettled = utils.loanPendingOrSettled(thisUsersLoans, "Settled");

        // Highest taken loan
        highestTaken = utils.highestTakenAndPendingLoan(thisUsersLoans);
    }

    return (
        <div className="row mobileNoPadding">
            <div className="col-sm-12 mobileNoPadding">
                <div className="card card1 mobileNoPadding" style={props.cards.card1}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title">Total <b>pending</b></h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {totalPending.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 mobileNoPadding">
                <div className="card card2 mobileNoPadding" style={props.cards.card2}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title">Total <b>settled</b></h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {totalSettled.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 mobileNoPadding">
                <div className="card card9 mobileNoPadding" style={props.cards.card9}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title"><b>Highest taken</b> loan</h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {highestTaken.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
