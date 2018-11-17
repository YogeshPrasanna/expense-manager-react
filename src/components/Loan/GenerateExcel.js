import React from "react";
import ExportToExcel from "./ExportToExcel";
import * as utils from "./../Util";

const GenerateExcel = props => {
    let loans = props.loans;
    let currentUser = props.authUser;

    if (!loans || !currentUser) {
        return (
            <div className="loader" id="loader-6">
                <span />
                <span />
                <span />
                <span />
            </div>
        );
    }

    if (loans && currentUser) {
        let eachExpense = utils.eachExpense(loans);
        let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);
        var excelDataObject = thisUsersExpenses.map(exp => exp.value);

        let exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "5px",
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
