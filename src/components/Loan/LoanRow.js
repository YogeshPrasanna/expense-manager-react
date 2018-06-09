import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import moment from "moment";

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
        firebase.db.ref(`loans/${this.props.loanId}`).remove();
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

        const loanStatusStyle = { background: this.props.loan.value.status === "Pending" ? "#FFB74D" : "#689F38" };

        return (
            <tr key={this.props.loanId} id={this.props.loanId}>
                <td data-th="No">
                    {this.props.num + 1}
                    {this.state.showEditPopup ? (
                        <EditLoanPopup
                            user={this.props.user}
                            loan={this.props.loan}
                            closePopup={this.toggleEditPopup.bind(this)}
                        />
                    ) : null}
                </td>
                <td data-th="Date">
                    {this.props.loan.value.date} <span className="expense-day"> {day || "Sunday"}</span>
                </td>
                <td data-th="Amount">
                    <i className="fa fa-inr" aria-hidden="true" /> {this.props.loan.value.amount}
                </td>
                <td data-th="loanType">{this.props.loan.value.loanType}</td>
                <td data-th="person">{this.props.loan.value.person}</td>
                <td data-th="reason">{this.props.loan.value.reason}</td>
                <td data-th="status" style={loanStatusStyle}>
                    {this.props.loan.value.status}
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
