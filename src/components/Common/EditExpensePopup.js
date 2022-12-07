import React from "react";
import EditExpenseForm from "./EditExpenseForm";

const EditExpensePopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };
    return (
        <div className="popup">
            <div className="popup_inner" style={nightModePopup}>
                <div className="addExpenseHeader"> Edit Expense </div>
                <EditExpenseForm
                    user={props.user}
                    expense={props.expense}
                    settings={props.settings}
                    convertedCurrency={props.convertedCurrency}
                />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default EditExpensePopup;
