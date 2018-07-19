import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./../Common/Loader";

import * as firebase from "../../firebase/firebase";

import "react-datepicker/dist/react-datepicker.css";
import "../Home/styles/form.css";

class EditLoanForm extends Component {
    constructor(props) {
        super(props);

        const loan = props.loan;

        this.state = {
            date: moment(loan.value.date),
            day: moment(loan.value.date).day,
            amount: loan.value.amount,
            loanType: loan.value.loanType,
            person: loan.value.person,
            reason: loan.value.reason,
            status: loan.value.status,
            uid: this.props.user.uid,
            dataSaved: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        firebase.db.ref(`loanTable/${this.props.user.uid}/${this.props.loan.key}`).update({
            date: this.state.date.format("MM/DD/YYYY"),
            day: moment(this.state.date.format("MM/DD/YYYY")).day(),
            amount: this.state.amount,
            loanType: this.state.loanType,
            person: this.state.person,
            reason: this.state.reason,
            status: this.state.status
        });

        $("#closePopup").click();
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handelDateChange(date) {
        this.setState({
            date: date,
            day: date.day()
        });
    }

    render() {
        if (this.props.settings) {
            const inputNightMode = { background: "#2c2b2b", color: "#a9a0a0", border: "1px solid #9b8c8cc7" };

            const inputDayMode = { background: "#fff", color: "#495057" };

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Date</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <DatePicker
                                className={
                                    "form-control date " +
                                    (this.props.settings.mode === "night" ? "inputNightMode" : "inputDayMode")
                                }
                                name="date"
                                selected={this.state.date}
                                onChange={this.handelDateChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Amount</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="number"
                                name="amount"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.amount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Loan Type</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <select
                                className="form-control"
                                name="loanType"
                                value={this.state.loanType}
                                onChange={this.handleChange.bind(this)}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            >
                                <option value="Given">Given</option>
                                <option value="Taken">Taken</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Person</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="text"
                                name="person"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.person}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Status</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <select
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.handleChange.bind(this)}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Settled">Settled</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Reason</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <textarea
                                className="form-control"
                                type="text"
                                required
                                name="reason"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.reason}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>

                    {this.state.dataSaved ? (
                        <span className="bg-success success-msg"> You did not update anything</span>
                    ) : (
                        <span />
                    )}
                    <button className="btn btn-primary float-right" type="submit">
                        save
                    </button>
                </form>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default EditLoanForm;
