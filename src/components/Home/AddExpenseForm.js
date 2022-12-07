import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";

import "react-datepicker/dist/react-datepicker.css";
// import "./styles/form.css";
import "../../assets/css/form.css";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      day: moment().day,
      expense: "",
      category: "Food",
      comments: "",
      uid: this.props.user.uid,
      dataSaved: false,
      validationExpense: null,
      validationComments: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handelDateChange = this.handelDateChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { expense, comments } = this.state;
    const isInvalid = expense === "" || comments === ""

    if (expense === "") {
      this.setState(
        byPropKey("validationExpense", "Please enter expense value")
      );
    } else {
      this.setState(byPropKey("validationExpense", null));
    }

    if (comments === "") {
      this.setState(
        byPropKey("validationComments", "Please enter your comments")
      );
    } else {
      this.setState(byPropKey("validationComments", null));
    }

    if (!isInvalid) {
      db.doCreateExpense(
        this.state.uid,
        moment(this.date).format('L'),
        // $(".date").val(),
        Math.ceil(this.state.expense * this.props.convertedCurrency),
        this.state.category,
        this.state.comments,
        moment(this.date).day(),
        this.state.status
      );
      // reset form once saved
      this.setState({
        date: moment(),
        day: moment().day,
        expense: "",
        category: "Food",
        comments: "",
        uid: this.props.user.uid,
        dataSaved: true,
        error: null,
        validationDate: null,
        validationExpense: null,
        validationComments: null,
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
    const { validationExpense, validationComments } = this.state;

    if (this.props.settings) {
      const inputNightMode = {
        background: "#2c2b2b",
        color: "#a9a0a0",
        border: "1px solid #9b8c8cc7",
      };

      const inputDayMode = { background: "#fff", color: "#495057" };

    //   const validationBox = {
    //     background: "rgba(0,0,0,0)",
    //     color: "#ffecb8",
    //     fontSize: "12px",
    //     width: "60%",
    //     position: "absolute",
    //     bottom: "15px",
    //     left: "15px",
    //   };

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
                  (this.props.settings.mode === "night"
                    ? "inputNightMode"
                    : "inputDayMode")
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
              <span>Expense</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <input
                className={
                    validationExpense
                      ? "form-control mb-0 px-3 py-2 is-invalid"
                      : "form-control mb-0 px-3 py-2"
                }
                //autoFocus
                // required
                type="number"
                name="expense"
                min={1}
                onChange={this.handleChange.bind(this)}
                value={this.state.expense}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              />
              {validationExpense ? (
                <div className="invalid-feedback err">{validationExpense}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Category</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <select
                className="form-control"
                name="category"
                value={this.state.category}
                onChange={this.handleChange.bind(this)}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              >
                <option value="Food">
                  {this.props.settings.editedCategories["Food"]
                    ? this.props.settings.editedCategories["Food"]
                    : "Food"}
                </option>
                <option value="Automobile">
                  {this.props.settings.editedCategories["Automobile"]
                    ? this.props.settings.editedCategories["Automobile"]
                    : "Automobile"}
                </option>
                <option value="Entertainment">
                  {this.props.settings.editedCategories["Entertainment"]
                    ? this.props.settings.editedCategories["Entertainment"]
                    : "Entertainment"}
                </option>
                <option value="Clothing">
                  {this.props.settings.editedCategories["Clothing"]
                    ? this.props.settings.editedCategories["Clothing"]
                    : "Clothing"}
                </option>
                <option value="Healthcare">
                  {this.props.settings.editedCategories["Healthcare"]
                    ? this.props.settings.editedCategories["Healthcare"]
                    : "Healthcare"}
                </option>
                <option value="Travel">
                  {this.props.settings.editedCategories["Travel"]
                    ? this.props.settings.editedCategories["Travel"]
                    : "Travel"}
                </option>
                <option value="Shopping">
                  {this.props.settings.editedCategories["Shopping"]
                    ? this.props.settings.editedCategories["Shopping"]
                    : "Shopping"}
                </option>
                <option value="Personal Care">
                  {this.props.settings.editedCategories["Personal Care"]
                    ? this.props.settings.editedCategories["Personal Care"]
                    : "Personal Care"}
                </option>
                <option value="Investment">
                  {this.props.settings.editedCategories["Investment"]
                    ? this.props.settings.editedCategories["Investment"]
                    : "Investment"}
                </option>
                <option value="Gifts & Donations">
                  {this.props.settings.editedCategories["Gifts & Donations"]
                    ? this.props.settings.editedCategories["Gifts & Donations"]
                    : "Gifts & Donations"}
                </option>
                <option value="Bills & Utilities">
                  {this.props.settings.editedCategories["Bills & Utilities"]
                    ? this.props.settings.editedCategories["Bills & Utilities"]
                    : "Bills & Utilities"}
                </option>
                <option value="Others">
                  {this.props.settings.editedCategories["Others"]
                    ? this.props.settings.editedCategories["Others"]
                    : "Others"}
                </option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Comments</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <textarea
                className={
                    validationComments
                      ? "form-control mb-0 px-3 py-2 is-invalid"
                      : "form-control mb-0 px-3 py-2"
                }
                type="text"
                maxLength={50}
                name="comments"
                onChange={this.handleChange.bind(this)}
                value={this.state.comments}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              />
              {validationComments ? (
                <div className="invalid-feedback err">{validationComments}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* {this.state.dataSaved ? (
            <span className="bg-success success-msg">
              {" "}
              Data saved successfully
            </span>
          ) : (
            <span />
          )} */}
          
          {this.state.expense > 0 && this.state.date && this.state.category ? (
            <div className="text-right">
            <button className="btn btn-primary" type="submit">
                Save
            </button>
        </div>
          ) : (
            <div>
              {/* <div style={validationBox}>
                                    <div> Expense : should be greater than 0 </div>
                                    <div> Date : should be selected </div>
                                </div> */}
              
              <div className="text-right">
                        <button className="btn btn-primary" type="submit">
                            Save
                        </button>
                    </div>
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

export default AddExpenseForm;
