import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Cards = props => {
    let loans = props.loans;
    let currentUser = props.authUser;
    let loanToPay = 0;
    let loanToGet = 0;

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
        //loanType == "given" && status == "pending"
        loanToPay = utils.loanTakenOrGivenAmt(thisUsersLoans, "Taken");

        // You need to give
        // loanType == "taken" && status == "pending"
        loanToGet = utils.loanTakenOrGivenAmt(thisUsersLoans, "Given");
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="card card1">
                    <div className="card-block">
                        <h3 className="card-title">You need to repay</h3>
                        <p className="card-text">
                            <i className="fa fa-inr" aria-hidden="true" /> {loanToPay}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card card2">
                    <div className="card-block">
                        <h3 className="card-title">You need to get </h3>
                        <p className="card-text">
                            <i className="fa fa-inr" aria-hidden="true" /> {loanToGet}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
