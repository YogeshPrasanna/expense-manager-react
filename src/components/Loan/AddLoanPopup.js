import { React, useState } from "react";
import AddLoanForm from "./AddLoanForm";
import { Button, Modal } from "react-bootstrap";

const AddLoanPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };
    const [open, setOpen] = useState(props.openModal);
    console.log(open)

    return (
        // <div className="popup">
        //     <div className="popup_inner popup_inner_loan" style={nightModePopup}>
        //         <div className="addExpenseHeader"> Add loan </div>
        //         <AddLoanForm user={props.user} settings={props.settings} />
        //         <button id="closePopup" onClick={props.closePopup}>
        //             {" "}
        //             X{" "}
        //         </button>
        //     </div>
        // </div>
        <Modal show={open} onHide={props.togglePopout}>
        <Modal.Header closeButton>
          <Modal.Title>Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddLoanForm user={props.user} settings={props.settings} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.togglePopout}>
            Close
          </Button>
          <Button variant="primary" onClick={props.togglePopout}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default AddLoanPopup;
