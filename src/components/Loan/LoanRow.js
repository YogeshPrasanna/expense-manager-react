import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import moment from "moment";
import * as utils from "./../Util";

import EditLoanPopup from "./EditLoanPopup";

class LoanRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditPopup: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the loan
    handleClick(e) {
        firebase.db.ref(`loanTable/${this.props.user.uid}/${this.props.loanId}`).remove();
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    render() {
        const conditionForDay = this.props.loan.value.day || moment(this.props.loan.value.date).day();

        if (conditionForDay) {
            var getDay = conditionForDay;
            var day;

            switch (getDay) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
                    break;
                default:
                    day = "sunday";
            }
        }

        const loanStatusStyle = {
            borderLeft: this.props.loan.value.status === "Pending" ? "25px solid #FFB74D" : "25px solid #689F38",
            backgroundImage:
                this.props.loan.value.status === "Pending"
                    ? "none"
                    : "repeating-linear-gradient(145deg, transparent, transparent 1px, rgba(238, 238, 238, 0.198039) 3px, rgba(238, 238, 238, 0.198039) 5px)"
        };

        return (
            <tr key={this.props.loanId} id={this.props.loanId} style={loanStatusStyle}>
                <td data-th="No">
                    {this.props.num + 1}
                    {this.state.showEditPopup ? (
                        <EditLoanPopup
                            user={this.props.user}
                            loan={this.props.loan}
                            closePopup={this.toggleEditPopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null}
                </td>
                <td data-th="Date">
                    {this.props.loan.value.date} <span className="expense-day"> {day || "Sunday"}</span>
                </td>
                <td data-th="Amount">
                    <i className={`fa ${utils.setCurrencyIcon(this.props.settings.currency)}`} aria-hidden="true" />{" "}
                    {this.props.loan.value.amount}
                </td>
                <td data-th="loanType">
                    {this.props.loan.value.loanType}
                    {this.props.loan.value.loanType === "Given" ? (
                        <i className="fa fa-arrow-right loan-given-taken loan-given" />
                    ) : (
                        <i className="fa fa-arrow-left loan-given-taken loan-taken" />
                    )}
                </td>
                <td data-th="person">{this.props.loan.value.person}</td>
                <td data-th="reason">{this.props.loan.value.reason}</td>
                <td data-th="status">
                    {this.props.loan.value.status}
                    {this.props.loan.value.status === "Settled" ? (
                        <i className="fa fa-check loan-status-icon loan-settled" />
                    ) : (
                        <i className="fa fa-clock-o loan-status-icon loan-pending" />
                    )}
                </td>
                <td data-th="Edit">
                    <button className="edit-btn" onClick={this.toggleEditPopup.bind(this)}>
                        <i className="fa fa-edit" aria-hidden="true" /> edit
                    </button>
                </td>
                <td data-th="Delete">
                    <button className="delete-btn" onClick={this.handleClick}>
                        <i className="fa fa-trash-o" aria-hidden="true" /> delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default LoanRow;
