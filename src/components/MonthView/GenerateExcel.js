import React from "react";
import ExportToExcel from "./../Common/ExportToExcel";
import Loader from "./../Common/Loader";
import * as utils from "../Util";

const GenerateExcel = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        let excelDataObject = usersExpensesInSelectedMonthAndYear.map(exp => exp.value);
        let pageTitle = `Expenses in ${selectedMonth}'rd month of ${selectedYear}`;

        let exportArea = {
            backgroundColor: props.settings ? (props.settings.mode === "night" ? "#2C3034" : "#324858") : "#324858",
            color: "#DEDA54",
            padding: "10px",
            borderRadius: "5px"
        };

        return (
            <div className="col-sm-12" style={exportArea}>
                <ExportToExcel excelDataObject={excelDataObject} pageTitle={pageTitle} />
            </div>
        );
    }
};

export default GenerateExcel;
