import React, { Component } from "react";

import ExpenseTable from "./ExpenseTable.js";
import AddExpensePopup from "./AddExpensePopup";
import Cards from "./Cards";
import GenerateExcel from "./GenerateExcel";
import Loader from "./../Common/Loader";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        console.log("PROPS from home : ", this.props);
        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif"
        };

        if (this.props.settings) {
            return (
                <div>
                    <div className="col-sm-12" style={styleFromSettings}>
                        <Cards expenses={this.props.expenses} authUser={this.props.user} />
                        <GenerateExcel
                            expenses={this.props.expenses}
                            authUser={this.props.user}
                            settings={this.props.settings}
                        />
                        <ExpenseTable
                            expenses={this.props.expenses}
                            authUser={this.props.user}
                            settings={this.props.settings}
                        />
                    </div>
                    <button className="addexpense-btn" onClick={this.togglePopup.bind(this)} id="addExpense">
                        <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                    </button>
                    {this.state.showPopup ? (
                        <AddExpensePopup user={this.props.user} closePopup={this.togglePopup.bind(this)} />
                    ) : null}
                </div>
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

export default HomePage;
