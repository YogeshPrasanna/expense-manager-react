import React, { Component, useState } from "react";
import DefaultExpenseModal from "./DefaultExpenseModal";

// Class Example
export default class ExampleModalClass extends Component {
  constructor(props) {
    super(props);

    // Initiate Show Popup State
    this.state = {
      showPopup: false,
      //   Can also intiate multiple popup/modal for example:
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
    };
  }

  //   Every Modal need a function to toggle the modal
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <>
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={this.togglePopup.bind(this)}
              >
                Open Modal
              </button>
            </div>
          </div>
        </div>

        {/* Need to send the state and the function to toggle the modal */}
        {this.state.showPopup ? (
          <DefaultExpenseModal
            openModal={this.state.showPopup}
            togglePopout={this.togglePopup.bind(this)}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

// Functional Example
export function ExampleModalFunc() {
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={togglePopup.bind(this)}
            >
              Open Modal
            </button>
          </div>
        </div>
      </div>

      {showPopup ? (
        <DefaultExpenseModal
          openModal={showPopup}
          togglePopout={togglePopup.bind(this)}
        />
      ) : (
        ""
      )}
    </>
  );
}
