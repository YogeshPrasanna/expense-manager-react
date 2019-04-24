import React, { Component } from "react";
import Expense from "./Expense";

import "../../assets/css/table.css";
import Loader from "../Common/Loader";
import * as utils from "../Util";

class ExpenseTable extends Component {
    constructor(props) {
        super(props);

        const expenses = JSON.parse(JSON.stringify(this.props.expenses));

        this.state = {
            expenses
        };

        this.handelDateChange = this.handelDateChange.bind(this);
    }

    componentDidMount() {
        if (this.props.expenses && this.props.authUser) {
            const eachExpense = utils.eachExpense(this.props.expenses);
            const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, this.props.authUser);

            this.setState({
                expenses: thisUsersExpenses
            });
        }
    }

    handelDateChange(e) {
        const eachExpense = utils.eachExpense(this.props.expenses);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, this.props.authUser);

        const searchResults = thisUsersExpenses.filter(elem =>
            elem.value.comments.toLowerCase().includes(e.target.value.toLowerCase())
        );
        this.setState({
            expenses: searchResults.length ? searchResults : this.props.expenses
        });
    }

    render() {
        const nightMode = {
            background: this.props.settings ? (this.props.settings.mode === "night" ? "#212529" : "auto") : "auto"
        };
        const expenses = this.state.expenses;
        const currentUser = this.props.authUser;

        if (!expenses || !currentUser) {
            return (
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Loader />
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }

        if (expenses && currentUser) {
            const inputArea = {
                color: "yellow",
                background: "#2C3034",
                border: "none",
                marginLeft: "15px",
                width: "50%",
                float: "right"
            };
            return (
                <div>
                    <table
                        className="table table-striped table-bordered table-dark rwd-table expense-table mobileNoPadding"
                        style={nightMode}
                    >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Expense</th>
                                <th scope="col">Category</th>
                                <th scope="col">
                                    Comments{" "}
                                    <input
                                        type="text"
                                        placeholder="  search"
                                        style={inputArea}
                                        onChange={this.handelDateChange.bind(this)}
                                    />
                                </th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Expense
                                expenses={this.state.expenses}
                                authUser={this.props.authUser}
                                key={Math.random() * 100}
                                settings={this.props.settings}
                                convertedCurrency={this.props.convertedCurrency}
                            />
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default ExpenseTable;
