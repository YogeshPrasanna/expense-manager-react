import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import * as utils from "./../Util";

const GenerateExcel = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;

    if (!expenses || !currentUser) {
        return (
            <div className="loader" id="loader-6">
                <span />
                <span />
                <span />
                <span />
            </div>
        );
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);
        var excelDataObject = thisUsersExpenses.map(exp => exp.value);

        let exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "15px"
        };

        return (
            <div className="col-sm-12 export-print-bar" style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} pageTitle="Expenses - all" />
            </div>
        );
    }
};

export default GenerateExcel;
