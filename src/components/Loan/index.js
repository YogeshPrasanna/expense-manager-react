import React, { Component } from "react";
import AddLoanPopup from "./AddLoanPopup";
import LoanTable from "./LoanTable";

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
                    <div className="col-sm-12">
                        <LoanTable loans={this.props.loans} authUser={this.props.user} />
                    </div>
                </div>

                {this.props.loans ? (
                    <button className="addloan-btn" onClick={this.togglePopup.bind(this)} id="addLoan">
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
