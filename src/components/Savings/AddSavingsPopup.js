import React from "react";
import AddSavingForm from "./AddSavingForm";

const AddSavingsPopup = (props) => {
  const nightModePopup = {
    backgroundColor: props.settings
      ? props.settings.mode === "night"
        ? "#857861"
        : "#fff"
      : "#fff",
  };

  return (
    <div className="popup">
      <div className="popup_inner_saving" style={nightModePopup}>
        <div className="addExpenseHeader"> What are you saving for ? </div>
        <AddSavingForm
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

export default AddSavingsPopup;
