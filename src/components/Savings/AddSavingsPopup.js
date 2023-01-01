//import React from "react";
import React, { Component, useState } from "react";
import AddSavingForm from "./AddSavingForm";
import { Button, Modal } from "react-bootstrap";

const AddSavingsPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };

    const [open, setOpen] = useState(props.openModal);
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