import React from "react";
import AddLoanForm from "./AddLoanForm";

const AddLoanPopup = props => {
    return (
        <div className="popup">
            <div className="popup_inner">
                <div className="addExpenseHeader"> Add an expense </div>
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
