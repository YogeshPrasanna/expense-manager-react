import React from "react";
import LoanRow from "./LoanRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const Loans = props => {
    const loans = props.loans;
    const currentUser = props.authUser;
    const settings = props.settings;

    if (!loans || !currentUser || !settings) {
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

    if (loans && currentUser && settings) {
        const eachExpense = utils.eachExpense(loans);
        const thisUsersLoan = utils.currentUsersExpenses(eachExpense, currentUser);

        if (thisUsersLoan.length) {
            return thisUsersLoan.map(function (elem, i) {
                return (
                    <LoanRow
                        user={props.authUser}
                        loan={elem}
                        num={i}
                        key={i}
                        loanId={thisUsersLoan[i].key}
                        settings={props.settings}
                    />
                );
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
