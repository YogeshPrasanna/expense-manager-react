import React from "react";
import EditLoanForm from "./EditLoanForm";

const EditLoanPopup = (props) => {
  const nightModePopup = {
    backgroundColor: props.settings
      ? props.settings.mode === "night"
        ? "#857861"
        : "#fff"
      : "#fff",
  };

  return (
    <div className="popup">
      <div className="popup_inner popup_inner_loan" style={nightModePopup}>
        <div className="addExpenseHeader"> Edit Loan </div>
        <EditLoanForm
          user={props.user}
          loan={props.loan}
          settings={props.settings}
        />
        <button id="closePopup" onClick={props.closePopup}>
          {" "}
          X{" "}
        </button>
      </div>
    </div>
  );
};

export default EditLoanPopup;
