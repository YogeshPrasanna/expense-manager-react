import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import * as utils from "../Util";

import moment from "moment";

import EditExpensePopup from "./EditExpensePopup";
import { deleteDoc, doc } from "firebase/firestore";


class ExpenseRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditPopup: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the expense
    handleClick(e) {
        var message = "Once deleted you cannot get back this record , are you sure you want to delete";
        if (window.confirm(message)) {
            //firebase.db.ref(`expenseTable/${this.props.user.uid}/${this.props.expenseId}`).remove();
            deleteDoc(doc(firebase.db, `expenseTable/${this.props.user.uid}/expenses`, this.props.expenseId));
        }
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    render() {
        const conditionForDay = this.props.expense.value.day || moment(this.props.expense.value.date).day();

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

        const lessFont = { fontSize: "15px", float: "right", marginTop: "5px", color: "rgba(255,255,255,.45)" };
        let catName = this.props.settings.editedCategories[this.props.expense.value.category] ? this.props.settings.editedCategories[this.props.expense.value.category] : this.props.expense.value.category;
        return (
            <tr
                key={this.props.expenseId}
                id={this.props.expenseId}
                style={utils.categoryName(this.props.expense.value.category, "row")}
            >
                <td data-th="No">
                    {this.props.num + 1}
                    {this.state.showEditPopup ? (
                        <EditExpensePopup
                            user={this.props.user}
                            expense={this.props.expense}
                            closePopup={this.toggleEditPopup.bind(this)}
                            settings={this.props.settings}
                            convertedCurrency={this.props.convertedCurrency}
                        />
                    ) : null}
                </td>
                <td data-th="Date">
                    {this.props.expense.value.date} <span className="expense-day"> {day || "Sunday"}</span>
                </td>
                <td data-th="Expense">
                    <i className={`fa ${utils.setCurrencyIcon(this.props.settings.currency)}`} aria-hidden="true" />{" "}
                    {this.props.expense.value.expense.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                </td>
                <td data-th="Category">
                    {catName}{" "}
                    <i
                        className={`fa fa-${utils.categoryIcon(this.props.expense.value.category)}`}
                        style={lessFont}
                        aria-hidden="true"
                    />
                </td>
                <td data-th="Comments">{this.props.expense.value.comments} </td>
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

export default ExpenseRow;
