import React from "react";
import ExportToExcel from "./ExportToExcel";
import * as utils from "./../Util";

const GenerateExcel = props => {
    const loans = props.loans;
    const currentUser = props.authUser;

    if (!loans || !currentUser) {
        return (
            <div className="py-2"></div>
        );
    }

    if (loans && currentUser) {
        const eachExpense = utils.eachExpense(loans);
        const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);
        const excelDataObject = thisUsersExpenses.map(exp => exp.value);

        const exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
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
