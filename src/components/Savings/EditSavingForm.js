import React, { Component } from "react";

import DatePicker from "react-datepicker";
import { SketchPicker } from "react-color";
import moment from "moment";
import $ from "jquery";

import Loader from "../Common/Loader";

import * as db from "../../firebase/db";
import * as firebase from "../../firebase/firebase";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/form.css";

class EditSavingForm extends Component {
    constructor(props) {
        super(props);

        const savings = this.props.savings;

        this.state = {
            date: moment(savings.value.date),
            day: moment(savings.value.date).day,
            goalAmount: savings.value.goalAmount,
            savingAmount: savings.value.savingAmount,
            savingFor: savings.value.savingFor,
            comments: savings.value.comments,
            goalAchieved: savings.value.goalAchieved,
            cardColor: savings.value.cardColor,
            uid: this.props.user.uid,
            dataSaved: false,
            displayColorPicker: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savings.key}`).update({
            date: this.state.date.format("MM/DD/YYYY"),
            day: moment(this.state.date.format("MM/DD/YYYY")).day(),
            goalAmount: this.state.goalAmount,
            savingAmount: Math.ceil(this.state.savingAmount),
            savingFor: this.state.savingFor,
            comments: this.state.comments,
            goalAchieved: this.state.goalAchieved,
            cardColor: this.state.cardColor
        });

        $("#closePopup").click();
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    handleClose() {
        this.setState({ displayColorPicker: false });
    }

    // handleChange = (color) => {
    //     this.setState({ color: color.rgb })
    // };

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

    handleColorChange(color) {
        this.setState({ cardColor: color.hex });
    }

    render() {
        if (this.props.settings) {
            const inputNightMode = {
                background: "#2c2b2b",
                color: "#a9a0a0",
                border: "1px solid #9b8c8cc7"
            };

            const inputDayMode = { background: "#fff", color: "#495057" };

            const validationBox = {
                background: "rgba(0,0,0,0)",
                color: "#ffecb8",
                fontSize: "12px",
                width: "60%",
                position: "absolute",
                bottom: "15px",
                left: "15px"
            };

            const color = {
                width: "36px",
                height: "14px",
                borderRadius: "2px",
                background: `${this.state.cardColor}`
            };
            const swatch = {
                padding: "5px",
                background: "#fff",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer"
            };
            const popover = {
                position: "absolute",
                zIndex: "2"
            };
            const cover = {
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
            };

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Target Date</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
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
                        <label htmlFor="" className="col-sm-3 col-xs-6 col-form-label">
                            <span>Card Color</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            {/* <SketchPicker color={this.state.cardColor} onChangeComplete={this.handleChangeComplete} /> */}
                            <div style={swatch} onClick={this.handleClick}>
                                <div style={color} />
                            </div>
                            {this.state.displayColorPicker ? (
                                <div style={popover}>
                                    <div style={cover} onClick={this.handleClose} />
                                    <SketchPicker
                                        name="cardColor"
                                        color={this.state.cardColor}
                                        onChange={this.handleColorChange}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Goal Amount</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="number"
                                name="goalAmount"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.goalAmount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Saving Amount</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="number"
                                name="savingAmount"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.savingAmount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Saving For</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="text"
                                name="savingFor"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.savingFor}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Comments</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <textarea
                                className="form-control"
                                type="text"
                                required
                                name="comments"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.comments}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Goal Achieved {this.state.goalAchieved} </span>
                        </label>
                        <div className="col-sm-5 col-xs-6 switch-field" onChange={this.handleChange.bind(this)}>
                            <input
                                type="radio"
                                name="goalAchieved"
                                value="yes"
                                defaultChecked={this.state.goalAchieved === "yes"}
                                id="switch_left"
                            />
                            <label for="switch_left">Achieved</label>
                            <input
                                type="radio"
                                name="goalAchieved"
                                value="no"
                                defaultChecked={this.state.goalAchieved === "no"}
                                id="switch_right"
                            />
                            <label for="switch_right">Not Yet</label>{" "}
                        </div>
                    </div>

                    {this.state.dataSaved ? (
                        <span className="bg-success success-msg"> Data saved successfully</span>
                    ) : (
                        <span />
                    )}
                    {this.state.goalAmount > 0 && this.state.date && this.state.savingFor ? (
                        <button className="btn btn-primary float-right" type="submit">
                            save
                        </button>
                    ) : (
                        <div>
                            <div style={validationBox}>
                                <div> Saving : should be greater than 0 </div>
                                <div> Target Date : should be selected </div>
                            </div>
                            <button className="btn btn-primary float-right" disabled type="submit">
                                save
                            </button>
                        </div>
                    )}
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

export default EditSavingForm;
