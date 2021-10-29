import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import Loader from "./../Common/Loader";

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
        return (
            <div>
                <Loader />
            </div>
        );
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

        let excelDataObject = filteredExpenses.map(exp => exp.value);

        let pageTitle = `Filtered expenses Start date : ${startDate} End date : ${endDate} category: ${category} expenses Amount From : ${expenseFrom} expenses Amount To : ${expenseTo}`;

        let exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "0",
            marginTop: window.screen.width > 720 ? "15px" : "0"
        };

        return (
            <div className="col-sm-12 export-print-bar " style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} pageTitle={pageTitle} />
            </div>
        );
    }
};

export default GenerateExcel;
