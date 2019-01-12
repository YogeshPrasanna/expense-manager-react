import React from "react";
import AddCategoryForm from "./AddCategoryForm";

const AddCategoryPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };

    return (
        <div className="popup">
            <div className="popup_inner" style={nightModePopup}>
                <div className="addExpenseHeader"> Add an category </div>
                <AddCategoryForm
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

export default AddCategoryPopup;
