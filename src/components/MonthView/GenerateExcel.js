import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import Loader from "./../Common/Loader";
import * as utils from "../Util";

const GenerateExcel = props => {
    const expenses = props.expenses;
    const currentUser = props.authUser;
    const selectedMonth = props.month;
    const selectedYear = props.year;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        const eachExpense = utils.eachExpense(expenses);
        const usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        const excelDataObject = usersExpensesInSelectedMonthAndYear.map(exp => exp.value);
        let pageTitle = `Expenses in ${selectedMonth}'rd month of ${selectedYear}`;

        const exportArea = {
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
