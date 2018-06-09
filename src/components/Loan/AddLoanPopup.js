import React from "react";
import AddLoanForm from "./AddLoanForm";

const AddLoanPopup = props => {
    return (
        <div className="popup">
            <div className="popup_inner popup_inner_loan">
                <div className="addExpenseHeader"> Add loan </div>
                <AddLoanForm user={props.user} />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default AddLoanPopup;
