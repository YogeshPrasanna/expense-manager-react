import React, { Component, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Loader from "./../Common/Loader";

const DefaultExpenseModal = (props) => {
  const [open, setOpen] = useState(props.openModal);

  console.log(open);

  return (
    <>
      <Modal show={open} onHide={props.togglePopout}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Put Your Form Component Here */}
      
          {/* Component Form */}
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
    </>
  );
};

export default DefaultExpenseModal;
