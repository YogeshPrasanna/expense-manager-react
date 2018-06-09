import React from "react";
import EditLoanForm from "./EditLoanForm";

const EditLoanPopup = props => {
    return (
        <div className="popup">
            <div className="popup_inner popup_inner_loan">
                <div className="addExpenseHeader"> Edit Loan </div>
                <EditLoanForm user={props.user} loan={props.loan} />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default EditLoanPopup;
