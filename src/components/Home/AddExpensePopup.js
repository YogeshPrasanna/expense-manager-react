import React from "react";
import AddExpenseForm from "./AddExpenseForm";

const AddExpensePopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };

    return (
        <div className="popup">
            <div className="popup_inner" style={nightModePopup}>
                <div className="addExpenseHeader"> Add an expense </div>
                <AddExpenseForm
                    user={props.user}
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

export default AddExpensePopup;
