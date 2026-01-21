import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import Loader from "./../Common/Loader";

import * as utils from "../Util";

const GenerateExcel = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let dateSelected = props.date;

    if (!expenses || !currentUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.expensesInDate(eachExpense, currentUser, dateSelected);
        let excelDataObject = thisUsersExpenses.map(exp => exp.value);
        let pageTitle = `Expenses on ${dateSelected}`;

        let exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "0"
        };

        return (
            <div className="col-sm-12 export-print-bar" style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} pageTitle={pageTitle} />
            </div>
        );
    }
};

export default GenerateExcel;
