import React from "react";
import LoanRow from "./LoanRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Loans = props => {
    let loans = props.loans;
    let currentUser = props.authUser;

    if (!loans || !currentUser) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
        );
    }

    if (loans && currentUser) {
        let eachExpense = utils.eachExpense(loans);
        let thisUsersLoan = utils.currentUsersExpenses(eachExpense, currentUser);

        console.log(" This users loans : ", thisUsersLoan);

        if (thisUsersLoan.length) {
            return thisUsersLoan.map(function(elem, i) {
                return <LoanRow user={props.authUser} loan={elem} num={i} key={i} loanId={thisUsersLoan[i].key} />;
            });
        } else {
            return (
                <tr>
                    <td>
                        <div className="alert alert-info" role="alert">
                            Good that you haven't made any loans / given any loans , add a loan by clicking on the +
                            Button on the bottom right corner of this page
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default Loans;
