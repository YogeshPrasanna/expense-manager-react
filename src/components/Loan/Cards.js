import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Cards = props => {
    const loans = props.loans;
    const currentUser = props.authUser;
    const settings = props.settings;
    const cards = props.cards;
    let loanToPay = 0;
    let loanToGet = 0;

    const cardStyleDesktop = {
        "color": "white",
        "mixBlendMode": "difference"
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
        loanToPay = utils.loanTakenOrGivenAmt(thisUsersLoans, "Taken");

        // You need to give
        loanToGet = utils.loanTakenOrGivenAmt(thisUsersLoans, "Given");
    }

    return (
        <div className="row mobileNoPadding">
            <div className="col-sm-3 mobileNoPadding">
                <div className="card card1 mobileNoPadding" style={props.cards.card1}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title">You need to repay</h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {loanToPay.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 mobileNoPadding">
                <div className="card card2 mobileNoPadding" style={props.cards.card2}>
                    <div className="card-block">
                        <h3 style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-title">You need to get </h3>
                        <p style={window.screen.width > 720 ? cardStyleDesktop : cardStyleMobile} className="card-text">
                            <i className={`fa ${utils.setCurrencyIcon(settings.currency)}`} aria-hidden="true" />{" "}
                            {loanToGet.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
