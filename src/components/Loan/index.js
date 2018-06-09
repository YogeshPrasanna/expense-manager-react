import React, { Component } from "react";
import AddLoanPopup from "./AddLoanPopup";

class LoanPage extends Component {
    constructor(props) {
        super(props);

        this.state = { showPopup: false };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>This Feature is under development ..</h2>
                    </div>
                    <div className="col-sm-6" />
                </div>

                {this.props.expenses ? (
                    <button className="addloan-btn" onClick={this.togglePopup.bind(this)} id="addExpense">
                        <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                    </button>
                ) : null}

                {this.state.showPopup ? (
                    <AddLoanPopup user={this.props.user} closePopup={this.togglePopup.bind(this)} />
                ) : null}
            </div>
        );
    }
}

export default LoanPage;
