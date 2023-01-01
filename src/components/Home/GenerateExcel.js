import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import * as utils from "./../Util";

const GenerateExcel = props => {
    const { expenses, authUser, settings } = props;

    if (!expenses || !authUser) {
        return (
            <div className="loader" id="loader-6">
                <span />
                <span />
                <span />
                <span />
            </div>
        );
    }

    if (expenses && authUser) {
        let eachExpense = utils.eachExpense(expenses);
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, authUser);
        let excelDataObject = thisUsersExpenses.map(exp => exp.value);

        let exportArea = {
            backgroundColor: settings ? (settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "0",
            marginTop: window.screen.width > 720 ? "15px" : "0"
        };

        return (
            <div className="col-sm-12 export-print-bar" style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} pageTitle="Expenses - all" />
            </div>
        );
    }
};

export default GenerateExcel;
