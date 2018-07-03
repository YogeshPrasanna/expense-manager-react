import React from "react";
import AddLoanForm from "./AddLoanForm";

const AddLoanPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };

    return (
        <div className="popup">
            <div className="popup_inner popup_inner_loan" style={nightModePopup}>
                <div className="addExpenseHeader"> Add loan </div>
                <AddLoanForm user={props.user} settings={props.settings} />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default AddLoanPopup;
