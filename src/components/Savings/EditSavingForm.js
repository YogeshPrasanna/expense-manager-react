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

import { doc, updateDoc } from "firebase/firestore";

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
})


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
            displayColorPicker: false,
            validationGoal: null,
            validationSaving: null,
            validationSavingFor: null,
            validationComments: null
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

        const { goalAmount, savingAmount , date , savingFor , comments } = this.state;
        const isInvalid = goalAmount === "" || savingAmount === "" || date === "" || savingFor  === "" || comments === ""

        //set warning for empty goal amount value
        if (goalAmount === "" ) {
            this.setState(
              byPropKey("validationGoal", "Please Enter goal Amount.")
            );
        } else {
            this.setState(byPropKey("validationGoal", null));
        }

        //set warning for empty saving amount value
        if (savingAmount === "") {
            this.setState(
              byPropKey("validationSaving", "Please enter saving Amount.")
            );
        } else {
            this.setState(byPropKey("validationSaving", null));
        }

        //set warning for empty saving for
        if (savingFor === "" ) {
            this.setState(
              byPropKey("validationSavingFor", "Please Enter the purpose of your saving.")
            );
        } else {
            this.setState(byPropKey("validationSavingFor", null));
        }

        //set warning for empty comments
        if (comments === "") {
            this.setState(
              byPropKey("validationComments", "Please enter some comments or saving description.")
            );
        } else {
            this.setState(byPropKey("validationComments", null));
        }

        // firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savings.key}`).update({
            // date: this.state.date.format("MM/DD/YYYY"),
            // day: moment(this.state.date.format("MM/DD/YYYY")).day(),
            // goalAmount: this.state.goalAmount,
            // savingAmount: Math.ceil(this.state.savingAmount),
            // savingFor: this.state.savingFor,
            // comments: this.state.comments,
            // goalAchieved: this.state.goalAchieved,
            // cardColor: this.state.cardColor
        // });

        if (!isInvalid){

            updateDoc(doc(firebase.db, `savingsTable/${this.props.user.uid}/savings`, this.props.savings.key), {
                date: this.state.date.format("MM/DD/YYYY"),
                day: moment(this.state.date.format("MM/DD/YYYY")).day(),
                goalAmount: this.state.goalAmount,
                savingAmount: Math.ceil(this.state.savingAmount),
                savingFor: this.state.savingFor,
                comments: this.state.comments,
                goalAchieved: this.state.goalAchieved,
                cardColor: this.state.cardColor
            });

        }
        

        // if (goalAmount > 0 && savingAmount > 0 && date && savingFor){
        //     firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savings.key}`).update({
        //         date: this.state.date.format("MM/DD/YYYY"),
        //         day: moment(this.state.date.format("MM/DD/YYYY")).day(),
        //         goalAmount: this.state.goalAmount,
        //         savingAmount: Math.ceil(this.state.savingAmount),
        //         savingFor: this.state.savingFor,
        //         comments: this.state.comments,
        //         goalAchieved: this.state.goalAchieved,
        //         cardColor: this.state.cardColor
        //     });

        //     $("#closePopup").click();
        // }

        

        
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

            const { validationGoal, validationSaving , validationComments, validationSavingFor } = this.state;

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
                                dateFormat={"DD/MM/YYYY"} //change date to UK format
                                selected={this.state.date}
                                onChange={this.handelDateChange.bind(this)}
                                minDate={moment().toDate()} //exclude the past date , so user cannot select
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
                                className={
                                    validationGoal
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                min = {0.1}
                                step = {0.01}
                                type="number"
                                name="goalAmount"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.goalAmount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationGoal ? (<div className="invalid-feedback err">{validationGoal}</div>) : ("")} 
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Saving Amount</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className={
                                    validationSaving
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                min = {0.1}
                                step = {0.01}
                                type="number"
                                name="savingAmount"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.savingAmount}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationSaving ? (<div className="invalid-feedback err">{validationSaving}</div>) : ("")}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Saving For</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <input
                                className={
                                    validationSavingFor
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                maxLength={50}
                                type="text"
                                name="savingFor"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.savingFor}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationSavingFor ? (<div className="invalid-feedback err">{validationSavingFor}</div>) : ("")}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-xs-6 col-form-label">
                            <span>Comments</span>
                        </label>
                        <div className="col-sm-9 col-xs-6">
                            <textarea
                                className={
                                    validationComments
                                      ? "form-control mb-0 px-3 py-4 is-invalid"
                                      : "form-control mb-0 px-3 py-4"
                                }
                                type="text"
                                maxLength={50}
                                name="comments"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.comments}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                            {validationComments ? (<div className="invalid-feedback err">{validationComments}</div>) : ("")}
                        </div>
                    </div>
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

export default EditSavingForm;
