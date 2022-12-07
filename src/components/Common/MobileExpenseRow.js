import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import * as utils from "../Util";
import moment from "moment";

import EditExpensePopup from "./EditExpensePopup";

class MobileExpenseRow extends Component {
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
            firebase.db.ref(`expenseTable/${this.props.user.uid}/${this.props.expenseId}`).remove();
        }
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    render() {
        const lessFont = { fontSize: "15px", paddingRight: "10px", color: "rgba(255,255,255,.45)" };
        let catName = this.props.settings.editedCategories[this.props.expense.value.category] ? this.props.settings.editedCategories[this.props.expense.value.category] : this.props.expense.value.category;

        const nightModeTitle = {
            background: this.props.settings ? (this.props.settings.mode === "night" ? "#2C3034" : "#fff") : "#fff",
            color: this.props.settings ? (this.props.settings.mode === "night" ? "#BBBBBB" : "#212529") : "#212529",
            borderBottom: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "1px solid #343a40"
                    : "1px solid orange"
                : "1px solid orange"
        };

        return (
            <div className="option">
                {this.state.showEditPopup ? (
                    <EditExpensePopup
                        user={this.props.user}
                        expense={this.props.expense}
                        closePopup={this.toggleEditPopup.bind(this)}
                        settings={this.props.settings}
                        convertedCurrency={this.props.convertedCurrency}
                    />
                ) : null}
                <input type="checkbox" id={`toggle${this.props.expenseId}`} className="toggle" />
                <label className="title" style={nightModeTitle} for={`toggle${this.props.expenseId}`}>
                    {" "}
                    <span className="mobile-row-header">{this.props.expense.value.date == moment(new Date()).format("DD/MM/YYYY") ? ` Today \u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0` : this.props.expense.value.date}</span>
                    <span className="mobile-row-header">
                        <i
                            className={`fa fa-${utils.categoryIcon(this.props.expense.value.category)}`}
                            style={lessFont}
                            aria-hidden="true"
                        />
                        <span className="truncate"> {this.props.expense.value.comments} </span>
                    </span>
                    <span className="mobile-row-header last-item">
                        <i className={`fa ${utils.setCurrencyIcon(this.props.settings.currency)}`} aria-hidden="true" />{" "}
                        {this.props.expense.value.expense}
                    </span>
                </label>
                <div className="content">
                    <p>
                        {catName} - {this.props.expense.value.comments}
                    </p>
                    <button className="edit-btn edit-btn-mobile" onClick={this.toggleEditPopup.bind(this)}>
                        <i className="fa fa-edit" aria-hidden="true" /> edit
                    </button>
                    <button className="delete-btn delete-btn-mobile" onClick={this.handleClick}>
                        <i className="fa fa-trash-o" aria-hidden="true" /> delete
                    </button>
                </div>
            </div>
        );
    }
}

export default MobileExpenseRow;
