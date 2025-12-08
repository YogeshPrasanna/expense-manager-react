import { React, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { Button, Modal } from "react-bootstrap";

const AddExpensePopup = (props) => {
  const nightModePopup = {
    backgroundColor: props.settings
      ? props.settings.mode === "night"
        ? "#857861"
        : "#fff"
      : "#fff",
  };

  const [open, setOpen] = useState(props.openModal);
  console.log(open);

  return (
    <Modal show={open} onHide={props.togglePopout}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddExpenseForm user={props.user} settings={props.settings} />
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

export default AddExpensePopup;
