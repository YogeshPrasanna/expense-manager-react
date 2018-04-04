import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";

import * as utils from "../Util";

const GenerateExcel = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let startDate = props.fromdate;
    let endDate = props.todate;
    let expenseFrom = props.expensefrom;
    let expenseTo = props.expenseto;
    let category = props.category;

    if (!expenses || !currentUser) {
        return <div> Loading ... </div>;
    }

    if (expenses && currentUser && startDate && endDate && expenseFrom && expenseTo && category) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);
        let filteredExpenses = utils.filterExpensesByCriteria(
            startDate,
            endDate,
            category,
            expenseFrom,
            expenseTo,
            thisUsersExpenses
        );

        var excelDataObject = filteredExpenses.map(exp => exp.value);

        let exportArea = {
            backgroundColor: "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "15px"
        };

        return (
            <div className="col-sm-12" style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} />
            </div>
        );
    }
};

export default GenerateExcel;
