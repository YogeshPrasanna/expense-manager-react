import React, { Component, useState } from "react";

import ExpenseTable from "./ExpenseTable.js";
import AddExpensePopup from "./AddExpensePopup";
import Cards from "./Cards";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

import MobileExpenseTable from "./MobileExpenseTable";

import * as analytics from "./../../analytics/analytics";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AddExpenseForm from "./AddExpenseForm";

// export const NewAddExpenseModal = (props) => {
//   const [open, setOpen] = useState(props.openModal);

//   console.log(open);

//   return (
//     <>
//       <Modal show={open} onHide={props.closePopup}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <AddExpenseForm
//             user={props.user}
//             settings={props.settings}
//             convertedCurrency={props.convertedCurrency}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={props.closePopup}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={props.closePopup}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      convertedCurrency: null,
      newModal: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  toggleNewModal() {
    this.setState({
      newModal: !this.state.newModal,
    });
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();

    // if travel mode then convert currency else set to 1
    if (this.props.settings && this.props.settings.travelMode === "on") {
      function returnCur(cur) {
        switch (cur) {
          case "Indian Rupees":
            return "INR";
          case "US Dollars":
            return "USD";
          case "Pounds":
            return "EUR";
          case "Euro":
            return "EUR";
          case "Yen":
            return "YER";
          default:
            return "INR";
        }
      }

      const fromcur = returnCur(this.props.settings.fromCurrency);
      const tocur = returnCur(this.props.settings.currency);

      fetch(
        `https://free.currencyconverterapi.com/api/v5/convert?q=${fromcur}_${tocur}&compact=y&apiKey=${process.env.REACT_APP_FREE_CURRENCY_CONVERTER_API_KEY}`
      )
        .then((resp) => resp.json()) // Transform the data into json
        .then((data) => {
          this.setState({ convertedCurrency: Object.values(data)[0].val });
        })
        .catch(() => {
          alert(
            "Some Problem with the currency converter api. Values will Fallback to default currency"
          );
          this.setState({ convertedCurrency: 1 });
        });
    } else {
      this.setState({ convertedCurrency: 1 });
    }
  }

  render() {
    const styleFromSettings = {
      fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
      backgroundColor: this.props.settings
        ? this.props.settings.mode === "night"
          ? "#484842"
          : "auto"
        : "auto",
      minHeight: "91vh",
    };

    if (this.props.settings && this.props.cards) {
      return (
        <div>
          <div className="col-sm-12 mobileNoPadding" style={styleFromSettings}>
            <Cards
              expenses={this.props.expenses}
              authUser={this.props.user}
              settings={this.props.settings}
              cards={this.props.cards}
            />

            <GenerateExcel
              expenses={this.props.expenses}
              authUser={this.props.user}
              settings={this.props.settings}
            />
            {this.state.convertedCurrency ? (
              window.screen.width > 720 ? (
                <ExpenseTable
                  expenses={this.props.expenses}
                  authUser={this.props.user}
                  settings={this.props.settings}
                  convertedCurrency={this.state.convertedCurrency}
                />
              ) : (
                <MobileExpenseTable
                  expenses={this.props.expenses}
                  authUser={this.props.user}
                  settings={this.props.settings}
                  convertedCurrency={this.state.convertedCurrency}
                />
              )
            ) : (
              <Loader />
            )}
          </div>
          {/* <button
            className="addexpense-btn"
            onClick={this.toggleNewModal.bind(this)}
          >
            <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
          </button> */}

          {/* {this.state.newModal ? (
            this.state.convertedCurrency ? (
              <NewAddExpenseModal
                user={this.props.user}
                openModal={this.state.newModal}
                closePopup={this.toggleNewModal.bind(this)}
                settings={this.props.settings}
                convertedCurrency={this.state.convertedCurrency}
              />
            ) : (
              <div style={styleFromSettings}>
                <Loader />
              </div>
            )
          ) : null} */}

          {/* Open Form */}
          <button
            className="addexpense-btn"
            onClick={this.togglePopup.bind(this)}
            id="addExpense"
          >
            <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
          </button>
          {this.state.showPopup ? (
            this.state.convertedCurrency ? (
              <AddExpensePopup
                user={this.props.user}
                closePopup={this.togglePopup.bind(this)}
                settings={this.props.settings}
                convertedCurrency={this.state.convertedCurrency}
              />
            ) : (
              <div style={styleFromSettings}>
                <Loader />
              </div>
            )
          ) : null}
        </div>
      );
    } else {
      return (
        <div style={styleFromSettings}>
          <Loader />
        </div>
      );
    }
  }
}

export default HomePage;
