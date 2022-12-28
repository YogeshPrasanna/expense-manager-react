import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";

import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/form.css";

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
})

class AddLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment(),
            day: moment().day,
            amount: "",
            loanType: "Given",
            person: "",
            reason: "",
            status: "Pending",
            uid: this.props.user.uid,
            dataSaved: false,
            validationAmount: null,
            validationPerson: null,
            validationReason: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        
        event.preventDefault();

        const { amount, person, reason } = this.state;
        const isInvalid = amount === "" || person === "" || reason === ""

        if (amount === "") {
            this.setState(
              byPropKey("validationAmount", "Please enter loan amount")
            );
        } else {
            this.setState(byPropKey("validationAmount", null));
        }

        if (person === "") {
            this.setState(
              byPropKey("validationPerson", "Please enter person name")
            );
        } else {
            this.setState(byPropKey("validationPerson", null));
        }

        if (reason === "") {
            this.setState(
              byPropKey("validationReason", "Please enter loan reason")
            );
        } else {
            this.setState(byPropKey("validationReason", null));
        }

        if(!isInvalid) {
            db.doCreateLoan(
                this.state.uid,
                moment(this.date).format('L'),
                this.state.amount,
                this.state.loanType,
                this.state.reason,
                this.state.person,
                moment(this.date).day(),
                this.state.status
            );
    
            // reset form once saved
            this.setState({
                date: moment(),
                day: moment().day,
                amount: "",
                loanType: "Given",
                reason: "",
                status: "Pending",
                uid: this.props.user.uid,
                dataSaved: true,
                error: null,
                validationDate: null,
                validationAmount: null,
                validationPerson: null,
                validationReason: null,
            });
        }
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handelDateChange(date) {
        this.setState({
            date: date
        });
    }

    render() {
        const { validationAmount, validationPerson, validationReason } = this.state;
        
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
                                dateFormat={"DD/MM/YYYY"}
                                name="date"
                                selected={this.state.date}
                                onChange={this.handelDateChange.bind(this)}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Amount</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <input
                                className={
                                    validationAmount
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                type="number"
                                name="amount"
                                min={0.1}
                                step={0.1}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.amount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationAmount ? (<div className="invalid-feedback err">{validationAmount}</div>) : ("")}
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
                                value={this.state.category}
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
                                className={
                                    validationPerson
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                type="text"
                                name="person"
                                maxLength={50}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.person}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationPerson ? (<div className="invalid-feedback err">{validationPerson}</div>) : ("")}
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
                                className={
                                    validationReason
                                      ? "form-control mb-0 px-3 py-2 is-invalid"
                                      : "form-control mb-0 px-3 py-2"
                                }
                                type="text"
                                name="reason"
                                rows={2}
                                maxLength={100}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.reason}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationReason ? (<div className="invalid-feedback err">{validationReason}</div>) : ("")}
                        </div>
                    </div>

                    <div className="text-right">
                        <button className="btn btn-primary" type="submit">
                            save
                        </button>
                    </div>
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

export default AddLoanForm;
