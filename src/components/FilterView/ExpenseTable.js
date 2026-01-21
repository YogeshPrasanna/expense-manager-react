import React from "react";
import Expense from "./Expense";

import "../../assets/css/table.css";

const ExpenseTable = props => {
    const nightMode = { background: props.settings ? (props.settings.mode === "night" ? "#212529" : "auto") : "auto" };

    return (
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
                    <th scope="col">Comments</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <Expense
                    expenses={props.expenses}
                    expensefrom={props.expensefrom}
                    expenseto={props.expenseto}
                    fromdate={props.fromdate}
                    todate={props.todate}
                    category={props.category}
                    authUser={props.authUser}
                    key={Math.random() * 100}
                    settings={props.settings}
                    convertedCurrency={props.convertedCurrency}
                />
            </tbody>
        </table>
    );
};

export default ExpenseTable;
