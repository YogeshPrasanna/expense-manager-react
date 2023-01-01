import { React, useState } from "react";
import AddLoanForm from "./AddLoanForm";
import { Button, Modal } from "react-bootstrap";

const AddLoanPopup = (props) => {
  const [open, setOpen] = useState(props.openModal);

  return (
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
