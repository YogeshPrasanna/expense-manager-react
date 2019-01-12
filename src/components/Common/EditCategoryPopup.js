import React from "react";
import EditCategoryForm from "./EditCategoryForm";

const EditCategoryPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };
    return (
        <div className="popup">
            <div className="popup_inner" style={nightModePopup}>
                <div className="addExpenseHeader"> Edit expense </div>
                <EditCategoryForm
                    user={props.user}
                    category={props.category}
                    settings={props.settings}
                    convertedCurrency={props.convertedCurrency}
                    categories={props.categories}
                />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default EditCategoryPopup;
